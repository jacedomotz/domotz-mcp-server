/**
 * Stateful context store.
 * Remembers agent_id and device_id across tool calls so Claude
 * doesn't need to repeat them in every request.
 */
let context = {};

export function getContext() {
  return context;
}

export function updateContext(args) {
  for (const key of ['agent_id', 'device_id']) {
    if (args[key] !== undefined) context[key] = args[key];
  }
}
