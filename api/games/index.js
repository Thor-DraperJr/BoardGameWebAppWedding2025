// Shared game states for all 20 wedding games
// gameId -> { isPlaying: boolean, startedAt: timestamp, gameTitle: string }
let allGameStates = {};

module.exports = async function (context, req) {
  context.log('Games API - Method:', req.method);
  
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

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    // GET - Return all game states
    if (req.method === 'GET') {
      context.log(`Returning states for ${Object.keys(allGameStates).length} games`);
      
      context.res = {
        status: 200,
        headers: corsHeaders,
        body: allGameStates
      };
      return;
    }

    // POST - Update a specific game state
    if (req.method === 'POST') {
      const { gameId, isPlaying, gameTitle } = req.body || {};
      
      if (!gameId) {
        context.res = {
          status: 400,
          headers: corsHeaders,
          body: { error: 'gameId is required' }
        };
        return;
      }

      const now = new Date().toISOString();

      if (isPlaying) {
        // Start playing this game
        allGameStates[gameId] = {
          isPlaying: true,
          startedAt: now,
          gameTitle: gameTitle || `Game ${gameId}`,
          lastUpdated: now
        };
        context.log(`Started game: ${gameTitle || gameId}`);
      } else {
        // Stop playing this game
        if (allGameStates[gameId]) {
          delete allGameStates[gameId];
        }
        context.log(`Stopped game: ${gameTitle || gameId}`);
      }

      context.res = {
        status: 200,
        headers: corsHeaders,
        body: allGameStates
      };
      return;
    }

    // Method not allowed
    context.res = {
      status: 405,
      headers: corsHeaders,
      body: { error: 'Method not allowed' }
    };
    
  } catch (error) {
    context.log.error('Games API error:', error);
    
    context.res = {
      status: 500,
      headers: corsHeaders,
      body: { error: 'Internal server error' }
    };
  }
};
