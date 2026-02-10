export const tool = {
  name: 'domotz_account',
  description: `Account information, API usage, areas, and teams. Use the "action" parameter to select an operation.

ACTION REFERENCE:
- get_user: Get current authenticated user info (no parameters needed)
- api_usage: Get API usage statistics (no parameters needed)
- list_areas: List all areas in the account (no parameters needed)
- list_teams: List teams in an area (needs area_id)
- create_team: Create a team in an area (needs area_id + body)

EXAMPLES:
- Who am I: {"action": "get_user"}
- API usage: {"action": "api_usage"}
- List areas: {"action": "list_areas"}`,
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['get_user', 'api_usage', 'list_areas', 'list_teams', 'create_team'],
        description: 'The operation to perform'
      },
      area_id: { type: 'integer', description: 'Area ID' },
      body: { type: 'object', description: 'Request body (JSON object)' }
    },
    required: ['action']
  }
};

export const actions = {
  get_user:    { method: 'GET',  url: '/user' },
  api_usage:   { method: 'GET',  url: '/meta/usage' },
  list_areas:  { method: 'GET',  url: '/area' },
  list_teams:  { method: 'GET',  url: '/area/{area_id}/team' },
  create_team: { method: 'POST', url: '/area/{area_id}/team', hasBody: true },
};
