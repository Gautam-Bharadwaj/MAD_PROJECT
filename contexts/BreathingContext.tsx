import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BreathingSettings {
  inhaleDuration: number;
  exhaleDuration: number;
  holdDuration: number;
}

interface BreathingContextType {
  settings: BreathingSettings;
  updateSettings: (newSettings: BreathingSettings) => void;
}

const BreathingContext = createContext<BreathingContextType | undefined>(undefined);

export function BreathingProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<BreathingSettings>({
    inhaleDuration: 4,
    exhaleDuration: 4,
    holdDuration: 4,
  });

  const updateSettings = (newSettings: BreathingSettings) => {
    setSettings(newSettings);
  };

  return (
    <BreathingContext.Provider value={{ settings, updateSettings }}>
      {children}
    </BreathingContext.Provider>
  );
}

export function useBreathing() {
  const context = useContext(BreathingContext);
  if (context === undefined) {
    throw new Error('useBreathing must be used within a BreathingProvider');
  }
  return context;
}
