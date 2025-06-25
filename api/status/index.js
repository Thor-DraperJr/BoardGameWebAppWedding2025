// Global variable for shared state (persists in function app container)
let globalGameState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

module.exports = async function (context, req) {
  context.log('GET /api/status - Fetching current state');
  
  // Handle CORS
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
  
  context.log(`Current state: ${JSON.stringify(globalGameState)}`);
};
