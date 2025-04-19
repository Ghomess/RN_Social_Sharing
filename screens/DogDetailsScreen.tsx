import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { styleComponents } from '@/styles/components';

import { Photo } from '@/components/Photo';
import { ShareCard } from '@/components/ShareCard/ShareCard';

type ScreensParamList = {
  DogDetails: { dog: string };
};

type DogDetailsScreenRouteProp = RouteProp<ScreensParamList, 'DogDetails'>;

type Props = {
  route: DogDetailsScreenRouteProp;
};

export default function DogDetailsScreen({ route }: Props) {
  // Add defensive check for route.params
  const dogParam = route.params?.dog || '';

  console.log('dogPhoto param:', dogParam);

  // Add null/undefined checks
  const dogPhoto = dogParam
    ? Array.isArray(dogParam)
      ? dogParam[0]
      : dogParam
    : '';

  // Only try to use startsWith if dogPhoto is a string
  const dogPhotoDeepLink =
    typeof dogPhoto === 'string' && dogPhoto
      ? dogPhoto.startsWith('http')
        ? dogPhoto
        : dogPhoto.startsWith('random.dog/')
          ? `https://${dogPhoto}`
          : `https://random.dog/${dogPhoto}`
      : '';

  console.log('Final URL:', dogPhotoDeepLink);

  const [modal, setModal] = useState<boolean>(false);
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
      {dogPhotoDeepLink ? (
        <Photo
          source={dogPhotoDeepLink}
          onPress={() => openModal(dogPhotoDeepLink)}
        />
      ) : (
        <ThemedText type="title" style={{ color: Colors().tint }}>
          No image URL provided
        </ThemedText>
      )}

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
