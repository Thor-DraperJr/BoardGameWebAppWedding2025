const { app } = require('@azure/functions');

app.http('reset', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'games/reset',
    handler: async (request, context) => {
        context.log('Reset all games function processed a request.');
        
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

        if (request.method === 'POST') {
            try {
                // In production, this would clear the database
                // For now, just return success
                return {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    },
                    body: JSON.stringify({ success: true, message: 'All games reset successfully' })
                };
            } catch (error) {
                context.log('Error resetting games:', error);
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
