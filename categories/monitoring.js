export const tool = {
  name: 'domotz_monitoring',
  description: 'Manage SNMP and TCP sensors (Eyes) on devices. Actions: list_snmp, create_snmp, delete_snmp, snmp_history, snmp_trigger_functions, list_snmp_triggers, create_snmp_trigger, delete_snmp_trigger, create_snmp_trigger_alert, delete_snmp_trigger_alert, list_tcp, create_tcp, delete_tcp',
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
