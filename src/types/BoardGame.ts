// Types for board game data
export interface BoardGame {
  id: string;
  title: string;
  gameType: string;
  playerCount: string;
  instructionsUrl?: string;
  isBeingPlayed?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  duration?: string;
}
