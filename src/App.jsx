// App.jsx
import React, { useState } from 'react';
import SolarSystem from './SolarSystem';
import ControlPanel from './ControlPanel';

function App() {
  // Configuration for Mercury, Venus, and Earth
  const [config, setConfig] = useState([
    { name: 'Mercury', size: 0.08, speed: 0.5, orbitDistance: 80, modelPath: '/mercury.glb' },
    { name: 'Venus', size: 5, speed: 0.45, orbitDistance: 100, modelPath: '/venus.glb' },
    { name: 'Earth', size: 100, speed: 0.4, orbitDistance: 150, modelPath: '/earth.glb' },
    { name: 'Mars',    size: 5, speed: 0.25, orbitDistance: 180, modelPath: '/mars.glb' },
    { name: 'Jupiter', size: 0.08, speed: 0.2, orbitDistance: 220, modelPath: '/jupiter.glb' },
    { name: 'Saturn',  size: 0.08, speed: 0.18, orbitDistance: 280, modelPath: '/saturn.glb' },
    // { name: 'Uranus',  size: 1, speed: 0.15, orbitDistance: 300, modelPath: '/uranus.glb' },
    { name: 'Neptune', size: 1, speed: 0.12, orbitDistance: 330, modelPath: '/neptune.glb' },
  ]);

  return (
    <div className="relative w-screen h-screen bg-black">
      <SolarSystem config={config} />
      <ControlPanel config={config} setConfig={setConfig} />
    </div>
  );
}

export default App;
