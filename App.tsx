import React, { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import TabNavigator from './navigation/TabNavigator';
import ScreensNavigator from './navigation/ScreensNavigator';
import NotFoundScreen from './screens/NotFoundScreen';
import { RootStackParamList } from './dataTypes/navigation';
import {
  PerformanceProfiler,
  RenderPassReport,
  useStartProfiler,
} from '@shopify/react-native-performance';

if (typeof performance !== 'undefined' && performance.mark) {
  performance.mark('app_start');
}
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
    },
  },

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
  /* useStartProfiler(); */
  const colorScheme = useColorScheme();

  // Load fonts
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  const onReportPrepared = useCallback((report: RenderPassReport) => {
    const {
      sourceScreen,
      destinationScreen,
      flowInstanceId,
      timeToRenderMillis,
      timeToBootJsMillis,
      timeToConsumeTouchEventMillis,
      resourceAcquisitionStatus,
      interactive,
      timeToAbortMillis,
    } = report;

    if (timeToAbortMillis) {
      console.log(
        `❌ Render aborted (${destinationScreen}), after ${timeToAbortMillis.toFixed(2)} ms`
      );
      return;
    }

    console.log(`🎯 Interactive: ${interactive ? 'Yes' : 'No'}`);
    console.log(
      `📱 RenderPassReport for ${sourceScreen} → ${destinationScreen}`
    );
    console.log(`🆔 Flow: ${flowInstanceId}`);
    console.log(`🕒 Render Time: ${timeToRenderMillis?.toFixed(2)} ms`);

    if (timeToBootJsMillis !== undefined) {
      console.log(`❄️ JS Cold Boot Time: ${timeToBootJsMillis.toFixed(2)} ms`);
    }

    if (timeToConsumeTouchEventMillis !== undefined) {
      console.log(
        `👆 Touch Trigger Delay: ${timeToConsumeTouchEventMillis.toFixed(2)} ms`
      );
    }

    console.log(
      `⏱️ Resource Load Time: ${resourceAcquisitionStatus.totalTimeMillis.toFixed(2)} ms`
    );

    Object.entries(resourceAcquisitionStatus.components).forEach(
      ([name, status]) => {
        if (status.status === 'completed') {
          console.log(`✅ ${name}: ${status.durationMillis.toFixed(2)} ms`);
        } else if (status.status === 'cancelled') {
          console.log(`🚫 ${name}: Cancelled`);
        } else {
          console.log(`⏳ ${name}: Still Ongoing`);
        }
      }
    );
  }, []);

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
    <PerformanceProfiler onReportPrepared={onReportPrepared}>
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
    </PerformanceProfiler>
  );
}
