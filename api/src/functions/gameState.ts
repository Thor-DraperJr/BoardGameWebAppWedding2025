import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { createCorsResponse, createJsonResponse, createErrorResponse } from '../utils/cors';

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
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return createCorsResponse();
    }

    const states = Array.from(gameStates.values());
    context.log(`Returning ${states.length} game states`);
    
    return createJsonResponse(states);
  } catch (error) {
    context.log('Error getting games:', error);
    return createErrorResponse('Failed to retrieve game states');
  }
}

export async function updateGameStatus(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Updating game status');
  
  try {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return createCorsResponse();
    }

    // Get gameId from URL path parameters
    const gameId = request.params.gameId;
    if (!gameId) {
      return createErrorResponse('Game ID is required in URL path', 400);
    }

    const body = await request.text();
    if (!body) {
      return createErrorResponse('Request body is required', 400);
    }

    const { isBeingPlayed, updatedBy } = JSON.parse(body);
    
    if (typeof isBeingPlayed !== 'boolean') {
      return createErrorResponse('isBeingPlayed must be a boolean value', 400);
    }

    const gameState: GameState = {
      id: gameId,
      isBeingPlayed: Boolean(isBeingPlayed),
      lastUpdated: new Date().toISOString(),
      updatedBy: updatedBy || 'anonymous'
    };

    gameStates.set(gameId, gameState);
    context.log(`Updated game ${gameId} to ${isBeingPlayed ? 'playing' : 'available'}`);
    
    return createJsonResponse(gameState);
  } catch (error) {
    context.log('Error updating game status:', error);
    if (error instanceof SyntaxError) {
      return createErrorResponse('Invalid JSON in request body', 400);
    }
    return createErrorResponse('Failed to update game status');
  }
}

export async function resetAllGames(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log('Resetting all games');
  
  try {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return createCorsResponse();
    }

    const previousCount = gameStates.size;
    gameStates.clear();
    
    context.log(`Reset ${previousCount} game states`);
    
    return createJsonResponse({ 
      message: 'All games reset successfully',
      resetCount: previousCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    context.log('Error resetting games:', error);
    return createErrorResponse('Failed to reset games');
  }
}

// Function app registrations
app.http('getGames', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'games',
  handler: getGames
});

app.http('updateGameStatus', {
  methods: ['POST', 'PUT', 'OPTIONS'],
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
