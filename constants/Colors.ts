/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useColorScheme } from 'react-native';

export const colors = {
  light: {
    transparent: 'transparent',
    text: '#11181C',
    background: '#fff',
    tint: '#34C759',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#34C759',
    buttonDefault: '#687076',
    buttonSelected: '#34C759',
    buttonTextDefault: '#11181C',
    buttonTextSelected: '#34C759',
    photoOverlay: '#333333',
    shareButton: '#4CAF50',
    modalBG: '#fff',
    reviewCardBG: '#ECEDEE',
    shareOptionsBG: '#fff',
    downloadButton: 'rgba(0, 0, 0, 0.1)',
    link: '#34C759',
  },
  dark: {
    transparent: 'transparent',
    text: '#ECEDEE',
    background: '#11181C',
    tint: '#8BC34A',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#8BC34A',
    buttonDefault: '#9BA1A6',
    buttonSelected: '#8BC34A',
    buttonTextDefault: '#ECEDEE',
    buttonTextSelected: '#8BC34A',
    photoOverlay: '#666666',
    shareButton: '#3E8E41',
    modalBG: '#11181C',
    reviewCardBG: '#333333',
    shareOptionsBG: '#333333',
    downloadButton: 'rgba(0, 0, 0, 0.1)',
    link: '#8BC34A',
  },
};

export const Colors = () => {
  const theme = useColorScheme() ?? 'light';

  return colors[theme];
};
