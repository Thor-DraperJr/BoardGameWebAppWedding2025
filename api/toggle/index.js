// Global variable for shared state (persists in function app container)
let globalGameState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

module.exports = async function (context, req) {
  context.log('POST /api/toggle - Toggling game state');
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: ''
    };
    return;
  }

  try {
    // Parse request body
    const requestBody = req.body || {};
    const newActiveState = requestBody.isActive;

    if (typeof newActiveState === 'boolean') {
      // Update global state
      globalGameState.isActive = newActiveState;
      globalGameState.lastUpdated = new Date().toISOString();
      globalGameState.clickCount = (globalGameState.clickCount || 0) + 1;
      
      context.log(`State updated: isActive=${globalGameState.isActive}, clicks=${globalGameState.clickCount}`);
    }

    context.res = {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      },
      body: globalGameState
    };
    
  } catch (error) {
    context.log.error('Toggle error:', error);
    
    context.res = {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: { error: 'Internal server error' }
    };
  }
};
