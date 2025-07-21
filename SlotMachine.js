// components/SlotMachine.js
import React, { useState } from 'react';

const symbols = ['🍒', '💎', '🍋', '7️⃣', '🔔'];
let totalIntake = 0;
let totalPayout = 0;
const MAX_PAYOUT_PERCENT = 0.10;

export default function SlotMachine() {
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(100); // Starting EX$

  const play = () => {
    const bet = 5;
    if (balance < bet) return setMessage('Not enough balance');

    totalIntake += bet;
    setBalance(prev => prev - bet);

    const spin = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];
    setResult(spin);

    const isWin = spin.every(s => s === spin[0]);
    const prize = isWin ? 50 : 0;

    if (isWin && totalPayout + prize <= totalIntake * MAX_PAYOUT_PERCENT) {
      setBalance(prev => prev + prize);
      totalPayout += prize;
      setMessage(`🎉 Jackpot! You win ${prize} EX$`);
    } else if (isWin) {
      setMessage('🎯 Win blocked — payout cap hit.');
    } else {
      setMessage('❌ No win. Try again!');
    }
  };

  return (
    <div>
      <h3>🎰 Slot Machine</h3>
      <p>Balance: {balance} EX$</p>
      <div style={{ fontSize: '2rem' }}>{result.join(' | ')}</div>
      <button onClick={play}>Spin (5 EX$)</button>
      <p>{message}</p>
    </div>
  );
}

