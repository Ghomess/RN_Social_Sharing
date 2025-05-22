import { StatusBar, StyleSheet } from 'react-native';

import { Colors } from '@/constants/Colors';

const height = StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40;

export const styleComponents = (colors: typeof Colors) =>
  StyleSheet.create({
    ScrollViewContainer: {
      flex: 1,
      backgroundColor: colors().background,
    },
    ScrollViewContentContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      gap: 20,
    },
    SafeAreaView: {
      flex: 1,
      paddingTop: height + 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors().background,
    },
    Image: {
      zIndex: 0,
      width: 300,
      height: 300,
      borderRadius: 10,
    },
  });
