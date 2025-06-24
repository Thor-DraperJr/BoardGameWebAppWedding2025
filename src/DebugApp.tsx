import React from 'react';

const DebugApp: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '2rem' }}>🎲 Wedding Board Games - DEBUG MODE</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        This is a simple debug version to test deployment pipeline.
      </p>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px',
        border: '2px solid #007acc'
      }}>
        <h2>✅ Debug Checklist</h2>
        <ul>
          <li>✅ React is mounting correctly</li>
          <li>✅ CSS styles are working</li>
          <li>✅ JavaScript is executing</li>
          <li>✅ No blank/white screen</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px',
        border: '1px solid #4caf50'
      }}>
        <h3>🟢 Status: WORKING</h3>
        <p>If you can see this message, the basic React app is functioning correctly.</p>
        <p><strong>Current Time:</strong> {new Date().toLocaleString()}</p>
      </div>

      <button 
        onClick={() => alert('JavaScript click events are working!')}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#007acc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Button Click
      </button>
    </div>
  );
};

export default DebugApp;
