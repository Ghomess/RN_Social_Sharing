import { useEffect, useState } from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';

import { fetchDogPhotos } from '@/api/fetchDogPhotos';
import { Emoji } from '@/components/Emoji';
import { Photo } from '@/components/Photo';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export default function HomeScreen() {
  const url = Linking.useURL();
  console.log('url: ', url);

  const router = useRouter();
  const [dogPhotos, setDogPhotos] = useState<Array<string>>([]);

  useEffect(() => {
    const getDogPhotos = async () => {
      const response = await fetchDogPhotos();
      setDogPhotos((d) => [...d, response]);
    };
    getDogPhotos();
  }, []);

  return (
    <SafeAreaView style={styleComponents(Colors).SafeAreaView}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <Emoji emoji="👋" />
      </ThemedView>
      <Photo
        source={dogPhotos[0]}
        onPress={() =>
          router.navigate({
            pathname: '/(screens)/[dog]',
            params: { dog: dogPhotos[0] },
          })
        }
        disableShareButton={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
