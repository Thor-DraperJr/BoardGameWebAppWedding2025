// Shared game state that persists across function calls
// This module will be cached by Node.js require system
let gameState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

module.exports = {
  getState: () => gameState,
  setState: (newState) => {
    gameState = { ...gameState, ...newState };
    gameState.lastUpdated = new Date().toISOString();
    return gameState;
  },
  toggleActive: () => {
    gameState.isActive = !gameState.isActive;
    gameState.clickCount = (gameState.clickCount || 0) + 1;
    gameState.lastUpdated = new Date().toISOString();
    return gameState;
  }
};
