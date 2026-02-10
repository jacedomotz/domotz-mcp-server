/**
 * Generic action dispatcher for category-based tools.
 * Replaces the 1000-line switch statement with data-driven routing.
 */

const SUMMARY_LIMIT = parseInt(process.env.DOMOTZ_SUMMARY_LIMIT || '50', 10);

function summarize(data) {
  if (Array.isArray(data) && data.length > SUMMARY_LIMIT) {
    return {
      total: data.length,
      showing: SUMMARY_LIMIT,
      items: data.slice(0, SUMMARY_LIMIT),
      truncated: true,
      hint: `Showing first ${SUMMARY_LIMIT} of ${data.length} items. Use page_size/page_number to paginate, or filter parameters to narrow results.`
    };
  }
  return data;
}

/**
 * Auto-paginate a GET endpoint that supports page_size/page_number.
 * Fetches all pages and returns the combined result array.
 */
async function fetchAllPages(domotzApi, url, params, pageSize = 500) {
  const allItems = [];
  let page = 0;

  while (true) {
    const pageParams = { ...params, page_size: pageSize, page_number: page };
    const response = await domotzApi.get(url, { params: pageParams });
    const data = response.data;

    if (!Array.isArray(data) || data.length === 0) {
      break;
    }

    allItems.push(...data);

    // If we got fewer items than page_size, we've reached the last page
    if (data.length < pageSize) {
      break;
    }

    page++;
  }

  return allItems;
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
    // Auto-paginate if the endpoint supports pagination and caller didn't specify page params
    const supportsPagination = action.queryParams &&
      action.queryParams.includes('page_size') &&
      action.queryParams.includes('page_number');
    const callerPaginated = args.page_size !== undefined || args.page_number !== undefined;

    if (supportsPagination && !callerPaginated) {
      const allData = await fetchAllPages(domotzApi, url, params);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(summarize(allData))
        }]
      };
    }

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
