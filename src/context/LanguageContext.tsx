import React, { createContext, useContext, useEffect, useState } from 'react';
import { persistLanguage, getPersistedLanguage } from '../utilities/languagePersistence';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const lang = getPersistedLanguage();
    setLanguageState(lang);
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    persistLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
