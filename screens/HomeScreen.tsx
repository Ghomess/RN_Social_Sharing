import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
  Dimensions,
  InteractionManager,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FastImageWrapper from '@/components/FastImageWrapper';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';
import {
  PerformanceMeasureView,
  useResetFlow,
  useStartProfiler,
} from '@shopify/react-native-performance';

type RootStackParamList = {
  Screens: { screen: string; params: { dog: string } };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const gap = 10;

const availableSpace = screenWidth - (numColumns - 1) * gap;
const itemSize = availableSpace / numColumns;

export default function HomeScreen() {
  const { componentInstanceId } = useResetFlow();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [dogPhotos, setDogPhotos] = useState<string[]>([]);
  const appReadyMarked = useRef(false);
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
      console.error('Fetch error: ', error);
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
        index={index}
        source={{
          uri: `https://random.dog/${item}`,
          priority: 'high',
          cache: 'immutable',
        }}
        fallback={true}
        debugLabel={index.toString()}
      />
    </Pressable>
  );

  return (
    <PerformanceMeasureView
      screenName="Home"
      componentInstanceId={componentInstanceId}
      interactive={dogPhotos.length > 0}
      renderPassName={dogPhotos.length > 0 ? 'network_render' : 'loading'}>
      <SafeAreaView
        style={styleComponents(Colors).SafeAreaView}
        onLayout={() => {
          if (!appReadyMarked.current) {
            performance.mark('app_ready');
            const measure = performance.measure(
              'app_startup',
              'app_start',
              'app_ready'
            );
            console.log(
              `🚀 App Startup Time: ${measure?.duration?.toFixed(2)} ms`
            );
            appReadyMarked.current = true;
          }
        }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Dogs</ThemedText>
        </ThemedView>

        <ThemedView style={{ flex: 1, padding: gap, width: '100%' }}>
          <FlashList
            key={numColumns}
            data={dogPhotos}
            renderItem={renderItem}
            keyExtractor={(index) => index.toString()}
            numColumns={numColumns}
            estimatedItemSize={screenWidth}
            //columnWrapperStyle={styles.columnWrapper}
          />
        </ThemedView>
      </SafeAreaView>
    </PerformanceMeasureView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: gap,
    //padding: 10,
  },

  columnWrapper: {
    justifyContent: 'space-between',
  },
  photoContainer: {
    aspectRatio: 1,
    overflow: 'hidden',
    width: itemSize * 0.9,
    height: itemSize * 0.9,
    margin: gap / 2,
    //paddingRight: gap,
    borderRadius: 8,
  },
});
