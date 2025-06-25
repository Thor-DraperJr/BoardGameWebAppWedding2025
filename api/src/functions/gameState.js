const { app } = require('@azure/functions');

// GLOBAL state that persists across function calls within the same container
let gameState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

// GET /api/status - Get current game state
app.http('status', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('🔍 GET /api/status - Fetching current game state');
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { 
        status: 200, 
        headers: corsHeaders
      };
    }

    // Return current state
    context.log(`📊 Current state: isActive=${gameState.isActive}, clicks=${gameState.clickCount}`);
    
    return {
      status: 200,
      headers: corsHeaders,
      body: JSON.stringify(gameState)
    };
  }
});

// POST /api/toggle - Toggle game state
app.http('toggle', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('🔄 POST /api/toggle - Toggling game state');
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { 
        status: 200, 
        headers: corsHeaders
      };
    }

    try {
      // Parse request body
      const body = await request.text();
      context.log(`📨 Request body: ${body}`);
      
      let requestData = {};
      if (body) {
        requestData = JSON.parse(body);
      }

      // Update global state
      const newActiveState = requestData.isActive !== undefined 
        ? requestData.isActive 
        : !gameState.isActive;

      const previousState = gameState.isActive;
      
      gameState = {
        isActive: newActiveState,
        lastUpdated: new Date().toISOString(),
        clickCount: gameState.clickCount + 1
      };

      context.log(`✅ State updated: ${previousState} → ${newActiveState} (click #${gameState.clickCount})`);

      return {
        status: 200,
        headers: corsHeaders,
        body: JSON.stringify(gameState)
      };

    } catch (error) {
      context.log(`❌ Error toggling state: ${error.message}`);
      
      return {
        status: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Failed to toggle game state',
          message: error.message 
        })
      };
    }
  }
});

// POST /api/reset - Reset game state (for testing)
app.http('reset', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('🔄 POST /api/reset - Resetting game state');
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return { 
        status: 200, 
        headers: corsHeaders
      };
    }

    // Reset to initial state
    gameState = {
      isActive: false,
      lastUpdated: new Date().toISOString(),
      clickCount: 0
    };

    context.log(`🆕 State reset: ${JSON.stringify(gameState)}`);

    return {
      status: 200,
      headers: corsHeaders,
      body: JSON.stringify(gameState)
    };
  }
});
