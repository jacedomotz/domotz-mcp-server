# Domotz MCP Server - Common Query Examples

Natural language queries mapped to the exact tool calls. Use these as patterns for constructing your own calls.

---

## Agents / Collectors

**"List all collectors"**
```json
Tool: domotz_agents
Args: { "action": "list" }
```

**"How many collectors do I have?"**
```json
Tool: domotz_agents
Args: { "action": "count" }
```

**"Get details for collector 5"**
```json
Tool: domotz_agents
Args: { "action": "get", "agent_id": 5 }
```

**"Show the uptime for all collectors over the last 30 days"**
```json
Tool: domotz_agents
Args: { "action": "list_uptime_all", "from": "2025-01-01T00:00:00Z", "to": "2025-01-31T00:00:00Z" }
```

**"Are there any IP conflicts on collector 12?"**
```json
Tool: domotz_agents
Args: { "action": "ip_conflicts", "agent_id": 12 }
```

**"Show me the network topology for site 8"**
```json
Tool: domotz_agents
Args: { "action": "network_topology", "agent_id": 8 }
```

**"Show internet speed test history for collector 3"**
```json
Tool: domotz_agents
Args: { "action": "speed_test_history", "agent_id": 3 }
```

---

## Devices

**"List all devices on collector 5"**
```json
Tool: domotz_devices
Args: { "action": "list", "agent_id": 5 }
```

**"Get details for device 200 on collector 5"**
```json
Tool: domotz_devices
Args: { "action": "get", "agent_id": 5, "device_id": 200 }
```

**"Show the status history for device 42 on collector 5 over the past week"**
```json
Tool: domotz_devices
Args: { "action": "status_history", "agent_id": 5, "device_id": 42 }
```

**"What's the latency (RTD) history for device 99?"**
```json
Tool: domotz_devices
Args: { "action": "rtd_history", "agent_id": 5, "device_id": 99 }
```

**"Show uptime for device 10 on collector 2 for the last month"**
```json
Tool: domotz_devices
Args: { "action": "uptime", "agent_id": 2, "device_id": 10, "from": "2025-01-01T00:00:00Z" }
```

**"Delete all down devices on collector 7"**
```json
Tool: domotz_devices
Args: { "action": "delete_down", "agent_id": 7 }
```

---

## Monitoring (SNMP/TCP Sensors)

**"List all SNMP sensors on device 50"**
```json
Tool: domotz_monitoring
Args: { "action": "list_snmp", "agent_id": 5, "device_id": 50 }
```

**"Show SNMP sensor history for sensor 3 on device 50"**
```json
Tool: domotz_monitoring
Args: { "action": "snmp_history", "agent_id": 5, "device_id": 50, "sensor_id": 3 }
```

**"List TCP sensors on device 50"**
```json
Tool: domotz_monitoring
Args: { "action": "list_tcp", "agent_id": 5, "device_id": 50 }
```

**"What trigger functions are available for SNMP sensor 3?"**
```json
Tool: domotz_monitoring
Args: { "action": "snmp_trigger_functions", "agent_id": 5, "device_id": 50, "sensor_id": 3 }
```

---

## Alerts

**"List all alert profiles"**
```json
Tool: domotz_alerts
Args: { "action": "list_profiles" }
```

**"What alerts are bound to collector 5?"**
```json
Tool: domotz_alerts
Args: { "action": "get_agent_bindings", "agent_id": 5 }
```

**"Bind alert profile 2 to device 100 on collector 5"**
```json
Tool: domotz_alerts
Args: { "action": "bind_to_device", "alert_profile_id": 2, "agent_id": 5, "device_id": 100 }
```

---

## Network

**"Show network interfaces on collector 5"**
```json
Tool: domotz_network
Args: { "action": "get_interfaces", "agent_id": 5 }
```

**"What's the IP scan policy for collector 5?"**
```json
Tool: domotz_network
Args: { "action": "get_ip_scan_policy", "agent_id": 5 }
```

**"List excluded devices on collector 5"**
```json
Tool: domotz_network
Args: { "action": "list_excluded", "agent_id": 5 }
```

---

## Configuration

**"Trigger a config backup for device 30 on collector 5"**
```json
Tool: domotz_configuration
Args: { "action": "backup", "agent_id": 5, "device_id": 30 }
```

**"Show config backup history for device 30"**
```json
Tool: domotz_configuration
Args: { "action": "history", "agent_id": 5, "device_id": 30 }
```

**"Get SNMP authentication settings for device 30"**
```json
Tool: domotz_configuration
Args: { "action": "get_snmp_auth", "agent_id": 5, "device_id": 30 }
```

---

## Power

**"What power actions are available for device 15?"**
```json
Tool: domotz_power
Args: { "action": "get_power_actions", "agent_id": 5, "device_id": 15 }
```

**"List power outlets on PDU device 15"**
```json
Tool: domotz_power
Args: { "action": "get_outlets", "agent_id": 5, "device_id": 15 }
```

**"Cycle outlet 2 on PDU device 15"**
```json
Tool: domotz_power
Args: { "action": "trigger_outlet", "agent_id": 5, "device_id": 15, "power_outlet_id": 2, "outlet_action": "cycle" }
```

---

## Drivers

**"List all custom drivers"**
```json
Tool: domotz_drivers
Args: { "action": "list" }
```

**"Show driver associations for collector 5"**
```json
Tool: domotz_drivers
Args: { "action": "list_associations", "agent_id": 5 }
```

---

## Inventory

**"List all custom tags"**
```json
Tool: domotz_inventory
Args: { "action": "get_tags" }
```

**"Show inventory fields for device 42 on collector 5"**
```json
Tool: domotz_inventory
Args: { "action": "get_device_inventory", "agent_id": 5, "device_id": 42 }
```

**"List all device profiles"**
```json
Tool: domotz_inventory
Args: { "action": "list_profiles" }
```

**"What base device types are available?"**
```json
Tool: domotz_inventory
Args: { "action": "list_base_types" }
```

---

## Account

**"Who am I logged in as?"**
```json
Tool: domotz_account
Args: { "action": "get_user" }
```

**"Show my API usage"**
```json
Tool: domotz_account
Args: { "action": "api_usage" }
```

**"List all areas"**
```json
Tool: domotz_account
Args: { "action": "list_areas" }
```
