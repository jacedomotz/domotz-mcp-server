/**
 * Generic action dispatcher for category-based tools.
 * Replaces the 1000-line switch statement with data-driven routing.
 */

function summarize(data) {
  if (Array.isArray(data) && data.length > 10) {
    return { total: data.length, items: data.slice(0, 10), truncated: true };
  }
  return data;
}

export async function dispatch(actionMap, actionName, args, domotzApi) {
  const action = actionMap[actionName];
  if (!action) {
    throw new Error(`Unknown action: ${actionName}`);
  }

  // Build URL by replacing {param} placeholders with args values
  let url = action.url.replace(/\{(\w+)\}/g, (_, key) => {
    if (args[key] === undefined) throw new Error(`Missing required parameter: ${key}`);
    return encodeURIComponent(args[key]);
  });

  // Extract query params from args
  const params = {};
  if (action.queryParams) {
    for (const qp of action.queryParams) {
      if (args[qp] !== undefined) params[qp] = args[qp];
    }
  }

  const method = action.method.toLowerCase();

  let response;
  if (method === 'head') {
    response = await domotzApi.head(url, { params });
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) })
      }]
    };
  } else if (method === 'get') {
    response = await domotzApi.get(url, { params });
  } else if (method === 'post') {
    response = await domotzApi.post(url, action.hasBody ? (args.body || {}) : undefined, { params });
  } else if (method === 'put') {
    response = await domotzApi.put(url, action.hasBody ? (args.body || {}) : undefined, { params });
  } else if (method === 'delete') {
    response = await domotzApi.delete(url, { params });
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ success: true, status: response.status })
      }]
    };
  }

  const result = response.data || { success: true, status: response.status };
  return {
    content: [{
      type: 'text',
      text: JSON.stringify(summarize(result))
    }]
  };
}
