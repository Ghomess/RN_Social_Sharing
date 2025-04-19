import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type RootStackParamList = {
  Tabs: undefined;
};

type NotFoundScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function NotFoundScreen() {
  const navigation = useNavigation<NotFoundScreenNavigationProp>();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">This screen doesn't exist.</ThemedText>
      <ThemedView
        style={styles.link}
        onTouchEnd={() => navigation.navigate('Tabs')}>
        <ThemedText type="link">Go to home screen!</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
