/**
 * Utility functions for the Wedding Board Games application
 * Following naming convention: [domain]Utils.ts
 */

import { Game, GameFilter } from './types/gameTypes';

/**
 * Filters games based on the provided filter type
 * @param games - Array of games to filter
 * @param filter - Filter type to apply
 * @returns Filtered array of games
 */
export const filterGames = (games: Game[], filter: GameFilter): Game[] => {
  switch (filter) {
    case 'available':
      return games.filter(game => !game.isBeingPlayed);
    case 'playing':
      return games.filter(game => game.isBeingPlayed);
    case 'all':
    default:
      return games;
  }
};

/**
 * Counts games by status
 * @param games - Array of games to count
 * @returns Object with counts for available and playing games
 */
export const getGameCounts = (games: Game[]) => {
  const availableCount = games.filter(game => !game.isBeingPlayed).length;
  const playingCount = games.filter(game => game.isBeingPlayed).length;
  
  return {
    available: availableCount,
    playing: playingCount,
    total: games.length,
  };
};

/**
 * Validates if a game ID exists in the games array
 * @param gameId - ID to validate
 * @param games - Array of games to search
 * @returns True if game exists, false otherwise
 */
export const isValidGameId = (gameId: string, games: Game[]): boolean => {
  return games.some(game => game.id === gameId);
};

/**
 * Formats duration string for display
 * @param duration - Duration string (e.g., "30-45 min")
 * @returns Formatted duration string
 */
export const formatDuration = (duration: string): string => {
  // Add any formatting logic here if needed
  return duration;
};

/**
 * Generates a display name for game difficulty with appropriate styling class
 * @param difficulty - Game difficulty level
 * @returns CSS class name for styling
 */
export const getDifficultyClassName = (difficulty: string): string => {
  return `difficulty--${difficulty.toLowerCase()}`;
};

/**
 * Creates a URL-safe slug from a game title
 * @param title - Game title
 * @returns URL-safe slug
 */
export const createGameSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
