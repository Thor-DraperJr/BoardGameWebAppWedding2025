# Game State API

This API will handle the shared game state for the wedding board games app.

## Azure Functions Setup

The following Azure Functions handle the game state synchronization:

1. **GetGames** (GET) - Returns current game states
2. **UpdateGameStatus** (POST) - Updates a game's playing status
3. **ResetAllGames** (POST) - Resets all games to available (admin only)

## Database Schema

Using Azure Tables/Cosmos DB to store game states:

```json
{
  "id": "game-id",
  "isBeingPlayed": false,
  "lastUpdated": "2025-06-23T10:30:00Z",
  "updatedBy": "user-session-id"
}
```
