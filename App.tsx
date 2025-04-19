import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import TabNavigator from './navigation/TabNavigator';
import ScreensNavigator from './navigation/ScreensNavigator';
import NotFoundScreen from './screens/NotFoundScreen';
import { RootStackParamList } from './dataTypes/navigation';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

// Configure linking for deep links
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    Linking.createURL('/'),
    'rnsocialsharing://',
    'rn_social_sharing://',
    'rn-social-sharing://',
  ],
  config: {
    screens: {
      Tabs: {
        screens: {
          Home: 'home',
        },
      },
      Screens: {
        screens: {
          DogDetails: {
            path: 'dog/:dog',
            parse: {
              dog: (dog: string) => dog,
            },
          },
        },
      },
      NotFound: '*',
    },
  },
  // Optional: Add a custom getInitialURL function to handle deep links
  async getInitialURL() {
    // First, check if the app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
    return null;
  },

  subscribe(listener) {
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      linkingSubscription.remove();
    };
  },
};

export default function App() {
  const colorScheme = useColorScheme();

  // Load fonts
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Effect for handling splash screen
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Screens" component={ScreensNavigator} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
