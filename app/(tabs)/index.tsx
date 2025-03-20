import { useEffect, useState } from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';

import { fetchDogPhotos } from '@/api/fetchDogPhotos';
import { Emoji } from '@/components/Emoji';
import { Photo } from '@/components/Photo';
import { ShareCard } from '@/components/ShareCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';

export default function HomeScreen() {
  const [dogPhotos, setDogPhotos] = useState<Array<string>>([]);
  const [modal, setModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const getDogPhotos = async () => {
      const response = await fetchDogPhotos();
      setDogPhotos([...dogPhotos, response]);
    };
    getDogPhotos();
  }, []);

  const openModal = (photo: string) => {
    setSelectedPhoto(photo);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModal(false);
  };

  return (
    <SafeAreaView style={styleComponents(Colors).SafeAreaView}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <Emoji emoji="👋" />
      </ThemedView>
      <Photo source={dogPhotos[0]} onPress={() => openModal(dogPhotos[0])} />

      <ShareCard
        visible={modal}
        onClose={closeModal}
        selectedPhoto={selectedPhoto}
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
