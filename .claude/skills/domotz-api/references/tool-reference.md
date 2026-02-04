# Domotz MCP Server - Full Tool Reference

Complete catalog of all 133 actions across 10 category tools. Each entry shows the action name, HTTP method, URL pattern, required path parameters, optional query parameters, and whether it accepts a request body.

---

## domotz_agents

Manage Domotz collectors (agents). 31 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `list` | GET | `/agent` | - | page_size, page_number, display_name, team_name | - |
| `count` | HEAD | `/agent` | - | display_name, team_name | - |
| `get` | GET | `/agent/{agent_id}` | agent_id | - | - |
| `delete` | DELETE | `/agent/{agent_id}` | agent_id | - | - |
| `activity_log` | GET | `/agent/{agent_id}/activity-log` | agent_id | from, to, type | - |
| `connection_consumption` | GET | `/agent/{agent_id}/connection/consumption` | agent_id | - | - |
| `vpn_connections` | GET | `/agent/{agent_id}/connection/vpn-session` | agent_id | - | - |
| `create_vpn` | POST | `/agent/{agent_id}/connection/vpn-session` | agent_id | - | Yes |
| `delete_vpn` | DELETE | `/agent/{agent_id}/connection/vpn-session/{vpn_session_id}` | agent_id, vpn_session_id | - | - |
| `status_history` | GET | `/agent/{agent_id}/history/network/event` | agent_id | from, to | - |
| `speed_test_history` | GET | `/agent/{agent_id}/history/network/speed` | agent_id | from, to | - |
| `ip_conflicts` | GET | `/agent/{agent_id}/ip-conflict` | agent_id | - | - |
| `rtd_stats` | GET | `/agent/{agent_id}/device/rtd` | agent_id | - | - |
| `network_topology` | GET | `/agent/{agent_id}/network-topology` | agent_id | - | - |
| `uptime` | GET | `/agent/{agent_id}/uptime` | agent_id | from, to | - |
| `list_uptime_all` | GET | `/agent/uptime` | - | from, to | - |
| `variables` | GET | `/agent/{agent_id}/variable` | agent_id | page_size, page_number, value, path, sort_by, sorting_direction, has_history, metric | - |
| `count_variables` | HEAD | `/agent/{agent_id}/variable` | agent_id | value, path, has_history, metric | - |
| `variable_history` | GET | `/agent/{agent_id}/variable/{variable_id}/history` | agent_id, variable_id | from, to | - |
| `move` | PUT | `/agent/{agent_id}/ownership/team/{team_id}` | agent_id, team_id | - | - |
| `eyes_usage` | GET | `/agent/{agent_id}/eye-statistics` | agent_id | - | - |
| `metric_usage` | GET | `/agent/{agent_id}/metric-statistics` | agent_id | - | - |
| `device_applications` | GET | `/agent/{agent_id}/device/application` | agent_id | page_size, page_number, name, device_ids | - |
| `count_device_applications` | HEAD | `/agent/{agent_id}/device/application` | agent_id | name, device_ids | - |
| `device_variables` | GET | `/agent/{agent_id}/device/variable` | agent_id | page_size, page_number, value, path, sort_by, sorting_direction, has_history, metric | - |
| `count_device_variables` | HEAD | `/agent/{agent_id}/device/variable` | agent_id | value, path, has_history, metric | - |
| `eyes_snmp` | GET | `/agent/{agent_id}/device/eye/snmp` | agent_id | - | - |
| `eyes_tcp` | GET | `/agent/{agent_id}/device/eye/tcp` | agent_id | - | - |
| `unmanaged_devices` | GET | `/agent/{agent_id}/device/monitoring-state/unmanaged` | agent_id | - | - |
| `external_host` | POST | `/agent/{agent_id}/device/external-host` | agent_id | - | Yes |
| `dhcp_discovery` | PUT | `/agent/{agent_id}/network/dhcp-device-discovery` | agent_id | - | Yes |

---

## domotz_devices

Manage devices on Domotz collectors. 17 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `list` | GET | `/agent/{agent_id}/device` | agent_id | show_hidden, show_excluded | - |
| `get` | GET | `/agent/{agent_id}/device/{device_id}` | agent_id, device_id | - | - |
| `delete` | DELETE | `/agent/{agent_id}/device/{device_id}` | agent_id, device_id | - | - |
| `delete_down` | DELETE | `/agent/{agent_id}/device` | agent_id | - | - |
| `edit` | PUT | `/agent/{agent_id}/device/{device_id}/{field}` | agent_id, device_id, field | - | Yes |
| `hide` | DELETE | `/agent/{agent_id}/device/{device_id}/visibility` | agent_id, device_id | - | - |
| `status_history` | GET | `/agent/{agent_id}/device/{device_id}/history/network/event` | agent_id, device_id | from, to | - |
| `rtd_history` | GET | `/agent/{agent_id}/device/{device_id}/history/rtd` | agent_id, device_id | from, to | - |
| `connect` | POST | `/agent/{agent_id}/device/{device_id}/connection` | agent_id, device_id | - | Yes |
| `onvif_snapshot` | GET | `/agent/{agent_id}/device/{device_id}/multimedia/camera/snapshot` | agent_id, device_id | - | - |
| `uptime` | GET | `/agent/{agent_id}/device/{device_id}/uptime` | agent_id, device_id | from, to | - |
| `monitoring_state` | PUT | `/agent/{agent_id}/device/{device_id}/monitoring-state` | agent_id, device_id | - | Yes |
| `applications` | GET | `/agent/{agent_id}/device/{device_id}/application` | agent_id, device_id | page_size, page_number, name, device_ids | - |
| `count_applications` | HEAD | `/agent/{agent_id}/device/{device_id}/application` | agent_id, device_id | name, device_ids | - |
| `variables` | GET | `/agent/{agent_id}/device/{device_id}/variable` | agent_id, device_id | page_size, page_number, value, path, sort_by, sorting_direction, has_history, metric | - |
| `count_variables` | HEAD | `/agent/{agent_id}/device/{device_id}/variable` | agent_id, device_id | value, path, has_history, metric | - |
| `variable_history` | GET | `/agent/{agent_id}/device/{device_id}/variable/{variable_id}/history` | agent_id, device_id, variable_id | from, to | - |

---

## domotz_monitoring

Manage SNMP and TCP sensors (Eyes) on devices. 13 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `list_snmp` | GET | `/agent/{agent_id}/device/{device_id}/eye/snmp` | agent_id, device_id | - | - |
| `create_snmp` | POST | `/agent/{agent_id}/device/{device_id}/eye/snmp` | agent_id, device_id | - | Yes |
| `delete_snmp` | DELETE | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}` | agent_id, device_id, sensor_id | - | - |
| `snmp_history` | GET | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/history` | agent_id, device_id, sensor_id | from, to | - |
| `snmp_trigger_functions` | GET | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/function` | agent_id, device_id, sensor_id | - | - |
| `list_snmp_triggers` | GET | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger` | agent_id, device_id, sensor_id | - | - |
| `create_snmp_trigger` | POST | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger` | agent_id, device_id, sensor_id | - | Yes |
| `delete_snmp_trigger` | DELETE | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}` | agent_id, device_id, sensor_id, trigger_id | - | - |
| `create_snmp_trigger_alert` | POST | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}/alert/{medium_name}` | agent_id, device_id, sensor_id, trigger_id, medium_name | - | Yes |
| `delete_snmp_trigger_alert` | DELETE | `/agent/{agent_id}/device/{device_id}/eye/snmp/{sensor_id}/trigger/{trigger_id}/alert/{medium_name}` | agent_id, device_id, sensor_id, trigger_id, medium_name | - | - |
| `list_tcp` | GET | `/agent/{agent_id}/device/{device_id}/eye/tcp` | agent_id, device_id | - | - |
| `create_tcp` | POST | `/agent/{agent_id}/device/{device_id}/eye/tcp` | agent_id, device_id | - | Yes |
| `delete_tcp` | DELETE | `/agent/{agent_id}/device/{device_id}/eye/tcp/{service_id}` | agent_id, device_id, service_id | - | - |

---

## domotz_alerts

Manage alert profiles and their bindings to agents/devices. 8 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `list_profiles` | GET | `/alert-profile` | - | - | - |
| `bind_to_agent` | POST | `/alert-profile/{alert_profile_id}/binding/agent/{agent_id}` | alert_profile_id, agent_id | - | - |
| `unbind_from_agent` | DELETE | `/alert-profile/{alert_profile_id}/binding/agent/{agent_id}` | alert_profile_id, agent_id | - | - |
| `bind_to_device` | POST | `/alert-profile/{alert_profile_id}/binding/agent/{agent_id}/device/{device_id}` | alert_profile_id, agent_id, device_id | - | - |
| `unbind_from_device` | DELETE | `/alert-profile/{alert_profile_id}/binding/agent/{agent_id}/device/{device_id}` | alert_profile_id, agent_id, device_id | - | - |
| `get_agent_bindings` | GET | `/alert-profile/binding/agent/{agent_id}` | agent_id | - | - |
| `get_device_bindings` | GET | `/alert-profile/binding/agent/{agent_id}/device` | agent_id | - | - |
| `list_profiles_deprecated` | GET | `/user/{user_id}/alert-profile` | user_id | - | - |

---

## domotz_network

Manage network scan policies, interfaces, and excluded devices. 14 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `get_external_scan_policy` | GET | `/agent/{agent_id}/network/external-host-scan-policy` | agent_id | - | - |
| `set_external_scan_policy` | PUT | `/agent/{agent_id}/network/external-host-scan-policy` | agent_id | - | Yes |
| `delete_external_scan_policy` | DELETE | `/agent/{agent_id}/network/external-host-scan-policy` | agent_id | - | - |
| `get_interfaces` | GET | `/agent/{agent_id}/network/interfaces` | agent_id | - | - |
| `get_interfaces_policy` | GET | `/agent/{agent_id}/network/interfaces-policy` | agent_id | - | - |
| `set_interfaces_policy` | PUT | `/agent/{agent_id}/network/interfaces-policy` | agent_id | - | Yes |
| `delete_interfaces_policy` | DELETE | `/agent/{agent_id}/network/interfaces-policy` | agent_id | - | - |
| `get_ip_scan_policy` | GET | `/agent/{agent_id}/network/ip-scan-policy` | agent_id | - | - |
| `set_ip_scan_policy` | PUT | `/agent/{agent_id}/network/ip-scan-policy` | agent_id | - | Yes |
| `delete_ip_scan_policy` | DELETE | `/agent/{agent_id}/network/ip-scan-policy` | agent_id | - | - |
| `create_routed_network` | POST | `/agent/{agent_id}/network/routed` | agent_id | - | Yes |
| `list_excluded` | GET | `/agent/{agent_id}/network/excluded-device` | agent_id | - | - |
| `add_excluded` | POST | `/agent/{agent_id}/network/excluded-device/{device_id}` | agent_id, device_id | - | - |
| `delete_excluded` | DELETE | `/agent/{agent_id}/network/excluded-device/{device_id}` | agent_id, device_id | - | - |

---

## domotz_configuration

Manage device configuration backups, credentials, and SNMP authentication. 8 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `backup` | POST | `/agent/{agent_id}/device/{device_id}/configuration-management/backup` | agent_id, device_id | - | - |
| `history` | GET | `/agent/{agent_id}/device/{device_id}/configuration-management/history` | agent_id, device_id | - | - |
| `create_config` | POST | `/agent/{agent_id}/device/{device_id}/configuration-management/history` | agent_id, device_id | - | Yes |
| `get_config` | GET | `/agent/{agent_id}/device/{device_id}/configuration-management/history/{configuration_timestamp}` | agent_id, device_id, configuration_timestamp | - | - |
| `set_credentials` | PUT | `/agent/{agent_id}/device/{device_id}/credentials` | agent_id, device_id | - | Yes |
| `get_snmp_auth` | GET | `/agent/{agent_id}/device/{device_id}/snmp-authentication` | agent_id, device_id | - | - |
| `set_snmp_auth` | PUT | `/agent/{agent_id}/device/{device_id}/snmp-authentication` | agent_id, device_id | - | Yes |
| `set_snmp_community` | PUT | `/agent/{agent_id}/device/{device_id}/snmp-community` | agent_id, device_id | - | Yes |

---

## domotz_power

Manage device power actions and power outlets. 7 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `get_power_actions` | GET | `/agent/{agent_id}/device/{device_id}/action/power` | agent_id, device_id | - | - |
| `power_action` | POST | `/agent/{agent_id}/device/{device_id}/action/power/{field}` | agent_id, device_id, field | - | - |
| `get_outlets` | GET | `/agent/{agent_id}/device/{device_id}/power-outlet` | agent_id, device_id | - | - |
| `update_outlet` | PUT | `/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}` | agent_id, device_id, power_outlet_id | - | Yes |
| `trigger_outlet` | POST | `/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/action/{outlet_action}` | agent_id, device_id, power_outlet_id, outlet_action | - | - |
| `attach_device` | POST | `/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/attach/{attached_device_id}` | agent_id, device_id, power_outlet_id, attached_device_id | - | - |
| `detach_device` | DELETE | `/agent/{agent_id}/device/{device_id}/power-outlet/{power_outlet_id}/attach/{attached_device_id}` | agent_id, device_id, power_outlet_id, attached_device_id | - | - |

---

## domotz_drivers

Manage custom drivers and their associations with devices. 8 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `list` | GET | `/custom-driver` | - | - | - |
| `get` | GET | `/custom-driver/{custom_driver_id}` | custom_driver_id | - | - |
| `create_association` | POST | `/custom-driver/{custom_driver_id}/agent/{agent_id}/device/{device_id}/association` | custom_driver_id, agent_id, device_id | - | Yes |
| `execute_action` | POST | `/custom-driver/{custom_driver_id}/agent/{agent_id}/device/{device_id}/execute/{action_id}` | custom_driver_id, agent_id, device_id, action_id | - | Yes |
| `delete_association` | DELETE | `/custom-driver/{custom_driver_id}/association/{association_id}` | custom_driver_id, association_id | - | - |
| `update_association_params` | PUT | `/custom-driver/{custom_driver_id}/association/{association_id}` | custom_driver_id, association_id | - | Yes |
| `list_associations` | GET | `/custom-driver/agent/{agent_id}/association` | agent_id | - | - |
| `re_enable` | POST | `/custom-driver/association/re-enable` | - | include_unrecoverable | - |

---

## domotz_inventory

Manage inventory fields, custom tags, device profiles, and device types. 19 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `get_inventory` | GET | `/inventory` | - | - | - |
| `delete_inventory` | DELETE | `/inventory` | - | - | - |
| `create_field` | POST | `/inventory/{inventory_field}` | inventory_field | - | Yes |
| `delete_field` | DELETE | `/inventory/{inventory_field}` | inventory_field | - | - |
| `update_field` | PUT | `/inventory/{inventory_field}` | inventory_field | - | Yes |
| `get_device_inventory` | GET | `/agent/{agent_id}/device/{device_id}/inventory` | agent_id, device_id | - | - |
| `set_device_field` | PUT | `/agent/{agent_id}/device/{device_id}/inventory/{inventory_field}` | agent_id, device_id, inventory_field | - | Yes |
| `delete_device_field` | DELETE | `/agent/{agent_id}/device/{device_id}/inventory/{inventory_field}` | agent_id, device_id, inventory_field | - | - |
| `get_tags` | GET | `/custom-tag` | - | - | - |
| `create_tag` | POST | `/custom-tag` | - | - | Yes |
| `edit_tag` | PUT | `/custom-tag/{custom_tag_id}` | custom_tag_id | - | Yes |
| `delete_tag` | DELETE | `/custom-tag/{custom_tag_id}` | custom_tag_id | - | - |
| `bind_tag` | POST | `/agent/{agent_id}/device/{device_id}/custom-tag/{custom_tag_id}/binding` | agent_id, device_id, custom_tag_id | - | - |
| `unbind_tag` | DELETE | `/agent/{agent_id}/device/{device_id}/custom-tag/{custom_tag_id}/binding` | agent_id, device_id, custom_tag_id | - | - |
| `get_device_tags` | GET | `/agent/{agent_id}/device/{device_id}/custom-tag/binding` | agent_id, device_id | - | - |
| `list_profiles` | GET | `/device-profile` | - | - | - |
| `apply_profile` | POST | `/device-profile/{device_profile_id}/apply` | device_profile_id | - | Yes |
| `list_base_types` | GET | `/type/device/base` | - | - | - |
| `list_detected_types` | GET | `/type/device/detected` | - | - | - |

---

## domotz_account

Account information, API usage, areas, and teams. 5 actions.

| Action | Method | URL | Path Params | Query Params | Body |
|--------|--------|-----|-------------|--------------|------|
| `get_user` | GET | `/user` | - | - | - |
| `api_usage` | GET | `/meta/usage` | - | - | - |
| `list_areas` | GET | `/area` | - | - | - |
| `list_teams` | GET | `/area/{area_id}/team` | area_id | - | - |
| `create_team` | POST | `/area/{area_id}/team` | area_id | - | Yes |
