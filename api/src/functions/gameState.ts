import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

interface GameState {
  id: string;
  isBeingPlayed: boolean;
  lastUpdated: string;
  updatedBy: string;
}

// In-memory storage for demo (in production, use Cosmos DB or Azure Tables)
const gameStates = new Map<string, GameState>();

export async function getGames(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Getting all game states');
  
  try {
    const states = Array.from(gameStates.values());
    
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(states)
    };
  } catch (error) {
    context.log('Error getting games:', error);
    return {
      status: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

export async function updateGameStatus(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Updating game status');
  
  try {
    if (request.method === 'OPTIONS') {
      return {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      };
    }

    const body = await request.text();
    const { gameId, isBeingPlayed, updatedBy } = JSON.parse(body);
    
    if (!gameId) {
      return {
        status: 400,
        body: JSON.stringify({ error: 'Game ID is required' })
      };
    }

    const gameState: GameState = {
      id: gameId,
      isBeingPlayed: Boolean(isBeingPlayed),
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || 'anonymous'
    };

    gameStates.set(gameId, gameState);
    
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(gameState)
    };
  } catch (error) {
    context.log('Error updating game status:', error);
    return {
      status: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

export async function resetAllGames(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Resetting all games');
  
  try {
    if (request.method === 'OPTIONS') {
      return {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      };
    }

    gameStates.clear();
    
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({ message: 'All games reset successfully' })
    };
  } catch (error) {
    context.log('Error resetting games:', error);
    return {
      status: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}

app.http('getGames', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'games',
  handler: getGames
});

app.http('updateGameStatus', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'games/{gameId}',
  handler: updateGameStatus
});

app.http('resetAllGames', {
  methods: ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'games/reset',
  handler: resetAllGames
});
