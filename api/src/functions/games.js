const { app } = require('@azure/functions');

app.http('games', {
    methods: ['GET', 'POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');
        
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        };

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            return {
                status: 200,
                headers: corsHeaders
            };
        }

        // In-memory storage for demo (in production, use Cosmos DB or Azure Tables)
        const gameStates = new Map();

        if (request.method === 'GET') {
            // Get all game states
            const states = Array.from(gameStates.values());
            return {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    ...corsHeaders
                },
                body: JSON.stringify(states)
            };
        }

        if (request.method === 'POST') {
            try {
                const { gameId, isBeingPlayed, updatedBy } = await request.json();
                
                const gameState = {
                    id: gameId,
                    isBeingPlayed: isBeingPlayed,
                    lastUpdated: new Date().toISOString(),
                    updatedBy: updatedBy || 'anonymous'
                };

                gameStates.set(gameId, gameState);
                
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    },
                    body: JSON.stringify(gameState)
                };
            } catch (error) {
                context.log('Error updating game status:', error);
                return {
                    status: 500,
                    headers: corsHeaders,
                    body: JSON.stringify({ error: 'Internal server error' })
                };
            }
        }

        return {
            status: 405,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
});
