"use client";

import { useCosmicSettings } from "@/contexts/cosmic-context";

export const CosmicPlayModal = () => {
  const settings = useCosmicSettings();

  if (!settings.isModalOpen) return null;

  const handleSave = () => {
    // Settings are already updated in real-time
    settings.setModalOpen(false);
  };

  const handleReset = () => {
    settings.resetSettings();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => settings.setModalOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text">
            ✨ Cosmic Play Settings ✨
          </h2>
          <p className="text-gray-300 text-sm mt-2">Control your cosmic experience</p>
        </div>

        {/* Settings Controls */}
        <div className="space-y-6">
          {/* Star Count */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Number of Stars: {settings.starCount}
            </label>
            <input
              type="range"
              min="1000"
              max="10000"
              step="500"
              value={settings.starCount}
              onChange={(e) => settings.updateSettings({ starCount: parseInt(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Star Spread */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Star Spread: {settings.starSpread.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={settings.starSpread}
              onChange={(e) => settings.updateSettings({ starSpread: parseFloat(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Animation Speed */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Animation Speed: {settings.animationSpeed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={settings.animationSpeed}
              onChange={(e) => settings.updateSettings({ animationSpeed: parseFloat(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Star Size */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Star Size: {(settings.starSize * 1000).toFixed(1)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.01"
              step="0.0005"
              value={settings.starSize}
              onChange={(e) => settings.updateSettings({ starSize: parseFloat(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Star Brightness */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Star Brightness: {(settings.starBrightness * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={settings.starBrightness}
              onChange={(e) => settings.updateSettings({ starBrightness: parseFloat(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Initial Tilt */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Starfield Tilt: {settings.initialTilt}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              value={settings.initialTilt}
              onChange={(e) => settings.updateSettings({ initialTilt: parseInt(e.target.value) })}
              className="cosmic-slider w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 rounded-lg hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 font-medium"
          >
            🔄 Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 text-cyan-300 rounded-lg hover:from-purple-500/30 hover:to-cyan-500/30 transition-all duration-300 font-medium"
          >
            💾 Save
          </button>
        </div>
      </div>

      <style jsx>{`
        .cosmic-slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #06b6d4);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        .cosmic-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #06b6d4);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        .cosmic-slider::-webkit-slider-track {
          background: linear-gradient(90deg, #4c1d95, #0891b2);
          border-radius: 5px;
        }
        .cosmic-slider::-moz-range-track {
          background: linear-gradient(90deg, #4c1d95, #0891b2);
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};