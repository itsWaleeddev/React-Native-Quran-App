import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('urdu');
  const [showTafseer, setShowTafseer] = useState(true); // Default to true

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'urdu' ? 'english' : 'urdu'));
  };

  const toggleTafseer = () => {
    setShowTafseer(prev => !prev);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, showTafseer, toggleTafseer }}>
      {children}
    </LanguageContext.Provider>
  );
};
