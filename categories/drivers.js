export const tool = {
  name: 'domotz_drivers',
  description: 'Manage custom drivers and their associations with devices. Actions: list, get, create_association, delete_association, update_association_params, list_associations, execute_action, re_enable',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'list', 'get', 'create_association', 'delete_association',
          'update_association_params', 'list_associations',
          'execute_action', 're_enable'
        ],
        description: 'The operation to perform'
      },
      custom_driver_id: { type: 'integer', description: 'Custom Driver ID' },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      association_id: { type: 'integer', description: 'Association ID' },
      action_id: { type: 'integer', description: 'Driver Action ID' },
      include_unrecoverable: { type: 'boolean', description: 'Include unrecoverable associations in re-enable' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  list:                      { method: 'GET',    url: '/custom-driver' },
  get:                       { method: 'GET',    url: '/custom-driver/{custom_driver_id}' },
  create_association:        { method: 'POST',   url: '/custom-driver/{custom_driver_id}/agent/{agent_id}/device/{device_id}/association',         hasBody: true },
  execute_action:            { method: 'POST',   url: '/custom-driver/{custom_driver_id}/agent/{agent_id}/device/{device_id}/execute/{action_id}', hasBody: true },
  delete_association:        { method: 'DELETE', url: '/custom-driver/{custom_driver_id}/association/{association_id}' },
  update_association_params: { method: 'PUT',    url: '/custom-driver/{custom_driver_id}/association/{association_id}',                             hasBody: true },
  list_associations:         { method: 'GET',    url: '/custom-driver/agent/{agent_id}/association' },
  re_enable:                 { method: 'POST',   url: '/custom-driver/association/re-enable',                                                      queryParams: ['include_unrecoverable'] },
};
