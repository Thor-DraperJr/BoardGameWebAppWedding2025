import { useState, useEffect } from 'react';
import './App.css';
import { gameStateService } from './services/gameStateService';
import { Game, GameFilter as GameFilterType } from './types/gameTypes';
import GameCard from './components/GameCard';
import GameFilter from './components/GameFilter';
import AdminPanel from './components/AdminPanel';

// Initial games data
const initialGames: Game[] = [
  {
    id: '1',
    title: 'Wavelength',
    type: 'Party/Team',
    players: '2-12 players',
    difficulty: 'Medium',
    duration: '30-45 min',
    howToPlayUrl: 'https://www.youtube.com/watch?v=8r9JX_CL6b8',
    isBeingPlayed: false
  },
  {
    id: '2',
    title: 'Codenames',
    type: 'Party/Word',
    players: '2-8 players',
    difficulty: 'Easy',
    duration: '15-30 min',
    howToPlayUrl: 'https://www.youtube.com/watch?v=zQVHkl8oQEU',
    isBeingPlayed: false
  },
  {
    id: '3',
    title: 'Azul',
    type: 'Strategy',
    players: '2-4 players',
    difficulty: 'Medium',
    duration: '30-45 min',
    howToPlayUrl: 'https://www.youtube.com/watch?v=csJNkl8UizY',
    isBeingPlayed: false
  },
  {
    id: '4',
    title: 'Splendor',
    type: 'Strategy',
    players: '2-4 players',
    difficulty: 'Medium',
    duration: '30 min',
    howToPlayUrl: 'https://www.youtube.com/watch?v=u4ZTh7nuVFo',
    isBeingPlayed: false
  },
  {
    id: '5',
    title: 'Just One',
    type: 'Party/Word',
    players: '3-8 players',
    difficulty: 'Easy',
    duration: '20 min',
    howToPlayUrl: 'https://www.youtube.com/watch?v=ckqjz4mCg8Y',
    isBeingPlayed: false
  }
];

function App() {  const [games, setGames] = useState<Game[]>(initialGames);
  const [filter, setFilter] = useState<GameFilterType>('all');
  const [isOnline, setIsOnline] = useState(true);

  // Initialize shared state and start polling
  useEffect(() => {
    // Start polling for updates from other users
    gameStateService.startPolling((gameStates) => {
      setGames(prevGames => gameStateService.mergeGameStates(prevGames, gameStates));
    });

    // Cleanup polling on unmount
    return () => {
      gameStateService.stopPolling();
    };
  }, []);

  const toggleGameStatus = async (gameId: string) => {
    // Optimistically update UI first
    const currentGame = games.find(game => game.id === gameId);
    if (!currentGame) return;

    const newStatus = !currentGame.isBeingPlayed;
    
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === gameId
          ? { ...game, isBeingPlayed: newStatus }
          : game
      )
    );

    // Try to update shared state
    const success = await gameStateService.updateGameStatus(gameId, newStatus);
    
    if (!success) {
      // Revert optimistic update if API call failed
      setGames(prevGames =>
        prevGames.map(game =>
          game.id === gameId
            ? { ...game, isBeingPlayed: !newStatus }
            : game
        )
      );
      setIsOnline(false);
      // Auto-retry after 3 seconds
      setTimeout(() => setIsOnline(true), 3000);
    } else {
      setIsOnline(true);
    }
  };

  const resetAllGames = async () => {
    // Optimistically reset UI
    setGames(prevGames =>
      prevGames.map(game => ({ ...game, isBeingPlayed: false }))
    );

    // Try to reset shared state
    const success = await gameStateService.resetAllGames();
    
    if (!success) {
      setIsOnline(false);
      setTimeout(() => setIsOnline(true), 3000);
    } else {
      setIsOnline(true);
    }
  };

  const getFilteredGames = () => {
    switch (filter) {
      case 'available':
        return games.filter(game => !game.isBeingPlayed);
      case 'playing':
        return games.filter(game => game.isBeingPlayed);
      default:
        return games;
    }
  };
  const filteredGames = getFilteredGames();
  const availableCount = games.filter(game => !game.isBeingPlayed).length;
  const playingCount = games.filter(game => game.isBeingPlayed).length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎲 Wedding Board Games</h1>
        <p>Choose a game to play at the reception!</p>
        <div className="status-indicator">
          <span className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢 Live Updates' : '🔴 Offline Mode'}
          </span>
        </div>
      </header>

      {/* Filter Component */}
      <GameFilter 
        currentFilter={filter}
        onFilterChange={setFilter}
        availableCount={availableCount}
        playingCount={playingCount}
        totalCount={games.length}
      />

      {/* Games Grid */}
      <div className="games-grid">
        {filteredGames.map((game) => (
          <GameCard 
            key={game.id}
            game={game}
            onToggleStatus={toggleGameStatus}
          />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="no-games">
          <div className="no-games-message">
            <span className="no-games-emoji">🎯</span>
            <h3>
              {filter === 'playing'
                ? 'No games currently being played!'
                : filter === 'available'
                ? 'No games available right now!'
                : 'No games found!'
              }
            </h3>
            <p>
              {filter === 'playing'
                ? 'Why not start a game? Click "Start Playing" on any available game.'
                : filter === 'available'
                ? 'All games are currently being played! Check back soon.'
                : 'Something went wrong. Please refresh the page.'
              }
            </p>
          </div>
        </div>
      )}

      {/* Admin Panel Component */}
      <AdminPanel 
        games={games}
        onToggleStatus={toggleGameStatus}
        onResetAllGames={resetAllGames}
        isOnline={isOnline}
      />
    </div>
  );
}

export default App;
