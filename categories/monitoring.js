export const tool = {
  name: 'domotz_monitoring',
  description: `Manage SNMP and TCP sensors (called "Eyes" in Domotz) on devices. Use the "action" parameter to select an operation. Requires agent_id and device_id for all actions.

ACTION REFERENCE:
- list_snmp: List all SNMP sensors on a device
- create_snmp: Create an SNMP sensor (needs body with OID config)
- delete_snmp: Delete an SNMP sensor (needs sensor_id)
- snmp_history: SNMP sensor value history over time (needs sensor_id, filterable by from/to)
- snmp_trigger_functions: List available trigger functions for an SNMP sensor (needs sensor_id)
- list_snmp_triggers: List triggers configured on an SNMP sensor (needs sensor_id)
- create_snmp_trigger: Create a trigger on an SNMP sensor (needs sensor_id + body)
- delete_snmp_trigger: Delete a trigger (needs sensor_id + trigger_id)
- create_snmp_trigger_alert: Bind an alert medium to a trigger (needs sensor_id + trigger_id + medium_name e.g. "email", "slack")
- delete_snmp_trigger_alert: Remove alert medium from trigger (needs sensor_id + trigger_id + medium_name)
- list_tcp: List TCP sensors on a device
- create_tcp: Create a TCP sensor (needs body with port/host config)
- delete_tcp: Delete a TCP sensor (needs service_id)

GOTCHAS:
- SNMP sensors and TCP sensors use different ID params: sensor_id for SNMP, service_id for TCP
- Trigger workflow: first list_snmp -> get sensor_id -> snmp_trigger_functions to see what's available -> create_snmp_trigger -> create_snmp_trigger_alert to get notifications
- from/to on snmp_history accept ISO 8601 timestamps, default to last 7 days

EXAMPLES:
- List SNMP sensors: {"action": "list_snmp", "agent_id": 5, "device_id": 50}
- Sensor history: {"action": "snmp_history", "agent_id": 5, "device_id": 50, "sensor_id": 3}
- List TCP sensors: {"action": "list_tcp", "agent_id": 5, "device_id": 50}
- Available trigger functions: {"action": "snmp_trigger_functions", "agent_id": 5, "device_id": 50, "sensor_id": 3}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'list_snmp', 'create_snmp', 'delete_snmp', 'snmp_history',
          'snmp_trigger_functions', 'list_snmp_triggers',
          'create_snmp_trigger', 'delete_snmp_trigger',
          'create_snmp_trigger_alert', 'delete_snmp_trigger_alert',
          'list_tcp', 'create_tcp', 'delete_tcp'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      sensor_id: { type: 'integer', description: 'SNMP Sensor ID' },
      service_id: { type: 'integer', description: 'TCP Service/Sensor ID' },
      trigger_id: { type: 'integer', description: 'Trigger ID' },
      medium_name: { type: 'string', description: 'Alert medium name (e.g. email, slack)' },
      from: { type: 'string', description: 'Start time for time series' },
      to: { type: 'string', description: 'End time for time series' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  list_snmp:                 { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/eye/snmp' },
  create_snmp:               { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/eye/snmp',                                                                       hasBody: true },
  delete_snmp:               { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}' },
  snmp_history:              { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/history',                                                    queryParams: ['from', 'to'] },
  snmp_trigger_functions:    { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/function' },
  list_snmp_triggers:        { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger' },
  create_snmp_trigger:       { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger',                                                   hasBody: true },
  delete_snmp_trigger:       { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}' },
  create_snmp_trigger_alert: { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}/alert/{medium_name}',                   hasBody: true },
  delete_snmp_trigger_alert: { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}/alert/{medium_name}' },
  list_tcp:                  { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/eye/tcp' },
  create_tcp:                { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/eye/tcp',                                                                        hasBody: true },
  delete_tcp:                { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/eye/tcp/{service_id}' },
};
