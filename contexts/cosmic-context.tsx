"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface CosmicSettings {
  starCount: number;
  starSpread: number;
  animationSpeed: number;
  starSize: number;
  starBrightness: number;
  initialTilt: number;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  updateSettings: (settings: Partial<Omit<CosmicSettings, 'isModalOpen' | 'setModalOpen' | 'updateSettings' | 'resetSettings'>>) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  starCount: 5000,
  starSpread: 1.2,
  animationSpeed: 1,
  starSize: 0.002,
  starBrightness: 1,
  initialTilt: 45,
};

const CosmicContext = createContext<CosmicSettings | null>(null);

export const CosmicProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isModalOpen, setModalOpen] = useState(false);

  const updateSettings = (newSettings: Partial<Omit<CosmicSettings, 'isModalOpen' | 'setModalOpen' | 'updateSettings' | 'resetSettings'>>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <CosmicContext.Provider value={{
      ...settings,
      isModalOpen,
      setModalOpen,
      updateSettings,
      resetSettings
    }}>
      {children}
    </CosmicContext.Provider>
  );
};

export const useCosmicSettings = () => {
  const context = useContext(CosmicContext);
  if (!context) throw new Error('useCosmicSettings must be used within CosmicProvider');
  return context;
};