import React from 'react';
import './GameFilter.css';

interface GameFilterProps {
  activeFilter: 'all' | 'available' | 'playing';
  onFilterChange: (filter: 'all' | 'available' | 'playing') => void;
  counts: {
    all: number;
    available: number;
    playing: number;
  };
}

const GameFilter: React.FC<GameFilterProps> = ({ activeFilter, onFilterChange, counts }) => {
  return (
    <div className="game-filter">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        🎲 All Games ({counts.all})
      </button>
      <button
        className={`filter-button ${activeFilter === 'available' ? 'active' : ''}`}
        onClick={() => onFilterChange('available')}
      >
        ✅ Available ({counts.available})
      </button>
      <button
        className={`filter-button ${activeFilter === 'playing' ? 'active' : ''}`}
        onClick={() => onFilterChange('playing')}
      >
        🎮 In Progress ({counts.playing})
      </button>
    </div>
  );
};

export default GameFilter;
