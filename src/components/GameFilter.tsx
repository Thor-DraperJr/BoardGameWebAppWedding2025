import React from 'react';
import { GameFilter as GameFilterType, FilterNavProps } from '../types/gameTypes';
import { FILTER_ALL, FILTER_AVAILABLE, FILTER_PLAYING, CSS_CLASSES } from '../constants';
import './GameFilter.css';

const GameFilter: React.FC<FilterNavProps> = ({ 
  currentFilter, 
  onFilterChange, 
  availableCount, 
  playingCount, 
  totalCount 
}) => {
  return (
    <div className={CSS_CLASSES.FILTER_NAV}>
      <button
        className={`filter-button ${currentFilter === FILTER_ALL ? CSS_CLASSES.FILTER_BUTTON_ACTIVE : ''}`}
        onClick={() => onFilterChange(FILTER_ALL as GameFilterType)}
      >
        🎲 All Games ({totalCount})
      </button>
      <button
        className={`filter-button ${currentFilter === FILTER_AVAILABLE ? CSS_CLASSES.FILTER_BUTTON_ACTIVE : ''}`}
        onClick={() => onFilterChange(FILTER_AVAILABLE as GameFilterType)}
      >
        ✅ Available ({availableCount})
      </button>
      <button
        className={`filter-button ${currentFilter === FILTER_PLAYING ? CSS_CLASSES.FILTER_BUTTON_ACTIVE : ''}`}
        onClick={() => onFilterChange(FILTER_PLAYING as GameFilterType)}
      >
        🎮 In Progress ({playingCount})
      </button>
    </div>
  );
};

export default GameFilter;
