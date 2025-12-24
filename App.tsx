import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Removed LanguageProvider, now using Redux for language
import CartPersistenceProvider from './src/context/CartPersistenceProvider';


const App = () => (
  <Provider store={store}>
    <CartPersistenceProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </CartPersistenceProvider>
  </Provider>
);

export default App
