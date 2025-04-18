import { StyleSheet, ScrollView, SafeAreaView, Linking } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';

import { Photo } from '@/components/Photo';
import { ShareCard } from '@/components/ShareCard/ShareCard';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

//https://random.dog/2e5569d8-ac6a-4d4c-b6ef-9393f93dd0f6.jpg
export default function Dog() {
  const { dog: dogPhoto } = useLocalSearchParams();

  console.log('dogPhoto: ', dogPhoto);

  const dogPhotoString = typeof dogPhoto === 'string' ? dogPhoto : dogPhoto[0];

  const [modal, setModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

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
        <ThemedText type="title">Dog</ThemedText>
      </ThemedView>
      <Photo
        source={dogPhotoString}
        onPress={() => openModal(dogPhotoString)}
      />

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
    gap: 8,
  },
});
