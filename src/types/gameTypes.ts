/**
 * Type definitions for the Wedding Board Games application
 * Following naming convention: gameTypes.ts for domain-specific types
 */

// Main game interface used throughout the application
export interface Game {
  id: string;
  title: string;
  type: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  howToPlayUrl?: string;
  isBeingPlayed: boolean;
}

// Game state interface for API communication
export interface GameState {
  id: string;
  isBeingPlayed: boolean;
  lastUpdated: string;
  updatedBy: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Filter options for game display
export type GameFilter = 'all' | 'available' | 'playing';

// Props interfaces following [ComponentName]Props convention
export interface GameCardProps {
  game: Game;
  onToggleStatus: (gameId: string) => void;
}

export interface FilterNavProps {
  currentFilter: GameFilter;
  onFilterChange: (filter: GameFilter) => void;
  availableCount: number;
  playingCount: number;
  totalCount: number;
}

export interface AdminPanelProps {
  games: Game[];
  onToggleStatus: (gameId: string) => void;
  onResetAllGames: () => void;
  isOnline: boolean;
}
