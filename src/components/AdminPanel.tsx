import React, { useState } from 'react';
import { AdminPanelProps } from '../types/gameTypes';
import './AdminPanel.css';

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  games, 
  onToggleStatus, 
  onResetAllGames 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple admin code - you can change this
  const ADMIN_CODE = 'wedding2025';

  const handleLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setIsAuthenticated(true);
      setAdminCode('');
    } else {
      alert('Incorrect admin code');
    }
  };
  
  const handleResetAllGames = async () => {
    const gamesInProgress = games.filter(game => game.isBeingPlayed);
    if (gamesInProgress.length === 0) {
      alert('All games are already available!');
      return;
    }
    
    if (confirm(`Reset ${gamesInProgress.length} games to available?`)) {
      await onResetAllGames();
    }
  };

  if (!isVisible) {
    return (
      <button 
        className="admin-toggle"
        onClick={() => setIsVisible(true)}
        title="Admin Panel"
      >
        ⚙️
      </button>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h3>🛠️ Admin Panel</h3>
        <button 
          className="close-button"
          onClick={() => {
            setIsVisible(false);
            setIsAuthenticated(false);
            setAdminCode('');
          }}
        >
          ✕
        </button>
      </div>

      {!isAuthenticated ? (
        <div className="admin-login">
          <p>Enter admin code:</p>
          <input
            type="password"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin code"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="admin-controls">
          <div className="admin-stats">
            <p><strong>Total Games:</strong> {games.length}</p>
            <p><strong>Available:</strong> {games.filter(g => !g.isBeingPlayed).length}</p>
            <p><strong>In Progress:</strong> {games.filter(g => g.isBeingPlayed).length}</p>
          </div>

          <button 
            className="reset-button"
            onClick={handleResetAllGames}
          >
            🔄 Reset All Games to Available
          </button>

          <div className="game-list">
            <h4>Quick Toggle:</h4>
            {games.map(game => (
              <div key={game.id} className="admin-game-item">
                <span className={game.isBeingPlayed ? 'playing' : 'available'}>
                  {game.title}
                </span>
                <button
                  onClick={() => onToggleStatus(game.id)}
                  className={game.isBeingPlayed ? 'make-available' : 'make-playing'}
                >
                  {game.isBeingPlayed ? 'Make Available' : 'Mark Playing'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
