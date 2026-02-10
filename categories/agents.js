export const tool = {
  name: 'domotz_agents',
  description: `Manage Domotz collectors (agents). Use the "action" parameter to select an operation. Requires agent_id for most actions.

ACTION REFERENCE:
- list: List all collectors (paginated, filterable by display_name/team_name)
- count: Count collectors (lightweight HEAD request, returns {"count": N})
- get: Get single collector details by agent_id
- delete: Delete a collector
- activity_log: Collector activity log (filterable by from/to/type)
- connection_consumption: Bandwidth consumption data
- vpn_connections: List VPN sessions
- create_vpn: Create a VPN session (needs body)
- delete_vpn: Delete a VPN session (needs vpn_session_id)
- status_history: Online/offline event history (filterable by from/to)
- speed_test_history: Internet speed test results (filterable by from/to)
- ip_conflicts: Detected IP conflicts on a collector
- rtd_stats: Round-trip delay statistics for all devices on a collector
- network_topology: Network topology map
- uptime: Collector uptime percentage (filterable by from/to)
- list_uptime_all: Uptime for ALL collectors (no agent_id needed - the only action that doesn't require one)
- variables: Collector-level variables (paginated, filterable by value/path/metric)
- count_variables: Count collector variables (lightweight HEAD request)
- variable_history: Time-series for a specific variable (needs variable_id)
- move: Move collector to a different team (needs team_id)
- eyes_usage: SNMP/TCP sensor usage statistics
- metric_usage: Metric usage statistics
- device_applications: Applications across all devices on collector (paginated)
- count_device_applications: Count applications (lightweight HEAD)
- device_variables: Variables across all devices on collector (paginated)
- count_device_variables: Count device variables (lightweight HEAD)
- eyes_snmp: All SNMP sensors across collector
- eyes_tcp: All TCP sensors across collector
- unmanaged_devices: Devices not being monitored
- external_host: Add an external host to monitor (needs body)
- dhcp_discovery: Configure DHCP discovery (needs body)

GOTCHAS:
- count/count_variables/count_device_applications/count_device_variables use HEAD requests and return {"count": N} from the X-Entities-Count header
- list_uptime_all is the ONLY action that works without specifying agent_id
- from/to accept ISO 8601 timestamps, default to last 7 days if omitted
- Use page_size (1-1000) and page_number (0-based) for large result sets

EXAMPLES:
- List all collectors: {"action": "list"}
- Get collector details: {"action": "get", "agent_id": 5}
- Check for IP conflicts: {"action": "ip_conflicts", "agent_id": 12}
- Show network topology: {"action": "network_topology", "agent_id": 8}
- Uptime for all collectors: {"action": "list_uptime_all"}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: [
          'list', 'count', 'get', 'delete', 'activity_log',
          'connection_consumption', 'vpn_connections', 'create_vpn', 'delete_vpn',
          'status_history', 'speed_test_history', 'ip_conflicts', 'rtd_stats',
          'network_topology', 'uptime', 'list_uptime_all',
          'variables', 'count_variables', 'variable_history',
          'move', 'eyes_usage', 'metric_usage',
          'device_applications', 'count_device_applications',
          'device_variables', 'count_device_variables',
          'eyes_snmp', 'eyes_tcp', 'unmanaged_devices',
          'external_host', 'dhcp_discovery'
        ],
        description: 'The operation to perform'
      },
      agent_id: { type: 'integer', description: 'Agent/Collector ID' },
      variable_id: { type: 'integer', description: 'Variable ID' },
      vpn_session_id: { type: 'integer', description: 'VPN Session ID' },
      team_id: { type: 'integer', description: 'Team ID (for move action)' },
      from: { type: 'string', description: 'Start time for time series (default: one week ago)' },
      to: { type: 'string', description: 'End time for time series (default: now)' },
      type: { type: 'string', description: 'Activity log type filter' },
      page_size: { type: 'number', description: 'Max items to return (1-1000)' },
      page_number: { type: 'number', description: 'Page number, 0-indexed' },
      display_name: { type: 'string', description: 'Filter by display name (case insensitive)' },
      team_name: { type: 'string', description: 'Filter by team name' },
      value: { type: 'string', description: 'Filter variables by value' },
      path: { type: 'string', description: 'Filter variables by path' },
      sort_by: { type: 'string', description: 'Sort field for variables' },
      sorting_direction: { type: 'string', description: 'Sort direction (asc/desc)' },
      has_history: { type: 'boolean', description: 'Filter by has_history field' },
      metric: { type: 'string', description: 'Filter by metric' },
      name: { type: 'string', description: 'Filter applications by name' },
      device_ids: { type: 'string', description: 'Filter applications by device IDs' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  list:                      { method: 'GET',    url: '/agent',                                           queryParams: ['page_size', 'page_number', 'display_name', 'team_name'] },
  count:                     { method: 'HEAD',   url: '/agent',                                           queryParams: ['display_name', 'team_name'] },
  get:                       { method: 'GET',    url: '/agent/{agent_id}' },
  delete:                    { method: 'DELETE',  url: '/agent/{agent_id}' },
  activity_log:              { method: 'GET',    url: '/agent/{agent_id}/activity-log',                   queryParams: ['from', 'to', 'type'] },
  connection_consumption:    { method: 'GET',    url: '/agent/{agent_id}/connection/consumption' },
  vpn_connections:           { method: 'GET',    url: '/agent/{agent_id}/connection/vpn-session' },
  create_vpn:                { method: 'POST',   url: '/agent/{agent_id}/connection/vpn-session',         hasBody: true },
  delete_vpn:                { method: 'DELETE',  url: '/agent/{agent_id}/connection/vpn-session/{vpn_session_id}' },
  status_history:            { method: 'GET',    url: '/agent/{agent_id}/history/network/event',          queryParams: ['from', 'to'] },
  speed_test_history:        { method: 'GET',    url: '/agent/{agent_id}/history/network/speed',          queryParams: ['from', 'to'] },
  ip_conflicts:              { method: 'GET',    url: '/agent/{agent_id}/ip-conflict' },
  rtd_stats:                 { method: 'GET',    url: '/agent/{agent_id}/device/rtd' },
  network_topology:          { method: 'GET',    url: '/agent/{agent_id}/network-topology' },
  uptime:                    { method: 'GET',    url: '/agent/{agent_id}/uptime',                         queryParams: ['from', 'to'] },
  list_uptime_all:           { method: 'GET',    url: '/agent/uptime',                                    queryParams: ['from', 'to'] },
  variables:                 { method: 'GET',    url: '/agent/{agent_id}/variable',                       queryParams: ['page_size', 'page_number', 'value', 'path', 'sort_by', 'sorting_direction', 'has_history', 'metric'] },
  count_variables:           { method: 'HEAD',   url: '/agent/{agent_id}/variable',                       queryParams: ['value', 'path', 'has_history', 'metric'] },
  variable_history:          { method: 'GET',    url: '/agent/{agent_id}/variable/{variable_id}/history', queryParams: ['from', 'to'] },
  move:                      { method: 'PUT',    url: '/agent/{agent_id}/ownership/team/{team_id}' },
  eyes_usage:                { method: 'GET',    url: '/agent/{agent_id}/eye-statistics' },
  metric_usage:              { method: 'GET',    url: '/agent/{agent_id}/metric-statistics' },
  device_applications:       { method: 'GET',    url: '/agent/{agent_id}/device/application',             queryParams: ['page_size', 'page_number', 'name', 'device_ids'] },
  count_device_applications: { method: 'HEAD',   url: '/agent/{agent_id}/device/application',             queryParams: ['name', 'device_ids'] },
  device_variables:          { method: 'GET',    url: '/agent/{agent_id}/device/variable',                queryParams: ['page_size', 'page_number', 'value', 'path', 'sort_by', 'sorting_direction', 'has_history', 'metric'] },
  count_device_variables:    { method: 'HEAD',   url: '/agent/{agent_id}/device/variable',                queryParams: ['value', 'path', 'has_history', 'metric'] },
  eyes_snmp:                 { method: 'GET',    url: '/agent/{agent_id}/device/eye/snmp' },
  eyes_tcp:                  { method: 'GET',    url: '/agent/{agent_id}/device/eye/tcp' },
  unmanaged_devices:         { method: 'GET',    url: '/agent/{agent_id}/device/monitoring-state/unmanaged' },
  external_host:             { method: 'POST',   url: '/agent/{agent_id}/device/external-host',           hasBody: true },
  dhcp_discovery:            { method: 'PUT',    url: '/agent/{agent_id}/network/dhcp-device-discovery',  hasBody: true },
};
