import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistLanguage, getPersistedLanguage } from '../utilities/languagePersistence';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: getPersistedLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      persistLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
