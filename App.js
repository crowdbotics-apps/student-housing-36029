import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {ErrorBoundary} from 'react-error-boundary';
import {enableScreens} from 'react-native-screens';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import AppTheme from './src/constants/AppTheme';

enableScreens();

export default function App() {

  return (
    <ThemeProvider theme={AppTheme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <View style={styles.container}>
            <StatusBar barStyle="default" translucent backgroundColor={'transparent'} />
            <ErrorBoundary
              FallbackComponent={ErrorFallbackScreen}
              onReset={() => {
                BackHandler.exitApp();
              }}>
              <Navigation />
            </ErrorBoundary>
          </View>
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});

function ErrorFallbackScreen({error, resetErrorBoundary}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{color: 'red', fontSize: 20, fontWeight: 'bold', margin: 20}}>
        Oops! Something went wrong ...!!
      </Text>
      <Button
        onClick={resetErrorBoundary}
        title="Reload"
        style={{width: 150, height: 40, marginVertical: 30}}
      />
      <Text style={{color: '#666', fontWeight: 'bold', margin: 20}}>
        Error details:{' '}
      </Text>
      <Text style={{color: '#666', margin: 20}}>{error.message}</Text>
    </View>
  );
}
