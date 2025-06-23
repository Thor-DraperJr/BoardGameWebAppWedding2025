import { BoardGame } from '../types/BoardGame';
import gamesData from './games.json';

// Convert JSON data to BoardGame objects with playing status
export const boardGames: BoardGame[] = gamesData.map(game => ({
  id: game.id,
  title: game.title,
  gameType: game.gameType,
  playerCount: game.playerCount,
  difficulty: game.difficulty as 'Easy' | 'Medium' | 'Hard',
  duration: game.duration,
  instructionsUrl: game.instructionsUrl,
  isBeingPlayed: false // Always start with all games available
}));
