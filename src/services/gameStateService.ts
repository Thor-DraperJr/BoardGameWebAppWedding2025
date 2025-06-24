import { Game, GameState } from '../types/gameTypes';
import { API_BASE_URL_LOCAL, API_BASE_URL_PRODUCTION, POLLING_INTERVAL_MS } from '../constants';

/**
 * Service for managing shared game state with Azure Functions API
 * Follows naming convention: [name]Service.ts
 */
class GameStateService {
  private baseUrl: string;
  private readonly POLL_INTERVAL = POLLING_INTERVAL_MS;
  private pollTimeoutId: number | null = null;

  constructor() {
    // Use centralized constants for API URLs
    this.baseUrl = window.location.hostname === 'localhost' 
      ? API_BASE_URL_LOCAL 
      : API_BASE_URL_PRODUCTION;
  }
  async getGameStates(): Promise<GameState[]> {
    try {
      const response = await fetch(`${this.baseUrl}/games`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn(`API not available (status: ${response.status}), using local state only`);
        return []; // Return empty array when API is not available
      }

      return await response.json();    } catch (error) {
      console.warn('API not available, using local state only:', error instanceof Error ? error.message : 'Unknown error');
      return []; // Return empty array on error, app will use local state
    }
  }
  async updateGameStatus(gameId: string, isBeingPlayed: boolean, updatedBy: string = 'Guest'): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/games/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId,
          isBeingPlayed,
          updatedBy
        }),
      });

      if (!response.ok) {
        console.warn(`API update failed (status: ${response.status}), using local state only`);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('API update failed, using local state only:', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  async resetAllGames(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/games/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn(`API reset failed (status: ${response.status}), using local state only`);
        return false;
      }

      return true;
    } catch (error) {
      console.warn('API reset failed, using local state only:', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  // Start polling for updates
  startPolling(onUpdate: (gameStates: GameState[]) => void) {
    this.stopPolling(); // Clear any existing polling

    const poll = async () => {
      const gameStates = await this.getGameStates();
      onUpdate(gameStates);
        // Schedule next poll
      this.pollTimeoutId = window.setTimeout(poll, this.POLL_INTERVAL);
    };

    // Start polling immediately
    poll();
  }

  // Stop polling
  stopPolling() {
    if (this.pollTimeoutId) {
      clearTimeout(this.pollTimeoutId);
      this.pollTimeoutId = null;
    }
  }

  // Utility function to merge API states with local game data
  mergeGameStates(games: Game[], apiStates: GameState[]): Game[] {
    const stateMap = new Map(apiStates.map(state => [state.id, state]));
    
    return games.map(game => ({
      ...game,
      isBeingPlayed: stateMap.get(game.id)?.isBeingPlayed ?? false
    }));
  }
}

export const gameStateService = new GameStateService();
