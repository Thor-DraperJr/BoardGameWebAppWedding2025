# Game State API

This API handles the shared game state for the wedding board games app using Azure Functions.

## 🚀 Overview

The API provides real-time game state synchronization across all users at the wedding reception. It uses in-memory storage for simplicity (in production, consider Azure Cosmos DB or Azure Tables for persistence).

## 📋 API Endpoints

### GET /api/games
Get all current game states.

**Response:**
```json
[
  {
    "id": "game-1",
    "isBeingPlayed": false,
    "lastUpdated": "2025-06-23T10:30:00Z",
    "updatedBy": "Guest123"
  }
]
```

### POST /api/games/{gameId}
Update a specific game's status.

**Request Body:**
```json
{
  "isBeingPlayed": true,
  "updatedBy": "Guest123"
}
```

**Response:**
```json
{
  "id": "game-1",
  "isBeingPlayed": true,
  "lastUpdated": "2025-06-23T10:30:00Z",
  "updatedBy": "Guest123"
}
```

### POST /api/games/reset
Reset all games to available status (admin function).

**Response:**
```json
{
  "message": "All games reset successfully",
  "resetCount": 5,
  "timestamp": "2025-06-23T10:30:00Z"
}
```

## 🔧 Technical Implementation

### Azure Functions Setup

The API uses Azure Functions v4 with Node.js runtime:

- **Runtime**: Node.js 18
- **Function App Version**: ~4
- **Language**: TypeScript
- **Trigger**: HTTP
- **Authorization**: Anonymous (suitable for wedding reception)

### CORS Configuration

All endpoints include proper CORS headers:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With`

### Error Handling

Comprehensive error handling with:
- HTTP status codes (200, 400, 500)
- Structured error responses
- Request validation
- Detailed logging for debugging

## 🏗️ Project Structure

```
api/
├── src/
│   ├── functions/
│   │   ├── gameState.ts        # Main game state functions
│   │   └── games.js            # Legacy JS function (backup)
│   └── utils/
│       └── cors.ts             # CORS utility functions
├── host.json                   # Azure Functions host config
├── package.json                # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🔨 Development

### Local Development

```bash
# Install dependencies
cd api && npm install

# Build TypeScript
npm run build

# Start Functions locally
npm run start

# API will be available at http://localhost:7071/api
```

### Build Scripts

- `npm run build` - Compile TypeScript
- `npm run start` - Start local development server
- `npm run clean` - Remove build artifacts

## 🚀 Deployment

### Azure Static Web Apps Integration

The API is automatically deployed with the Static Web App:

- **Build Process**: TypeScript compiled during deployment
- **Runtime**: Azure Functions consumption plan
- **Configuration**: Managed by Azure Static Web Apps
- **Scaling**: Automatic based on demand

### Environment Variables

Set in Azure Static Web Apps configuration:

```bash
# Optional: Application Insights
APPINSIGHTS_INSTRUMENTATIONKEY=your-key
APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string
```

## 🔍 Monitoring and Logging

### Application Insights

Configure Application Insights for:
- Request tracking
- Error monitoring
- Performance metrics
- Custom telemetry

### Log Statements

Functions include comprehensive logging:
```typescript
context.log('Getting all game states');
context.log(`Updated game ${gameId} to ${isBeingPlayed ? 'playing' : 'available'}`);
context.log('Error updating game status:', error);
```

## 🛡️ Security Considerations

### Production Recommendations

1. **Authentication**: Consider adding authentication for production use
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate all incoming requests
4. **HTTPS Only**: Ensure all communication is over HTTPS
5. **CORS Policy**: Restrict origins in production environment

### Current Security Features

- Input validation for game IDs and status
- Structured error responses (no sensitive data leakage)
- CORS headers properly configured
- TypeScript for type safety

## 📊 Data Schema

### GameState Interface

```typescript
interface GameState {
  id: string;              // Unique game identifier
  isBeingPlayed: boolean;  // Current playing status
  lastUpdated: string;     // ISO timestamp
  updatedBy: string;       // User identifier
}
```

## 🧪 Testing

### Manual Testing

Use tools like Postman or curl:

```bash
# Get all games
curl https://your-app.azurestaticapps.net/api/games

# Update game status
curl -X POST https://your-app.azurestaticapps.net/api/games/game-1 \
  -H "Content-Type: application/json" \
  -d '{"isBeingPlayed": true, "updatedBy": "TestUser"}'

# Reset all games
curl -X POST https://your-app.azurestaticapps.net/api/games/reset
```

### Frontend Integration

The frontend service (`gameStateService.ts`) handles:
- Automatic environment detection (local vs production)
- Error handling and fallback to local state
- Real-time polling for updates
- Optimistic UI updates

## 🔮 Future Enhancements

### Persistence Options

For production weddings with multiple sessions:

1. **Azure Cosmos DB**: NoSQL database for global distribution
2. **Azure Table Storage**: Simple key-value storage
3. **Azure SQL**: Relational database option

### Advanced Features

- User authentication and session management
- Game reservation system with time limits
- Real-time notifications using SignalR
- Analytics and usage tracking
