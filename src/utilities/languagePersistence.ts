import { storage } from '../redux/mmkv';

export const persistLanguage = (lang: string) => {
  storage.set('language', lang);
};

export const getPersistedLanguage = (): string => {
  const lang = storage.getString('language');
  return lang || 'en';
};
