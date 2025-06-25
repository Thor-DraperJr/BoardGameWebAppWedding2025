const { app } = require('@azure/functions');

// GLOBAL variable that persists across function calls in the same container
let globalGameState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

// CORS headers for all responses
const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
});

// GET /api/status - Get current game state
app.http('status', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('GET /api/status - Fetching current state');
    
    const corsHeaders = getCorsHeaders();

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { 
        status: 200, 
        headers: corsHeaders,
        body: ''
      };
    }

    // Return current state
    context.log(`Current state: ${JSON.stringify(globalGameState)}`);
    
    return {
      status: 200,
      headers: corsHeaders,
      body: JSON.stringify(globalGameState)
    };
  }
});

// POST /api/toggle - Toggle game state
app.http('toggle', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('POST /api/toggle - Toggling game state');
    
    const corsHeaders = getCorsHeaders();

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { 
        status: 200, 
        headers: corsHeaders,
        body: ''
      };
    }

    try {
      // Parse request body
      const body = await request.text();
      context.log(`Request body: ${body}`);
      
      let requestData = {};
      if (body) {
        requestData = JSON.parse(body);
      }

      // Update global state
      const newActiveState = requestData.isActive !== undefined 
        ? requestData.isActive 
        : !globalGameState.isActive;

      globalGameState = {
        isActive: newActiveState,
        lastUpdated: new Date().toISOString(),
        clickCount: globalGameState.clickCount + 1
      };

      context.log(`Updated state: ${JSON.stringify(globalGameState)}`);

      return {
        status: 200,
        headers: corsHeaders,
        body: JSON.stringify(globalGameState)
      };

    } catch (error) {
      context.log(`Error toggling state: ${error.message}`);
      
      return {
        status: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Failed to toggle state',
          message: error.message 
        })
      };
    }
  }
});
