import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  Button,
  BackHandler,
  Image,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ThemeProvider} from 'react-native-elements';
import {ErrorBoundary} from 'react-error-boundary';
import {enableScreens} from 'react-native-screens';
import Navigation from './src/navigations';
import { Provider } from 'react-redux';
import store from "./src/redux/store";
import AppTheme from './src/constants/AppTheme';
import { StripeProvider } from '@stripe/stripe-react-native';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import uuid from 'react-native-uuid';
import Colors from './src/constants/Colors';

enableScreens();

export default function App() {

  const pubnub = new PubNub({
    publishKey: 'pub-c-bf5a80a8-0548-4358-9d3b-7db72678d270',
    subscribeKey: 'sub-c-14933cf4-d37a-11eb-92a6-1ab188f49893',
    userId: uuid.v4(),
  });
  
  return (
    <StripeProvider
      publishableKey="pk_test_qblFNYngBkEdjEZ16jxxoWSM"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
    <PubNubProvider client={pubnub}>
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
    </PubNubProvider>
    </StripeProvider>
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(244, 244, 244)" }}>
      <Image source={require('./src/assets/images/error-screen.jpeg')} style={{ width: '100%', height: 200, resizeMode: 'contain'}}/>
      <Text
        style={{color: Colors.text, fontSize: 22, fontFamily: 'Lato-Bold', marginTop: 100, textAlign: 'center' }}>
          Something went wrong
      </Text>
      <Text
        style={{color: '#666', fontSize: 15, fontFamily: 'Lato-Regular', marginTop: 10, width: '80%',textAlign: 'center', marginBottom: 16 }}>
          We could not process your request, our server just acted up!
      </Text>
      <Button
        onPress={() => resetErrorBoundary()}
        title=" EXIT APP"
        style={{ width: 150, height: 40, }}
      />
      {
        __DEV__ &&
        <>
          <Text style={{color: '#000', fontWeight: 'bold', margin: 5, marginTop: 20 }}>
            Error details:{' '}
          </Text>
          <Text style={{color: '#666'}}>{error.message}</Text>
        </>
      }
    </View>
  );
}
