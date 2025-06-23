import React from 'react';
import { Game } from '../types/gameTypes';
import { CSS_CLASSES } from '../constants';
import './GameCard.css';

interface GameCardProps {
  game: Game;
  onToggleStatus: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onToggleStatus }) => {
  const handleToggleStatus = () => {
    onToggleStatus(game.id);
  };
  const isPlaying = game.isBeingPlayed;

  return (
    <div className={`${CSS_CLASSES.GAME_CARD} ${isPlaying ? CSS_CLASSES.GAME_CARD_PLAYING : CSS_CLASSES.GAME_CARD_AVAILABLE}`}>
      <div className="game-header">
        <h3 className="game-title">{game.title}</h3>
        <div className="game-tags">
          <span className="game-type-tag">{game.type}</span>
          <span className="player-count-tag">{game.players}</span>
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

      {isPlaying && (
        <div className="playing-status">
          <span className="playing-indicator">🎮 Currently being played!</span>
        </div>
      )}
      
      <div className="game-actions">
        {game.howToPlayUrl && (
          <a 
            href={game.howToPlayUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-button instructions-link"
          >
            📺 How to Play
          </a>
        )}
        
        <button 
          onClick={handleToggleStatus}
          className={`status-button ${isPlaying ? 'finish-button' : 'start-button'}`}
        >
          {isPlaying ? '✅ Mark as Available' : '🎯 Start Playing'}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
