import { Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { func } from './src/constants';

import RootStack from './src/navigation/RootStack';
import { MovieTVProvider } from './src/contexts/MovieTVData';
import { AuthProvider } from './src/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function App() {
  useEffect(() => {
    async function prepare() {
      try {
        await func.loadAssetsAsync();
      } catch (e) { }
    }

    prepare();
  }, []);

  return (
    <AuthProvider>
      <MovieTVProvider>
        <Fragment>
          <StatusBar hidden={true} />
          <RootStack />
        </Fragment>
      </MovieTVProvider>
    </AuthProvider>
  );
}

export default App;
