/**
 * Application constants following SCREAMING_SNAKE_CASE convention
 * for the Wedding Board Games application
 */

// API Configuration
export const API_BASE_URL_LOCAL = 'http://localhost:7071/api';
export const API_BASE_URL_PRODUCTION = '/api';

// Polling Configuration
export const POLLING_INTERVAL_MS = 5000; // 5 seconds
export const RETRY_DELAY_MS = 3000; // 3 seconds

// Game Status
export const GAME_STATUS_AVAILABLE = 'Available';
export const GAME_STATUS_PLAYING = 'Playing';

// Difficulty Levels
export const DIFFICULTY_EASY = 'Easy';
export const DIFFICULTY_MEDIUM = 'Medium';
export const DIFFICULTY_HARD = 'Hard';

// Filter Types
export const FILTER_ALL = 'all';
export const FILTER_AVAILABLE = 'available';
export const FILTER_PLAYING = 'playing';

// CSS Classes (following BEM convention)
export const CSS_CLASSES = {
  APP: 'app',
  GAME_CARD: 'game-card',
  GAME_CARD_PLAYING: 'game-card--playing',
  GAME_CARD_AVAILABLE: 'game-card--available',
  FILTER_NAV: 'filter-nav',
  FILTER_BUTTON_ACTIVE: 'filter-nav__button--active',
  STATUS_INDICATOR: 'status-indicator',
  CONNECTION_STATUS_ONLINE: 'connection-status--online',
  CONNECTION_STATUS_OFFLINE: 'connection-status--offline',
} as const;

// User Messages
export const MESSAGES = {
  NO_GAMES_FOUND: 'No games match the current filter.',
  CONNECTION_ONLINE: '● Connected - Real-time updates',
  CONNECTION_OFFLINE: '● Offline - Local changes only',
  LOADING: 'Loading games...',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
} as const;
