// components/Luxe5150Slot.js
import React, { useState } from 'react';

const symbols = [
  '/slots/luxe1.jpg',
  '/slots/luxe2.jpg',
  '/slots/luxe3.jpg',
  '/slots/luxe4.jpg',
  '/slots/luxe5.jpg',
  '/slots/luxe6.jpg',
  '/slots/luxe7.jpg',
  '/slots/luxe8.jpg',
  '/slots/luxe9.jpg',
  '/slots/luxe10.jpg'
];

let totalIntake = 0;
let totalPayout = 0;
const MAX_PAYOUT_PERCENT = 0.10;

// 🔧 Owner controls
let forceWinEnabled = false;
let maxPrizeOverride = null;

export function setForceWin(value) {
  forceWinEnabled = value;
}
export function setMaxPrizeOverride(amount) {
  maxPrizeOverride = amount;
}

export default function Luxe5150Slot() {
  const [reels, setReels] = useState([]);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(1);
  const [message, setMessage] = useState('');

  const spin = () => {
    if (balance < bet) return setMessage('❌ Not enough balance.');

    totalIntake += bet;
    setBalance(prev => prev - bet);

    const result = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    setReels(result);

    const isWin = result.every(img => img === result[0]);
    const scaledPrize = bet * 5; // 5x return if matched
    const prize = isWin ? scaledPrize : 0;

    const allowed =
      (isWin && totalPayout + prize <= totalIntake * MAX_PAYOUT_PERCENT) ||
      forceWinEnabled;

    if (isWin && allowed) {
      const finalPrize = maxPrizeOverride || prize;
      totalPayout += finalPrize;
      setBalance(prev => prev + finalPrize);
      setMessage(`🎉 BIG WIN! You won $${finalPrize.toFixed(2)}!`);
    } else if (isWin) {
      setMessage('⚠️ Win blocked – payout cap hit.');
    } else {
      setMessage('🎲 Try again!');
    }
  };

  return (
    <div style={{ padding: '2rem', background: '#000', color: '#fff' }}>
      <h2>💎 Luxe5150 Slot Machine</h2>
      <p>Balance: ${balance.toFixed(2)}</p>

      <label>Bet: </label>
      <select value={bet} onChange={e => setBet(parseFloat(e.target.value))}>
        {[1, 5, 10, 25, 50].map(val => (
          <option key={val} value={val}>${val}</option>
        ))}
      </select>

      <div style={{ display: 'flex', margin: '1rem 0', gap: '1rem' }}>
        {reels.map((img, i) => (
          <div key={i} style={{
            border: '4px solid gold',
            borderRadius: '12px',
            boxShadow: '0 0 10px gold',
            width: '100px', height: '100px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#111'
          }}>
            <img src={img} alt="model" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} />
          </div>
        ))}
      </div>

      <button onClick={spin}>🎰 Spin (${bet})</button>
      <p style={{ marginTop: '1rem' }}>{message}</p>
    </div>
  );
}
