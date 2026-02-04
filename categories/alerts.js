export const tool = {
  name: 'domotz_alerts',
  description: 'Manage alert profiles and their bindings to agents/devices. Actions: list_profiles, bind_to_agent, unbind_from_agent, bind_to_device, unbind_from_device, get_agent_bindings, get_device_bindings, list_profiles_deprecated',
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
