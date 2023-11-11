import { Fragment, useState, useEffect, useCallback } from 'react';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { func } from './src/constants';

import * as Updates from 'expo-updates';

import RootStack from './src/navigation/RootStack';

SplashScreen.preventAutoHideAsync();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        alert(`Falha ao atualizar aplicativo!`);
      }
    }

    async function prepare() {
      try {
        await func.loadAssetsAsync();
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }

    prepare();
    onFetchUpdateAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isLoading === false) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Fragment>
      <StatusBar hidden={true} />

      <RootStack />

      <View onLayout={onLayoutRootView} />
    </Fragment>
  );
}

export default App;
