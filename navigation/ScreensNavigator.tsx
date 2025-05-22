import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DogDetailsScreen from '../screens/DogDetailsScreen';

export type ScreensParamList = {
  DogDetails: { dog: string };
};

const Stack = createStackNavigator<ScreensParamList>();

export default function ScreensNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DogDetails">
      <Stack.Screen
        name="DogDetails"
        component={DogDetailsScreen}
        options={({ route }) => ({ title: route.params.dog })}
      />
    </Stack.Navigator>
  );
}
