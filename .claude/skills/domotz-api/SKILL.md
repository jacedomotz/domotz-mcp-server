---
name: domotz-api
description: "This skill should be used when working with the Domotz MCP server tools, querying network monitoring data, managing collectors/agents, devices, SNMP/TCP sensors, alerts, network policies, or any Domotz API operation."
version: 2.0.0
---

# Domotz MCP Server - API Skill

## Architecture

This MCP server consolidates **133 Domotz API actions** into **10 category tools**. Instead of 130+ flat tool definitions, each category tool uses an `action` parameter for routing to the correct endpoint.

**How it works:**

1. Every tool call requires an `action` string (e.g., `"list"`, `"get"`, `"status_history"`)
2. The generic dispatcher (`lib/registry.js`) looks up the action in the category's action map
3. URL path parameters like `{agent_id}` are replaced from your arguments
4. Query parameters, request bodies, and HTTP method are all derived from the action definition

**Key insight:** You never specify HTTP methods or URLs. Just pick the right tool, set the `action`, and provide the required parameters.

## Quick Reference: The 10 Tools

| Tool | Actions | Description |
|------|---------|-------------|
| `domotz_agents` | 31 | Collectors: list, status, uptime, VPN, variables, topology |
| `domotz_devices` | 17 | Devices: list, get, edit, status history, RTD, connect |
| `domotz_monitoring` | 13 | SNMP/TCP sensors (Eyes): create, delete, history, triggers |
| `domotz_alerts` | 8 | Alert profiles: list, bind/unbind to agents and devices |
| `domotz_network` | 14 | Scan policies, interfaces, routed networks, excluded devices |
| `domotz_configuration` | 8 | Config backups, credentials, SNMP authentication |
| `domotz_power` | 7 | Power actions, outlets, attach/detach devices |
| `domotz_drivers` | 8 | Custom drivers: associations, execute actions |
| `domotz_inventory` | 19 | Custom fields, tags, device profiles, device types |
| `domotz_account` | 5 | User info, API usage, areas, teams |

## Common Parameters

These parameters appear across multiple tools:

| Parameter | Type | Used By | Description |
|-----------|------|---------|-------------|
| `action` | string | **All tools** | Required. Selects which API operation to perform |
| `agent_id` | integer | Most tools | Domotz collector/agent ID |
| `device_id` | integer | Device-scoped tools | Device ID within a collector |
| `from` | string | Time-series actions | Start time (ISO 8601 or relative). Defaults to 1 week ago |
| `to` | string | Time-series actions | End time. Defaults to now |
| `page_size` | number | Paginated actions | Items per page (1-1000) |
| `page_number` | number | Paginated actions | Page index (0-based) |
| `body` | object | Create/update actions | JSON request body for POST/PUT operations |

## Tool-Action Lookup

### domotz_agents (31 actions)

| Action | What it does |
|--------|-------------|
| `list` | List all collectors (paginated, filterable by name/team) |
| `count` | Count collectors (HEAD request, returns count) |
| `get` | Get single collector details |
| `delete` | Delete a collector |
| `activity_log` | Collector activity log (filterable by time/type) |
| `connection_consumption` | Bandwidth consumption data |
| `vpn_connections` | List VPN sessions |
| `create_vpn` | Create a VPN session (needs body) |
| `delete_vpn` | Delete a VPN session |
| `status_history` | Online/offline event history |
| `speed_test_history` | Internet speed test results |
| `ip_conflicts` | Detected IP conflicts |
| `rtd_stats` | Round-trip delay statistics for all devices |
| `network_topology` | Network topology map |
| `uptime` | Collector uptime percentage |
| `list_uptime_all` | Uptime for all collectors (no agent_id needed) |
| `variables` | Collector-level variables (paginated) |
| `count_variables` | Count collector variables (HEAD) |
| `variable_history` | Time-series for a specific variable |
| `move` | Move collector to a different team |
| `eyes_usage` | SNMP/TCP sensor usage statistics |
| `metric_usage` | Metric usage statistics |
| `device_applications` | Applications across all devices on collector |
| `count_device_applications` | Count applications (HEAD) |
| `device_variables` | Variables across all devices on collector |
| `count_device_variables` | Count device variables (HEAD) |
| `eyes_snmp` | All SNMP sensors across collector |
| `eyes_tcp` | All TCP sensors across collector |
| `unmanaged_devices` | Devices not being monitored |
| `external_host` | Add an external host to monitor (needs body) |
| `dhcp_discovery` | Configure DHCP discovery (needs body) |

### domotz_devices (17 actions)

| Action | What it does |
|--------|-------------|
| `list` | List all devices on a collector |
| `get` | Get single device details |
| `delete` | Delete a device |
| `delete_down` | Delete all down devices on a collector |
| `edit` | Edit a device field (needs `field` param and body) |
| `hide` | Hide a device from the dashboard |
| `status_history` | Device online/offline event history |
| `rtd_history` | Round-trip delay time series |
| `connect` | Create a remote connection to device (needs body) |
| `onvif_snapshot` | Get ONVIF camera snapshot |
| `uptime` | Device uptime percentage |
| `monitoring_state` | Set monitoring state (needs body) |
| `applications` | Applications on a device |
| `count_applications` | Count applications (HEAD) |
| `variables` | Device variables (paginated) |
| `count_variables` | Count device variables (HEAD) |
| `variable_history` | Time-series for a specific device variable |

### domotz_monitoring (13 actions)

| Action | What it does |
|--------|-------------|
| `list_snmp` | List SNMP sensors on a device |
| `create_snmp` | Create an SNMP sensor (needs body) |
| `delete_snmp` | Delete an SNMP sensor |
| `snmp_history` | SNMP sensor value history |
| `snmp_trigger_functions` | Available trigger functions for a sensor |
| `list_snmp_triggers` | List triggers on an SNMP sensor |
| `create_snmp_trigger` | Create a trigger (needs body) |
| `delete_snmp_trigger` | Delete a trigger |
| `create_snmp_trigger_alert` | Bind alert medium to trigger (needs `medium_name`) |
| `delete_snmp_trigger_alert` | Remove alert medium from trigger |
| `list_tcp` | List TCP sensors on a device |
| `create_tcp` | Create a TCP sensor (needs body) |
| `delete_tcp` | Delete a TCP sensor |

### domotz_alerts (8 actions)

| Action | What it does |
|--------|-------------|
| `list_profiles` | List all alert profiles |
| `bind_to_agent` | Bind alert profile to a collector |
| `unbind_from_agent` | Unbind alert profile from a collector |
| `bind_to_device` | Bind alert profile to a specific device |
| `unbind_from_device` | Unbind alert profile from a device |
| `get_agent_bindings` | List alert bindings for a collector |
| `get_device_bindings` | List alert bindings for devices on a collector |
| `list_profiles_deprecated` | List profiles by user ID (deprecated) |

### domotz_network (14 actions)

| Action | What it does |
|--------|-------------|
| `get_external_scan_policy` | Get external host scan policy |
| `set_external_scan_policy` | Set external host scan policy (needs body) |
| `delete_external_scan_policy` | Delete external host scan policy |
| `get_interfaces` | List network interfaces |
| `get_interfaces_policy` | Get interfaces scanning policy |
| `set_interfaces_policy` | Set interfaces scanning policy (needs body) |
| `delete_interfaces_policy` | Delete interfaces scanning policy |
| `get_ip_scan_policy` | Get IP scan policy |
| `set_ip_scan_policy` | Set IP scan policy (needs body) |
| `delete_ip_scan_policy` | Delete IP scan policy |
| `create_routed_network` | Add a routed network (needs body) |
| `list_excluded` | List excluded devices |
| `add_excluded` | Exclude a device from monitoring |
| `delete_excluded` | Remove device from exclusion list |

### domotz_configuration (8 actions)

| Action | What it does |
|--------|-------------|
| `backup` | Trigger a config backup for a device |
| `history` | List config backup history |
| `create_config` | Upload a configuration (needs body) |
| `get_config` | Get a specific config by timestamp |
| `set_credentials` | Set device credentials (needs body) |
| `get_snmp_auth` | Get SNMP authentication settings |
| `set_snmp_auth` | Set SNMP v3 authentication (needs body) |
| `set_snmp_community` | Set SNMP community string (needs body) |

### domotz_power (7 actions)

| Action | What it does |
|--------|-------------|
| `get_power_actions` | List available power actions for a device |
| `power_action` | Execute a power action (needs `field` param) |
| `get_outlets` | List power outlets on a PDU device |
| `update_outlet` | Update outlet settings (needs body) |
| `trigger_outlet` | Trigger an outlet action (needs `outlet_action` param) |
| `attach_device` | Attach a device to a power outlet |
| `detach_device` | Detach a device from a power outlet |

### domotz_drivers (8 actions)

| Action | What it does |
|--------|-------------|
| `list` | List all custom drivers |
| `get` | Get custom driver details |
| `create_association` | Associate driver with a device (needs body) |
| `delete_association` | Remove a driver association |
| `update_association_params` | Update association parameters (needs body) |
| `list_associations` | List driver associations for a collector |
| `execute_action` | Execute a custom driver action (needs body) |
| `re_enable` | Re-enable failed associations |

### domotz_inventory (19 actions)

| Action | What it does |
|--------|-------------|
| `get_inventory` | Get all inventory field definitions |
| `delete_inventory` | Delete all inventory fields |
| `create_field` | Create an inventory field (needs `inventory_field` + body) |
| `delete_field` | Delete an inventory field |
| `update_field` | Update an inventory field (needs body) |
| `get_device_inventory` | Get inventory data for a device |
| `set_device_field` | Set inventory field value on a device (needs body) |
| `delete_device_field` | Clear inventory field on a device |
| `get_tags` | List all custom tags |
| `create_tag` | Create a custom tag (needs body) |
| `edit_tag` | Edit a custom tag (needs body) |
| `delete_tag` | Delete a custom tag |
| `bind_tag` | Bind a tag to a device |
| `unbind_tag` | Unbind a tag from a device |
| `get_device_tags` | Get tags bound to a device |
| `list_profiles` | List device profiles |
| `apply_profile` | Apply a profile to devices (needs body) |
| `list_base_types` | List base device types |
| `list_detected_types` | List detected device types |

### domotz_account (5 actions)

| Action | What it does |
|--------|-------------|
| `get_user` | Get current user info |
| `api_usage` | Get API usage statistics |
| `list_areas` | List all areas |
| `list_teams` | List teams in an area |
| `create_team` | Create a team (needs body) |

## Important Gotchas

1. **`outlet_action` vs `action`**: The `trigger_outlet` action in `domotz_power` uses a parameter called `outlet_action` (not `action`) to specify what the outlet should do. The `action` param is always the tool's operation selector.

2. **HEAD requests return counts**: Actions like `count`, `count_variables`, `count_applications` use HTTP HEAD. The response is `{ "count": N }` extracted from the `X-Entities-Count` header. These are lightweight and don't transfer response bodies.

3. **`hasBody` actions need `body` param**: Any action marked with `hasBody: true` expects a `body` object. If you omit it, an empty `{}` is sent. Check the Domotz API docs for the required body schema.

4. **DELETE returns `{ success, status }`**: Delete operations don't return the deleted resource. They return `{ "success": true, "status": 204 }`.

5. **`field` param in devices and power**: The `edit` action on devices and the `power_action` action both use a `field` URL parameter. For device edits, this is the field name to update (e.g., `"importance"`, `"details"`). For power actions, it identifies the specific power action to execute.

6. **Pagination defaults**: Most list endpoints return all results if `page_size` is not specified. Use pagination for large result sets to avoid timeouts.

7. **Time parameters**: `from` and `to` accept ISO 8601 timestamps. Most default to the last 7 days if omitted.

8. **`list_uptime_all` needs no agent_id**: This is the only agents action that works without specifying a collector.

## References

- [Full action catalog by category](references/tool-reference.md)
- [Common query examples](examples/common-queries.md)
