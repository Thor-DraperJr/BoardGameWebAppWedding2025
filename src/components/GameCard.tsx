import React from 'react';
import { BoardGame } from '../types/BoardGame';
import { useGames } from '../context/GameContext';
import './GameCard.css';

interface GameCardProps {
  game: BoardGame;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { togglePlayingStatus } = useGames();

  const handleToggleStatus = () => {
    togglePlayingStatus(game.id);
  };

  return (
    <div className={`game-card ${game.isBeingPlayed ? 'in-progress' : ''}`}>
      <div className="game-header">
        <h3 className="game-title">{game.title}</h3>
        <div className="game-tags">
          <span className="game-type-tag">{game.gameType}</span>
          <span className="player-count-tag">{game.playerCount}</span>
          {game.difficulty && (
            <span className={`difficulty-tag difficulty-${game.difficulty.toLowerCase()}`}>
              {game.difficulty}
            </span>
          )}
          {game.duration && (
            <span className="duration-tag">⏱️ {game.duration}</span>
          )}
        </div>
      </div>

      {game.isBeingPlayed && (
        <div className="playing-status">
          <span className="playing-indicator">🎮 Currently being played!</span>
        </div>
      )}
      
      <div className="game-actions">
        {game.instructionsUrl && (
          <a 
            href={game.instructionsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button instructions-link"
          >
            📺 How to Play
          </a>
        )}
        
        <button 
          onClick={handleToggleStatus}
          className={`status-button ${game.isBeingPlayed ? 'finish-button' : 'start-button'}`}
        >
          {game.isBeingPlayed ? '✅ Mark as Available' : '🎯 Start Playing'}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
