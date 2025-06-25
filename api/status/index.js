const sharedState = require('../shared/gameState');

module.exports = async function (context, req) {
  context.log('GET /api/status - Fetching current state');
  
  // Get current shared state
  const currentState = sharedState.getState();
  
  // Handle CORS
  context.res = {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json'
    },
    body: currentState
  };
  
  context.log(`Current state: ${JSON.stringify(currentState)}`);
};
