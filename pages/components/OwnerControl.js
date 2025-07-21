// components/OwnerControl.js
import React, { useState } from 'react';
import { setForceWin, setMaxPrizeOverride } from './Luxe5150Slot';

export default function OwnerControl() {
  const [forceWin, setForceWinState] = useState(false);
  const [override, setOverride] = useState('');

  const toggleForce = () => {
    const next = !forceWin;
    setForceWin(next);
    setForceWinState(next);
  };

  const applyOverride = () => {
    const value = parseFloat(override);
    if (!isNaN(value)) {
      setMaxPrizeOverride(value);
      alert(`Override prize set to $${value}`);
    }
  };

  return (
    <div style={{ marginTop: '2rem', background: '#222', padding: '1rem', borderRadius: '12px' }}>
      <h3>🎛️ Owner Controls (Luxe5150)</h3>
      <button onClick={toggleForce}>
        {forceWin ? '✅ Force Win Enabled' : '❌ Force Win Disabled'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <label>Override Prize: $</label>
        <input
          type="number"
          value={override}
          onChange={(e) => setOverride(e.target.value)}
          style={{ marginLeft: '0.5rem', width: '80px' }}
        />
        <button onClick={applyOverride} style={{ marginLeft: '0.5rem' }}>Set</button>
      </div>
    </div>
  );
}
