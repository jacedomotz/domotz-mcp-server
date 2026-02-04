#!/usr/bin/env node

/**
 * Domotz MCP Server
 * Category-based tool consolidation: 10 category tools + 3 composite tools.
 * Response compression, stateful context, and composite operations.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { domotzApi } from './lib/api.js';
import { dispatch } from './lib/registry.js';
import { getContext, updateContext } from './lib/context.js';
import { tools as compositeTools, handleComposite } from './categories/composites.js';

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

// Build composite lookup
const compositeSet = new Set(compositeTools.map(t => t.name));

// Create MCP server
const server = new Server(
  { name: 'domotz-mcp-server', version: '2.1.0' },
  { capabilities: { tools: {} } }
);

// List tools: return 10 category tools + 3 composite tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [...categories.map(cat => cat.tool), ...compositeTools]
}));

// Handle tool execution: dispatch to action registry or composite handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Auto-fill IDs from stateful context if not provided
  const ctx = getContext();
  for (const key of ['agent_id', 'device_id']) {
    if (args[key] === undefined && ctx[key] !== undefined) {
      args[key] = ctx[key];
    }
  }

  try {
    let result;

    if (compositeSet.has(name)) {
      result = await handleComposite(name, args, domotzApi);
    } else {
      const actionMap = toolMap[name];
      if (!actionMap) throw new Error(`Unknown tool: ${name}`);
      result = await dispatch(actionMap, args.action, args, domotzApi);
    }

    // Save IDs to context after successful call
    updateContext(args);
    return result;
  } catch (error) {
    const errorInfo = error.response
      ? { error: true, status: error.response.status, message: error.response.data?.message || error.message, data: error.response.data }
      : { error: true, message: error.message };
    return {
      content: [{ type: 'text', text: JSON.stringify(errorInfo) }],
      isError: true
    };
  }
});

// Start the server
const toolCount = categories.length + compositeTools.length;
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`Domotz MCP Server v2.1.0 running on stdio with ${toolCount} tools (${categories.length} category + ${compositeTools.length} composite)`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
