// pages/slots.js
import React from 'react';
import SlotMachine from '../components/SlotMachine';
import AvatarSlot from '../components/AvatarSlot';
import Luxe5150Slot from '../components/Luxe5150Slot';

export default function SlotsPage() {
  return (
    <div style={{ padding: '2rem', background: '#111', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>🎰 Exotica Slot Arcade</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div>
          <h2>💰 EX$ Classic</h2>
          <SlotMachine />
        </div>
        <div>
          <h2>🤖 Avatar AI</h2>
          <AvatarSlot />
        </div>
        <div>
          <h2>💎 Luxe5150</h2>
          <Luxe5150Slot />
        </div>
      </div>
    </div>
  );
}
