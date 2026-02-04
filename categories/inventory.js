export const tool = {
  name: 'domotz_inventory',
  description: 'Manage inventory fields, custom tags, device profiles, and device types. Actions: get_inventory, delete_inventory, create_field, delete_field, update_field, get_device_inventory, set_device_field, delete_device_field, get_tags, create_tag, edit_tag, delete_tag, bind_tag, unbind_tag, get_device_tags, list_profiles, apply_profile, list_base_types, list_detected_types',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'get_inventory', 'delete_inventory',
          'create_field', 'delete_field', 'update_field',
          'get_device_inventory', 'set_device_field', 'delete_device_field',
          'get_tags', 'create_tag', 'edit_tag', 'delete_tag',
          'bind_tag', 'unbind_tag', 'get_device_tags',
          'list_profiles', 'apply_profile',
          'list_base_types', 'list_detected_types'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      inventory_field: { type: 'string', description: 'Inventory field name' },
      custom_tag_id: { type: 'integer', description: 'Custom Tag ID' },
      device_profile_id: { type: 'integer', description: 'Device Profile ID' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  get_inventory:       { method: 'GET',    url: '/inventory' },
  delete_inventory:    { method: 'DELETE', url: '/inventory' },
  create_field:        { method: 'POST',   url: '/inventory/{inventory_field}',                                        hasBody: true },
  delete_field:        { method: 'DELETE', url: '/inventory/{inventory_field}' },
  update_field:        { method: 'PUT',    url: '/inventory/{inventory_field}',                                         hasBody: true },
  get_device_inventory: { method: 'GET',   url: '/agent/{agent_id}/device/{device_id}/inventory' },
  set_device_field:    { method: 'PUT',    url: '/agent/{agent_id}/device/{device_id}/inventory/{inventory_field}',     hasBody: true },
  delete_device_field: { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/inventory/{inventory_field}' },
  get_tags:            { method: 'GET',    url: '/custom-tag' },
  create_tag:          { method: 'POST',   url: '/custom-tag',                                                          hasBody: true },
  edit_tag:            { method: 'PUT',    url: '/custom-tag/{custom_tag_id}',                                          hasBody: true },
  delete_tag:          { method: 'DELETE', url: '/custom-tag/{custom_tag_id}' },
  bind_tag:            { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/custom-tag/{custom_tag_id}/binding' },
  unbind_tag:          { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/custom-tag/{custom_tag_id}/binding' },
  get_device_tags:     { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/custom-tag/binding' },
  list_profiles:       { method: 'GET',    url: '/device-profile' },
  apply_profile:       { method: 'POST',   url: '/device-profile/{device_profile_id}/apply',                            hasBody: true },
  list_base_types:     { method: 'GET',    url: '/type/device/base' },
  list_detected_types: { method: 'GET',    url: '/type/device/detected' },
};
