#!/usr/bin/env node

/**
 * Domotz MCP Server
 * Category-based tool consolidation: 10 tools replacing 130 flat tools.
 * ~80% context reduction for LLM tool definitions.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { domotzApi } from './lib/api.js';
import { dispatch } from './lib/registry.js';

// Import all categories
import * as agents from './categories/agents.js';
import * as devices from './categories/devices.js';
import * as monitoring from './categories/monitoring.js';
import * as alerts from './categories/alerts.js';
import * as network from './categories/network.js';
import * as configuration from './categories/configuration.js';
import * as power from './categories/power.js';
import * as drivers from './categories/drivers.js';
import * as inventory from './categories/inventory.js';
import * as account from './categories/account.js';

const categories = [agents, devices, monitoring, alerts, network, configuration, power, drivers, inventory, account];

// Build lookup: tool name -> { actions }
const toolMap = {};
for (const cat of categories) {
  toolMap[cat.tool.name] = cat.actions;
}

// Create MCP server
const server = new Server(
  { name: 'domotz-mcp-server', version: '2.0.0' },
  { capabilities: { tools: {} } }
);

// List tools: return 10 category tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: categories.map(cat => cat.tool)
}));

// Handle tool execution: dispatch to action registry
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const actionMap = toolMap[name];
    if (!actionMap) throw new Error(`Unknown tool: ${name}`);
    return await dispatch(actionMap, args.action, args, domotzApi);
  } catch (error) {
    const errorInfo = error.response
      ? { error: true, status: error.response.status, message: error.response.data?.message || error.message, data: error.response.data }
      : { error: true, message: error.message };
    return {
      content: [{ type: 'text', text: JSON.stringify(errorInfo, null, 2) }],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Domotz MCP Server v2.0.0 running on stdio with ${categories.length} category tools`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
