/**
 * Composite tools that combine multiple API calls into single operations.
 * Reduces round-trips and context usage for common workflows.
 */

export const tools = [
  {
    name: 'domotz_get_device_full_status',
    description: 'Get comprehensive device status in a single call. Combines 5 API calls into one: device info, status history, SNMP sensors, TCP sensors, and alert bindings. Use this instead of making separate calls when you need a full picture of a device. Requires agent_id and device_id. Results are summarized if >50 items in any category.',
    inputSchema: {
      type: 'object',
      properties: {
        agent_id: { type: 'integer', description: 'Agent/Collector ID' },
        device_id: { type: 'integer', description: 'Device ID' }
      },
      required: ['agent_id', 'device_id']
    }
  },
  {
    name: 'domotz_get_agent_overview',
    description: 'Get a collector overview in a single call. Combines agent details, full device list, and uptime into one response. Use this as your starting point when exploring a collector/site. Requires agent_id. Device list is summarized (first 50 + total count) if >50 devices.',
    inputSchema: {
      type: 'object',
      properties: {
        agent_id: { type: 'integer', description: 'Agent/Collector ID' }
      },
      required: ['agent_id']
    }
  },
  {
    name: 'domotz_search_devices',
    description: 'Search devices by name or IP address across one or all collectors. Returns matching devices with their agent_id so you know which collector they belong to. Provide "query" (search string) and optionally "agent_id" to limit search to one collector. Without agent_id, searches ALL collectors. Great for finding a device when you don\'t know which site it\'s on.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search string to match against device display_name or IP address' },
        agent_id: { type: 'integer', description: 'Optional: search only this agent. If omitted, searches all agents.' }
      },
      required: ['query']
    }
  }
];

const SUMMARY_LIMIT = parseInt(process.env.DOMOTZ_SUMMARY_LIMIT || '50', 10);

function summarize(data) {
  if (Array.isArray(data) && data.length > SUMMARY_LIMIT) {
    return {
      total: data.length,
      showing: SUMMARY_LIMIT,
      items: data.slice(0, SUMMARY_LIMIT),
      truncated: true,
      hint: `Showing first ${SUMMARY_LIMIT} of ${data.length} items.`
    };
  }
  return data;
}

async function safeGet(api, url) {
  try {
    const res = await api.get(url);
    return res.data;
  } catch {
    return null;
  }
}

async function getDeviceFullStatus(args, api) {
  const { agent_id, device_id } = args;
  const base = `/agent/${agent_id}/device/${device_id}`;

  const [device, statusHistory, snmpSensors, tcpSensors, alertBindings] = await Promise.all([
    safeGet(api, base),
    safeGet(api, `${base}/history/network/event`),
    safeGet(api, `${base}/eye/snmp`),
    safeGet(api, `${base}/eye/tcp`),
    safeGet(api, `/alert-profile/binding/agent/${agent_id}/device`)
  ]);

  // Filter alert bindings to this device only
  const deviceAlerts = Array.isArray(alertBindings)
    ? alertBindings.filter(b => b.device_id === device_id)
    : alertBindings;

  return {
    device,
    status_history: summarize(statusHistory),
    snmp_sensors: summarize(snmpSensors),
    tcp_sensors: summarize(tcpSensors),
    alert_bindings: summarize(deviceAlerts)
  };
}

async function getAgentOverview(args, api) {
  const { agent_id } = args;

  const [agent, devices, uptime] = await Promise.all([
    safeGet(api, `/agent/${agent_id}`),
    safeGet(api, `/agent/${agent_id}/device`),
    safeGet(api, `/agent/${agent_id}/uptime`)
  ]);

  return {
    agent,
    devices: summarize(devices),
    uptime
  };
}

async function searchDevices(args, api) {
  const query = args.query.toLowerCase();
  let agentIds = [];

  if (args.agent_id !== undefined) {
    agentIds = [args.agent_id];
  } else {
    const agents = await safeGet(api, '/agent');
    if (!Array.isArray(agents)) return { matches: [], error: 'Could not fetch agents' };
    agentIds = agents.map(a => a.id);
  }

  const deviceLists = await Promise.all(
    agentIds.map(async (id) => {
      const devices = await safeGet(api, `/agent/${id}/device`);
      if (!Array.isArray(devices)) return [];
      return devices
        .filter(d =>
          (d.display_name && d.display_name.toLowerCase().includes(query)) ||
          (d.ip_addresses && d.ip_addresses.some(ip => ip.includes(query)))
        )
        .map(d => ({ ...d, agent_id: id }));
    })
  );

  const matches = deviceLists.flat();
  return summarize(matches);
}

export async function handleComposite(toolName, args, api) {
  let result;
  switch (toolName) {
    case 'domotz_get_device_full_status':
      result = await getDeviceFullStatus(args, api);
      break;
    case 'domotz_get_agent_overview':
      result = await getAgentOverview(args, api);
      break;
    case 'domotz_search_devices':
      result = await searchDevices(args, api);
      break;
    default:
      throw new Error(`Unknown composite tool: ${toolName}`);
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(result) }]
  };
}
