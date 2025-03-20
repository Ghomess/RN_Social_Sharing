import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styleComponents(Colors).SafeAreaView}>
      <ScrollView
        style={styleComponents(Colors).ScrollViewContainer}
        contentContainerStyle={
          styleComponents(Colors).ScrollViewContentContainer
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Explore</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
