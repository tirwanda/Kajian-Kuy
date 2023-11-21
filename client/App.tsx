import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';
import Store from './src/redux/Store';

export default function App() {
  return (
    <Provider store={Store}>
      <DataProvider>
        <AppNavigation />
      </DataProvider>
    </Provider>
  );
}
