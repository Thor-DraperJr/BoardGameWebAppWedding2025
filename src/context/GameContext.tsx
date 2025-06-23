import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BoardGame } from '../types/BoardGame';
import { boardGames as initialGames } from '../data/games';

interface GameContextType {
  games: BoardGame[];
  togglePlayingStatus: (gameId: string) => void;
  getAvailableGames: () => BoardGame[];
  getGamesInProgress: () => BoardGame[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGames = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<BoardGame[]>(initialGames);

  const togglePlayingStatus = (gameId: string) => {
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === gameId
          ? { ...game, isBeingPlayed: !game.isBeingPlayed }
          : game
      )
    );
  };

  const getAvailableGames = () => games.filter(game => !game.isBeingPlayed);
  const getGamesInProgress = () => games.filter(game => game.isBeingPlayed);

  return (
    <GameContext.Provider value={{
      games,
      togglePlayingStatus,
      getAvailableGames,
      getGamesInProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};
