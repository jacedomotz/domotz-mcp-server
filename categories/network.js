export const tool = {
  name: 'domotz_network',
  description: 'Manage network scan policies, interfaces, and excluded devices. Actions: get_external_scan_policy, set_external_scan_policy, delete_external_scan_policy, get_interfaces, get_interfaces_policy, set_interfaces_policy, delete_interfaces_policy, get_ip_scan_policy, set_ip_scan_policy, delete_ip_scan_policy, create_routed_network, list_excluded, add_excluded, delete_excluded',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'get_external_scan_policy', 'set_external_scan_policy', 'delete_external_scan_policy',
          'get_interfaces', 'get_interfaces_policy', 'set_interfaces_policy', 'delete_interfaces_policy',
          'get_ip_scan_policy', 'set_ip_scan_policy', 'delete_ip_scan_policy',
          'create_routed_network',
          'list_excluded', 'add_excluded', 'delete_excluded'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID (for excluded devices)' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  get_external_scan_policy:    { method: 'GET',    url: '/agent/{agent_id}/network/external-host-scan-policy' },
  set_external_scan_policy:    { method: 'PUT',    url: '/agent/{agent_id}/network/external-host-scan-policy',  hasBody: true },
  delete_external_scan_policy: { method: 'DELETE', url: '/agent/{agent_id}/network/external-host-scan-policy' },
  get_interfaces:              { method: 'GET',    url: '/agent/{agent_id}/network/interfaces' },
  get_interfaces_policy:       { method: 'GET',    url: '/agent/{agent_id}/network/interfaces-policy' },
  set_interfaces_policy:       { method: 'PUT',    url: '/agent/{agent_id}/network/interfaces-policy',          hasBody: true },
  delete_interfaces_policy:    { method: 'DELETE', url: '/agent/{agent_id}/network/interfaces-policy' },
  get_ip_scan_policy:          { method: 'GET',    url: '/agent/{agent_id}/network/ip-scan-policy' },
  set_ip_scan_policy:          { method: 'PUT',    url: '/agent/{agent_id}/network/ip-scan-policy',             hasBody: true },
  delete_ip_scan_policy:       { method: 'DELETE', url: '/agent/{agent_id}/network/ip-scan-policy' },
  create_routed_network:       { method: 'POST',   url: '/agent/{agent_id}/network/routed',                     hasBody: true },
  list_excluded:               { method: 'GET',    url: '/agent/{agent_id}/network/excluded-device' },
  add_excluded:                { method: 'POST',   url: '/agent/{agent_id}/network/excluded-device/{device_id}' },
  delete_excluded:             { method: 'DELETE', url: '/agent/{agent_id}/network/excluded-device/{device_id}' },
};
