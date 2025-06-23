import { useState } from 'react';
import GameCard from './components/GameCard';
import GameFilter from './components/GameFilter';
import AdminPanel from './components/AdminPanel';
import { GameProvider, useGames } from './context/GameContext';
import './App.css';

function GameList() {
  const { games, getAvailableGames, getGamesInProgress } = useGames();
  const [activeFilter, setActiveFilter] = useState<'all' | 'available' | 'playing'>('all');

  const getFilteredGames = () => {
    switch (activeFilter) {
      case 'available':
        return getAvailableGames();
      case 'playing':
        return getGamesInProgress();
      default:
        return games;
    }
  };

  const filteredGames = getFilteredGames();
  const counts = {
    all: games.length,
    available: getAvailableGames().length,
    playing: getGamesInProgress().length
  };

  return (
    <>
      <GameFilter 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />
      
      <div className="games-grid">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      
      {filteredGames.length === 0 && (
        <div className="no-games">
          {activeFilter === 'playing' ? (
            <div className="no-games-message">
              <span className="no-games-emoji">🎯</span>
              <h3>No games currently being played!</h3>
              <p>Why not start a game? Click "Start Playing" on any available game.</p>
            </div>
          ) : (
            <div className="no-games-message">
              <span className="no-games-emoji">🎲</span>
              <h3>No games in this category</h3>
              <p>Try switching to a different filter above.</p>
            </div>
          )}
        </div>
      )}
      
      <AdminPanel />
    </>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">🎲 Wedding Reception Board Games 🎯</h1>
            <p className="app-subtitle">
              Welcome to our wedding celebration! Here are the board games available for you to enjoy during the reception. 
              Click "Start Playing" to let others know a game is in use!
            </p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <GameList />
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>Have fun playing! Remember to mark games as available when you're done. 💕</p>
          </div>
        </footer>
      </div>
    </GameProvider>
  );
}

export default App;
