// Persistent game state using simple file storage for Azure Functions
const fs = require('fs');
const path = require('path');

// File path for storing state (will persist in the function app's temp directory)
const stateFilePath = path.join('/tmp', 'gameState.json');

// Default state
const defaultState = { 
  isActive: false, 
  lastUpdated: new Date().toISOString(),
  clickCount: 0
};

// Load state from file or use default
function loadState() {
  try {
    if (fs.existsSync(stateFilePath)) {
      const data = fs.readFileSync(stateFilePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.log('Error loading state, using default:', error.message);
  }
  return { ...defaultState };
}

// Save state to file
function saveState(state) {
  try {
    fs.writeFileSync(stateFilePath, JSON.stringify(state, null, 2));
    return true;
  } catch (error) {
    console.log('Error saving state:', error.message);
    return false;
  }
}

module.exports = {
  getState: () => {
    const state = loadState();
    console.log('Loaded state:', state);
    return state;
  },
  
  setState: (newState) => {
    const currentState = loadState();
    const updatedState = { 
      ...currentState, 
      ...newState, 
      lastUpdated: new Date().toISOString() 
    };
    saveState(updatedState);
    console.log('Updated state:', updatedState);
    return updatedState;
  },
  
  toggleActive: () => {
    const currentState = loadState();
    const updatedState = {
      ...currentState,
      isActive: !currentState.isActive,
      clickCount: (currentState.clickCount || 0) + 1,
      lastUpdated: new Date().toISOString()
    };
    saveState(updatedState);
    console.log('Toggled state:', updatedState);
    return updatedState;
  }
};
