import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Main from './src/application/navigations/Main';
import Auth from './src/application/navigations/Auth';

function App() {
  const [isLogin, _] = React.useState(false);

  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Auth />
        </NavigationContainer>
      )}
    </>
  );
}

export default App;
