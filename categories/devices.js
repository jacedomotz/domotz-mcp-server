export const tool = {
  name: 'domotz_devices',
  description: `Manage devices on Domotz collectors. Use the "action" parameter to select an operation. Most actions require agent_id and device_id.

ACTION REFERENCE:
- list: List all devices on a collector (supports show_hidden, show_excluded filters)
- get: Get single device details
- delete: Delete a device
- delete_down: Delete ALL down devices on a collector (only needs agent_id)
- edit: Edit a device field (needs "field" param for the field name e.g. "importance", "details", and body with the new value)
- hide: Hide a device from the dashboard
- status_history: Device online/offline event history (filterable by from/to)
- rtd_history: Round-trip delay (latency) time series (filterable by from/to)
- connect: Create a remote connection to device (needs body with connection config)
- onvif_snapshot: Get ONVIF camera snapshot image
- uptime: Device uptime percentage (filterable by from/to)
- monitoring_state: Set monitoring state (needs body)
- applications: Applications running on a device (paginated)
- count_applications: Count applications (lightweight HEAD request)
- variables: Device variables (paginated, filterable by value/path/metric)
- count_variables: Count device variables (lightweight HEAD request)
- variable_history: Time-series for a specific device variable (needs variable_id)

GOTCHAS:
- The "edit" action uses a "field" URL parameter to specify WHICH field to update (e.g. "importance", "details"), plus a body with the new value
- count_applications/count_variables use HEAD requests and return {"count": N}
- from/to accept ISO 8601 timestamps, default to last 7 days if omitted
- delete_down deletes ALL down devices on the collector - use with caution

EXAMPLES:
- List devices: {"action": "list", "agent_id": 5}
- Get device details: {"action": "get", "agent_id": 5, "device_id": 200}
- Device status history: {"action": "status_history", "agent_id": 5, "device_id": 42}
- Latency history: {"action": "rtd_history", "agent_id": 5, "device_id": 99}
- Device uptime: {"action": "uptime", "agent_id": 2, "device_id": 10, "from": "2025-01-01T00:00:00Z"}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'list', 'get', 'delete', 'delete_down', 'edit', 'hide',
          'status_history', 'rtd_history', 'connect', 'onvif_snapshot',
          'uptime', 'monitoring_state',
          'applications', 'count_applications',
          'variables', 'count_variables', 'variable_history'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      device_id: { type: 'integer', description: 'Device ID' },
      variable_id: { type: 'integer', description: 'Variable ID' },
      field: { type: 'string', description: 'Field name (for edit action)' },
      from: { type: 'string', description: 'Start time for time series' },
      to: { type: 'string', description: 'End time for time series' },
      show_hidden: { type: 'boolean', description: 'Include hidden devices in list' },
      show_excluded: { type: 'boolean', description: 'Include excluded devices (default: true)' },
      page_size: { type: 'number', description: 'Max items to return' },
      page_number: { type: 'number', description: 'Page number, 0-indexed' },
      name: { type: 'string', description: 'Filter applications by name' },
      device_ids: { type: 'string', description: 'Filter by device IDs' },
      value: { type: 'string', description: 'Filter variables by value' },
      path: { type: 'string', description: 'Filter variables by path' },
      sort_by: { type: 'string', description: 'Sort field for variables' },
      sorting_direction: { type: 'string', description: 'Sort direction (asc/desc)' },
      has_history: { type: 'boolean', description: 'Filter by has_history' },
      metric: { type: 'string', description: 'Filter by metric' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  list:               { method: 'GET',    url: '/agent/{agent_id}/device',                                      queryParams: ['show_hidden', 'show_excluded'] },
  get:                { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}' },
  delete:             { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}' },
  delete_down:        { method: 'DELETE', url: '/agent/{agent_id}/device' },
  edit:               { method: 'PUT',    url: '/agent/{agent_id}/device/{device_id}/{field}',                  hasBody: true },
  hide:               { method: 'DELETE', url: '/agent/{agent_id}/device/{device_id}/visibility' },
  status_history:     { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/history/network/event',    queryParams: ['from', 'to'] },
  rtd_history:        { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/history/rtd',              queryParams: ['from', 'to'] },
  connect:            { method: 'POST',   url: '/agent/{agent_id}/device/{device_id}/connection',               hasBody: true },
  onvif_snapshot:     { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/multimedia/camera/snapshot' },
  uptime:             { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/uptime',                   queryParams: ['from', 'to'] },
  monitoring_state:   { method: 'PUT',    url: '/agent/{agent_id}/device/{device_id}/monitoring-state',         hasBody: true },
  applications:       { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/application',              queryParams: ['page_size', 'page_number', 'name', 'device_ids'] },
  count_applications: { method: 'HEAD',   url: '/agent/{agent_id}/device/{device_id}/application',              queryParams: ['name', 'device_ids'] },
  variables:          { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/variable',                 queryParams: ['page_size', 'page_number', 'value', 'path', 'sort_by', 'sorting_direction', 'has_history', 'metric'] },
  count_variables:    { method: 'HEAD',   url: '/agent/{agent_id}/device/{device_id}/variable',                 queryParams: ['value', 'path', 'has_history', 'metric'] },
  variable_history:   { method: 'GET',    url: '/agent/{agent_id}/device/{device_id}/variable/{variable_id}/history', queryParams: ['from', 'to'] },
};
