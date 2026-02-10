export const tool = {
  name: 'domotz_power',
  description: `Manage device power actions and PDU power outlets. Use the "action" parameter to select an operation. Requires agent_id and device_id for all actions.

ACTION REFERENCE:
- get_power_actions: List available power actions for a device (e.g. reboot, shutdown)
- power_action: Execute a power action (needs "field" param with the action name from get_power_actions)
- get_outlets: List power outlets on a PDU device
- update_outlet: Update outlet settings (needs power_outlet_id + body)
- trigger_outlet: Trigger an outlet action like cycle/on/off (needs power_outlet_id + outlet_action param e.g. "cycle", "on", "off")
- attach_device: Attach a device to a power outlet (needs power_outlet_id + attached_device_id)
- detach_device: Detach a device from a power outlet (needs power_outlet_id + attached_device_id)

GOTCHAS:
- "trigger_outlet" uses "outlet_action" parameter (NOT "action") to specify what the outlet should do. The "action" param is always the tool operation selector.
- "power_action" uses "field" parameter to identify which power action to execute
- Workflow: get_power_actions first to see what's available, then power_action with the field name

EXAMPLES:
- List power actions: {"action": "get_power_actions", "agent_id": 5, "device_id": 15}
- List PDU outlets: {"action": "get_outlets", "agent_id": 5, "device_id": 15}
- Cycle outlet: {"action": "trigger_outlet", "agent_id": 5, "device_id": 15, "power_outlet_id": 2, "outlet_action": "cycle"}`,
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
