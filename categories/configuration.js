export const tool = {
  name: 'domotz_configuration',
  description: `Manage device configuration backups, credentials, and SNMP authentication. Use the "action" parameter to select an operation. Requires agent_id and device_id for all actions.

ACTION REFERENCE:
- backup: Trigger a config backup for a device
- history: List config backup history for a device
- create_config: Upload a configuration (needs body)
- get_config: Get a specific config by timestamp (needs configuration_timestamp)
- set_credentials: Set device credentials for SSH/Telnet (needs body)
- get_snmp_auth: Get SNMP authentication settings
- set_snmp_auth: Set SNMP v3 authentication (needs body)
- set_snmp_community: Set SNMP community string (needs body)

GOTCHAS:
- Backup workflow: first trigger "backup", then use "history" to see available backups, then "get_config" with the timestamp to retrieve one

EXAMPLES:
- Trigger backup: {"action": "backup", "agent_id": 5, "device_id": 30}
- View backup history: {"action": "history", "agent_id": 5, "device_id": 30}
- Get SNMP settings: {"action": "get_snmp_auth", "agent_id": 5, "device_id": 30}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'backup', 'history', 'create_config', 'get_config',
          'set_credentials', 'get_snmp_auth', 'set_snmp_auth', 'set_snmp_community'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      configuration_timestamp: { type: 'string', description: 'Configuration timestamp (for get_config)' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  backup:             { method: 'POST', url: '/agent/{agent_id}/device/{device_id}/configuration-management/backup' },
  history:            { method: 'GET',  url: '/agent/{agent_id}/device/{device_id}/configuration-management/history' },
  create_config:      { method: 'POST', url: '/agent/{agent_id}/device/{device_id}/configuration-management/history',                              hasBody: true },
  get_config:         { method: 'GET',  url: '/agent/{agent_id}/device/{device_id}/configuration-management/history/{configuration_timestamp}' },
  set_credentials:    { method: 'PUT',  url: '/agent/{agent_id}/device/{device_id}/credentials',                                                   hasBody: true },
  get_snmp_auth:      { method: 'GET',  url: '/agent/{agent_id}/device/{device_id}/snmp-authentication' },
  set_snmp_auth:      { method: 'PUT',  url: '/agent/{agent_id}/device/{device_id}/snmp-authentication',                                           hasBody: true },
  set_snmp_community: { method: 'PUT',  url: '/agent/{agent_id}/device/{device_id}/snmp-community',                                                hasBody: true },
};
