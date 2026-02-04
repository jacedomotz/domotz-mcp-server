# Domotz MCP Server for Claude

Connect Claude AI to your Domotz network monitoring platform using the Model Context Protocol (MCP). This integration gives Claude access to **10 category tools covering 133 API actions**, enabling natural language queries about your network infrastructure.

## What This Does

With this MCP server, you can ask Claude things like:
- "Show me all devices on the network that are currently offline"
- "What's the uptime history for my core switch(s) over the last month?"
- "List all collectors and their connection status"
- "Are there any active IP conflicts?"

Claude translates your natural language requests into Domotz API calls and presents the results in a readable format.

---

## Prerequisites

Before you begin, ensure you have:

1. **A Domotz account** with API access enabled
2. **Claude Desktop** installed ([download here](https://claude.ai/download))
3. **Node.js 18+** installed on your system
4. **Your Domotz API Key** (see below for how to generate one)

---

## Quick Start

### Step 1: Generate Your Domotz API Key

1. Log into the [Domotz Portal](https://portal.domotz.com)
2. Navigate to **Account Settings** → **API Keys**
3. Click **Generate New Key**
4. Copy and save the key securely (you won't be able to see it again)

### Step 2: Download the MCP Server Files

Clone or download this repository to your local machine:

```bash
git clone https://github.com/jacedomotz/domotz-mcp-server.git
cd domotz-mcp-server
```

**Remember where you save this folder** - you'll need the full path in Step 4.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Claude Desktop

Locate your Claude Desktop configuration file:

| OS | Path |
|---|---|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

Open the file and add the Domotz MCP server configuration. Use `claude_desktop_config.example.json` as a reference:

```json
{
  "mcpServers": {
    "domotz": {
      "command": "node",
      "args": ["REPLACE_WITH_FULL_PATH_TO/domotz-mcp-server/index.js"],
      "env": {
        "DOMOTZ_API_KEY": "YOUR_API_KEY_HERE",
        "DOMOTZ_API_BASE_URL": "https://api-us-east-1-cell-1.domotz.com/public-api/v1"
      }
    }
  }
}
```

#### You MUST customize three things:

1. **`args` path** - Replace with the full path to `index.js` on your machine:
   - **Windows example:** `["C:\\Users\\YourName\\domotz-mcp-server\\index.js"]`
   - **Mac example:** `["/Users/yourname/domotz-mcp-server/index.js"]`
   - **Linux example:** `["/home/yourname/domotz-mcp-server/index.js"]`

2. **`DOMOTZ_API_KEY`** - Replace with your actual API key from Step 1

3. **`DOMOTZ_API_BASE_URL`** - Use the URL matching your Domotz account region:
   - **US:** `https://api-us-east-1-cell-1.domotz.com/public-api/v1`
   - **Europe:** `https://api-eu-west-1-cell-1.domotz.com/public-api/v1`

> **Windows users:** Use double backslashes (`\\`) in the path, or forward slashes (`/`).

### Step 5: Restart Claude Desktop

Quit and reopen Claude Desktop to load the new MCP server configuration.

### Step 6: Verify the Connection

In Claude, try asking:

> "List my Domotz collectors"

If configured correctly, Claude will query the Domotz API and return your collector list.

---

## Available Capabilities

This MCP server exposes **10 category tools** covering **133 Domotz API actions**:

| Tool | Actions | Example Operations |
|------|---------|-------------------|
| **domotz_agents** | 31 | List collectors, status history, uptime, VPN, topology, variables |
| **domotz_devices** | 17 | List/get devices, status history, RTD metrics, connect, uptime |
| **domotz_monitoring** | 13 | SNMP sensors, TCP sensors, triggers, sensor history |
| **domotz_alerts** | 8 | Alert profiles, bind/unbind to collectors and devices |
| **domotz_network** | 14 | Scan policies, interfaces, routed networks, excluded devices |
| **domotz_configuration** | 8 | Config backups, credentials, SNMP authentication |
| **domotz_power** | 7 | Power actions, outlets, attach/detach devices |
| **domotz_drivers** | 8 | Custom drivers, associations, execute driver actions |
| **domotz_inventory** | 19 | Custom fields, tags, device profiles, device types |
| **domotz_account** | 5 | User info, API usage, areas, teams |

Each tool uses an `action` parameter to select which API operation to perform. For example, `domotz_agents` with `action: "list"` lists all collectors, while `action: "ip_conflicts"` checks for IP conflicts.

---

## Example Queries

Here are some practical queries you can try:

### Network Overview
- "Give me a summary of all my Domotz collectors and their status"
- "How many devices are being monitored across all my sites?"

### Troubleshooting
- "Show me all offline devices on collector 12345"
- "What's the RTD (latency) history for device 67890 over the past week?"
- "Are there any IP conflicts on the main office network?"

### Reporting
- "List all devices with their last seen status for the Acme Corp site"
- "Show me the internet speed test history for the past month"

### Configuration
- "What SNMP sensors are configured on device 11111?"
- "List all custom tags I've created"

---

## Troubleshooting

### "Claude doesn't see the Domotz tools"

1. Verify the path in `claude_desktop_config.json` is correct and points to `index.js`
2. Ensure Node.js is installed and accessible from your PATH
3. Check that the API key is set correctly (no extra spaces or quotes issues)
4. Restart Claude Desktop completely (not just close the window)

### "API calls are failing"

1. Verify your API key is valid in the Domotz portal
2. Check that you're using the correct regional API URL (US vs Europe)
3. Ensure you have the appropriate permissions for the operations you're attempting

### "Rate limiting errors"

The Domotz API has rate limits. If you're making many requests in quick succession, you may hit these limits. Wait a moment and try again.

---

## Security Notes

- **Never share your API key publicly** - The key in `claude_desktop_config.json` is for your use only
- **API keys have full account access** - Anyone with your key can access your Domotz data
- **This MCP server file is safe to share** - It contains only endpoint definitions, not credentials
- **Rotate keys if compromised** - Generate a new key in the Domotz portal if you suspect exposure

---

## File Structure

```
domotz-mcp-server/
├── index.js                            # MCP server entry point
├── package.json                        # Node.js dependencies
├── README.md                           # This file
├── LICENSE                             # MIT license
├── claude_desktop_config.example.json  # Claude Desktop config template
├── lib/
│   ├── api.js                          # Domotz API client (Axios)
│   └── registry.js                     # Generic action dispatcher
├── categories/
│   ├── agents.js                       # domotz_agents (31 actions)
│   ├── devices.js                      # domotz_devices (17 actions)
│   ├── monitoring.js                   # domotz_monitoring (13 actions)
│   ├── alerts.js                       # domotz_alerts (8 actions)
│   ├── network.js                      # domotz_network (14 actions)
│   ├── configuration.js               # domotz_configuration (8 actions)
│   ├── power.js                        # domotz_power (7 actions)
│   ├── drivers.js                      # domotz_drivers (8 actions)
│   ├── inventory.js                    # domotz_inventory (19 actions)
│   └── account.js                      # domotz_account (5 actions)
└── .claude/
    └── skills/
        └── domotz-api/                 # Claude Code skill (auto-loaded)
            ├── SKILL.md                # Main skill reference
            ├── references/
            │   └── tool-reference.md   # Full action catalog
            └── examples/
                └── common-queries.md   # Natural language → tool call examples
```

---

## Resources

- [Domotz API Documentation](https://docs.domotz.com/api)
- [Model Context Protocol (MCP) Specification](https://modelcontextprotocol.io)
- [Claude Desktop Download](https://claude.ai/download)
- [Domotz Portal](https://portal.domotz.com)

---

## License

MIT License - See LICENSE file for details.

---

## About

This MCP server was created to help MSPs, IT teams, and network administrators leverage AI for network monitoring and management tasks. By connecting Claude to Domotz, you can query your network infrastructure using natural language instead of navigating multiple dashboards.

**Questions?** Reach out to the Domotz community on https://www.reddit.com/r/domotz/.
