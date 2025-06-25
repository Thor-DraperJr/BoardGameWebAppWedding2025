const sharedState = require('../shared/gameState');

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

    let updatedState;
    if (typeof newActiveState === 'boolean') {
      // Update shared state with specific value
      updatedState = sharedState.setState({ isActive: newActiveState });
      updatedState.clickCount = (updatedState.clickCount || 0) + 1;
      context.log(`State updated: isActive=${updatedState.isActive}, clicks=${updatedState.clickCount}`);
    } else {
      // Toggle state
      updatedState = sharedState.toggleActive();
      context.log(`State toggled: isActive=${updatedState.isActive}, clicks=${updatedState.clickCount}`);
    }

    context.res = {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      },
      body: updatedState
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
