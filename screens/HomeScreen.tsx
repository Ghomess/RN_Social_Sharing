import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImageWrapper from '@/components/FastImageWrapper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';

type RootStackParamList = {
  Screens: { screen: string; params: { dog: string } };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [dogPhotos, setDogPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetchDogPhotos();
  }, []);

  const fetchDogPhotos = async () => {
    try {
      const response = await fetch('https://random.dog/doggos');
      const data = await response.json();
      const filteredData = data.filter(
        (photo: string) =>
          photo.endsWith('.jpg') ||
          photo.endsWith('.jpeg') ||
          photo.endsWith('.png')
      );
      setDogPhotos(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDogPress = (dogPhoto: string) => {
    navigation.navigate('Screens', {
      screen: 'DogDetails',
      params: { dog: dogPhoto },
    });
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable
      style={styles.photoContainer}
      onPress={() => handleDogPress(`https://random.dog/${item}`)}>
      <FastImageWrapper
        source={{
          uri: `https://random.dog/${item}`,
          priority: 'high',
          cache: 'immutable',
        }}
        fallback={true}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styleComponents(Colors).SafeAreaView}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dogs</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <FlatList
          data={dogPhotos}
          renderItem={renderItem}
          keyExtractor={(index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  photoContainer: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
