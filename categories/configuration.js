export const tool = {
  name: 'domotz_configuration',
  description: 'Manage device configuration backups, credentials, and SNMP authentication. Actions: backup, history, create_config, get_config, set_credentials, get_snmp_auth, set_snmp_auth, set_snmp_community',
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
