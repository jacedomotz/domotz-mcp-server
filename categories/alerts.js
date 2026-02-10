export const tool = {
  name: 'domotz_alerts',
  description: `Manage alert profiles and their bindings to collectors and devices. Use the "action" parameter to select an operation.

ACTION REFERENCE:
- list_profiles: List all alert profiles (no parameters needed)
- bind_to_agent: Bind an alert profile to a collector (needs alert_profile_id + agent_id)
- unbind_from_agent: Unbind an alert profile from a collector (needs alert_profile_id + agent_id)
- bind_to_device: Bind an alert profile to a specific device (needs alert_profile_id + agent_id + device_id)
- unbind_from_device: Unbind an alert profile from a device (needs alert_profile_id + agent_id + device_id)
- get_agent_bindings: List all alert bindings for a collector (needs agent_id)
- get_device_bindings: List alert bindings for all devices on a collector (needs agent_id)
- list_profiles_deprecated: List profiles by user ID (deprecated, use list_profiles instead)

GOTCHAS:
- Binding workflow: first list_profiles to get alert_profile_id, then bind_to_agent or bind_to_device
- get_device_bindings returns bindings for ALL devices on a collector, not a single device

EXAMPLES:
- List all profiles: {"action": "list_profiles"}
- Check collector alerts: {"action": "get_agent_bindings", "agent_id": 5}
- Bind profile to device: {"action": "bind_to_device", "alert_profile_id": 2, "agent_id": 5, "device_id": 100}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'list_profiles', 'bind_to_agent', 'unbind_from_agent',
          'bind_to_device', 'unbind_from_device',
          'get_agent_bindings', 'get_device_bindings',
          'list_profiles_deprecated'
        ],
        description: 'The operation to perform'
      },
      alert_profile_id: { type: 'integer', description: 'Alert Profile ID' },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      user_id: { type: 'integer', description: 'User ID (for deprecated endpoint)' }
    },
    required: ['action']
  }
};

export const actions = {
  list_profiles:             { method: 'GET',    url: '/alert-profile' },
  bind_to_agent:             { method: 'POST',   url: '/alert-profile/{alert_profile_id}/binding/agent/{agent_id}' },
  unbind_from_agent:         { method: 'DELETE', url: '/alert-profile/{alert_profile_id}/binding/agent/{agent_id}' },
  bind_to_device:            { method: 'POST',   url: '/alert-profile/{alert_profile_id}/binding/agent/{agent_id}/device/{device_id}' },
  unbind_from_device:        { method: 'DELETE', url: '/alert-profile/{alert_profile_id}/binding/agent/{agent_id}/device/{device_id}' },
  get_agent_bindings:        { method: 'GET',    url: '/alert-profile/binding/agent/{agent_id}' },
  get_device_bindings:       { method: 'GET',    url: '/alert-profile/binding/agent/{agent_id}/device' },
  list_profiles_deprecated:  { method: 'GET',    url: '/user/{user_id}/alert-profile' },
};
