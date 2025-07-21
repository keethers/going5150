import React from 'react';
import SlotMachine from '../components/SlotMachine';
import LuckyDraw5150 from '../components/LuckyDraw5150';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎰 Welcome to ExoticaEco$ystem</h1>
      <SlotMachine />
      <LuckyDraw5150 />
    </div>
  );
}
