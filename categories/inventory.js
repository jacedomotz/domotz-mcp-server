export const tool = {
  name: 'domotz_inventory',
  description: `Manage inventory fields, custom tags, device profiles, and device types. Use the "action" parameter to select an operation.

ACTION REFERENCE:
- get_inventory: Get all inventory field definitions (no parameters needed)
- delete_inventory: Delete all inventory fields (caution: removes all)
- create_field: Create an inventory field (needs inventory_field name + body)
- delete_field: Delete an inventory field (needs inventory_field name)
- update_field: Update an inventory field (needs inventory_field name + body)
- get_device_inventory: Get inventory data for a device (needs agent_id + device_id)
- set_device_field: Set inventory field value on a device (needs agent_id + device_id + inventory_field + body)
- delete_device_field: Clear inventory field on a device (needs agent_id + device_id + inventory_field)
- get_tags: List all custom tags (no parameters needed)
- create_tag: Create a custom tag (needs body)
- edit_tag: Edit a custom tag (needs custom_tag_id + body)
- delete_tag: Delete a custom tag (needs custom_tag_id)
- bind_tag: Bind a tag to a device (needs agent_id + device_id + custom_tag_id)
- unbind_tag: Unbind a tag from a device (needs agent_id + device_id + custom_tag_id)
- get_device_tags: Get tags bound to a device (needs agent_id + device_id)
- list_profiles: List all device profiles (no parameters needed)
- apply_profile: Apply a profile to devices (needs device_profile_id + body)
- list_base_types: List base device types (no parameters needed)
- list_detected_types: List detected device types (no parameters needed)

EXAMPLES:
- List all tags: {"action": "get_tags"}
- Device inventory: {"action": "get_device_inventory", "agent_id": 5, "device_id": 42}
- List device profiles: {"action": "list_profiles"}
- List device types: {"action": "list_base_types"}`,
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
