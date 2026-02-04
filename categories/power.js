export const tool = {
  name: 'domotz_power',
  description: 'Manage device power actions and power outlets. Actions: get_power_actions, power_action, get_outlets, update_outlet, trigger_outlet, attach_device, detach_device',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'get_power_actions', 'power_action',
          'get_outlets', 'update_outlet', 'trigger_outlet',
          'attach_device', 'detach_device'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      power_outlet_id: { type: 'integer', description: 'Power Outlet ID' },
      attached_device_id: { type: 'integer', description: 'Device ID to attach/detach' },
      field: { type: 'string', description: 'Power action field name' },
      outlet_action: { type: 'string', description: 'Outlet action to trigger' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  get_power_actions: { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/action/power' },
  power_action:      { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/action/power/{field}' },
  get_outlets:       { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/power-outlet' },
  update_outlet:     { method: 'PUT',    url: '/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}',                          hasBody: true },
  trigger_outlet:    { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/action/{outlet_action}' },
  attach_device:     { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/attach/{attached_device_id}' },
  detach_device:     { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/attach/{attached_device_id}' },
};
