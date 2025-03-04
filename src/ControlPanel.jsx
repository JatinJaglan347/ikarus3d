import React, { useState } from "react";
import { Menu, X, Plus } from 'lucide-react';

function ControlPanel({ config = [], setConfig }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (index, field, value) => {
    const newConfig = [...config];
    newConfig[index][field] = parseFloat(value);
    setConfig(newConfig);
  };

  const addPlanet = () => {
    const newPlanet = {
      name: `Planet ${config.length + 1}`,
      size: 50,
      speed: 100,
      orbitDistance: 150,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    };
    setConfig([...config, newPlanet]);
  };

  const removePlanet = (index) => {
    const newConfig = config.filter((_, i) => i !== index);
    setConfig(newConfig);
    // Adjust active tab if needed
    if (index === activeTab) {
      setActiveTab(Math.max(0, newConfig.length - 1));
    }
  };

  const resetPlanet = (index) => {
    const newConfig = [...config];
    newConfig[index] = {
      ...newConfig[index],
      size: 50,
      speed: 100,
      orbitDistance: 150
    };
    setConfig(newConfig);
  };

  if (config.length === 0) {
    return (
      <div className="fixed top-4 right-4 bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-400 text-center">No planets configured</p>
          <button 
            onClick={addPlanet}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Add First Planet</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Burger Menu Toggle */}
      <div 
        className="fixed top-8 right-8 z-50 bg-gray-900/30 backdrop-blur-sm rounded-full p-3 cursor-pointer shadow-lg hover:shadow-xl transition-all"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </div>

      {/* Sliding Menu */}
      <div 
        className={`fixed top-8 right-8 w-96 bg-gray-900/80 backdrop-blur-md rounded-3xl shadow-2xl transform transition-all duration-300 ease-in-out z-40 
          ${isMenuOpen ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-full scale-90 opacity-0'}`}
        style={{
          transformOrigin: 'top right',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 20px -5px rgba(0, 0, 0, 0.4)'
        }}
      >
        <div className="p-6 h-[500px] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Planetary Controls</h2>
          </div>

          {/* Planet Dropdown */}
          <div className="relative mb-6">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{backgroundColor: config[activeTab].color}}
                />
                <span className="text-white">{config[activeTab].name}</span>
              </div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className="w-5 h-5 text-gray-400"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full bg-gray-800 rounded-b-2xl shadow-lg max-h-60 overflow-y-auto">
                {config.map((planet, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTab(index);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full p-3 flex items-center space-x-2 text-left 
                      ${index === activeTab ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}
                      transition`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{backgroundColor: planet.color}}
                    />
                    <span>{planet.name}</span>
                    {index === activeTab && <span className="ml-auto text-xs text-gray-500">(Current)</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Planet Controls */}
          <div className="flex-grow overflow-y-auto">
            <div className="space-y-6">
              {/* Size Control */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-300">Size</label>
                  <span className="text-white font-mono">{config[activeTab].size.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="300"
                  step="0.1"
                  value={config[activeTab].size}
                  onChange={(e) => handleChange(activeTab, "size", e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none slider"
                />
              </div>

              {/* Speed Control */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-300">Speed</label>
                  <span className="text-white font-mono">{config[activeTab].speed.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="300"
                  step="0.05"
                  value={config[activeTab].speed}
                  onChange={(e) => handleChange(activeTab, "speed", e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none slider"
                />
              </div>

              {/* Orbit Distance Control */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-300">Orbit Distance</label>
                  <span className="text-white font-mono">{config[activeTab].orbitDistance.toFixed(0)}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="1"
                  value={config[activeTab].orbitDistance}
                  onChange={(e) => handleChange(activeTab, "orbitDistance", e.target.value)}
                  className="w-full h-2 bg-gray-700 rounded-full appearance-none slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ControlPanel;