export const tool = {
  name: 'domotz_drivers',
  description: `Manage custom drivers and their associations with devices. Use the "action" parameter to select an operation.

ACTION REFERENCE:
- list: List all custom drivers (no parameters needed)
- get: Get custom driver details (needs custom_driver_id)
- create_association: Associate a driver with a device (needs custom_driver_id + agent_id + device_id + body)
- delete_association: Remove a driver association (needs custom_driver_id + association_id)
- update_association_params: Update association parameters (needs custom_driver_id + association_id + body)
- list_associations: List driver associations for a collector (needs agent_id)
- execute_action: Execute a custom driver action (needs custom_driver_id + agent_id + device_id + action_id + body)
- re_enable: Re-enable failed associations (optional: include_unrecoverable flag)

GOTCHAS:
- Workflow: list drivers first to get custom_driver_id, then create_association to bind to a device
- execute_action needs action_id which comes from the driver definition

EXAMPLES:
- List all drivers: {"action": "list"}
- Show associations: {"action": "list_associations", "agent_id": 5}`,
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
