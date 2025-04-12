import { Image, StyleSheet, View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { ThemedText } from '../ThemedText';
import { Colors } from '@/constants/Colors';
import { useCallback, useLayoutEffect, useRef } from 'react';
import ViewShot from 'react-native-view-shot';

export const ReviewCard = ({
  selectedPhoto,
  setReviewCardUrl,
}: {
  selectedPhoto: string | null | undefined;
  setReviewCardUrl: (url: string) => void;
}) => {
  const ref = useRef<any>(null);
  const styles = themedStyles(Colors);
  useLayoutEffect(() => {
    console.log('Opening share card');

    const result = async () => {
      setTimeout(async () => {
        if (ref.current) {
          await ref.current
            .capture()
            .then((uri: string) => {
              setReviewCardUrl(uri);

              console.log('do something with ', uri);
            })
            .catch((error: any) => {
              console.error('Error capturing review card:', error);
            });
        }
      }, 500);
    };
    result();
  }, []);

  return (
    <ViewShot ref={ref}>
      <View style={styles.reviewCard}>
        <Image
          source={{ uri: selectedPhoto ? selectedPhoto : '' }} // Replace with actual image
          style={styles.poster}
        />
        <View style={styles.reviewContent}>
          <Text style={styles.username}>Ghomes</Text>
          <View style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                type="font-awesome"
                color="#4CAF50"
                size={18}
                style={styles.icon}
              />
            ))}
            <Icon name="heart" type="font-awesome" color="#4CAF50" size={18} />
          </View>
          <ThemedText style={styles.reviewText}>Cute dog</ThemedText>
        </View>
      </View>
    </ViewShot>
  );
};

/* eslint-disable react-native/no-unused-styles */
const themedStyles = (colors: typeof Colors) =>
  StyleSheet.create({
    reviewCard: {
      flexDirection: 'row',
      backgroundColor: colors().reviewCardBG,
      borderRadius: 15,
      padding: 10,
      alignItems: 'center',
      width: '90%',
    },
    poster: {
      width: 80,
      height: 120,
      borderRadius: 10,
    },
    reviewContent: {
      flex: 1,
      marginLeft: 10,
      alignSelf: 'flex-start',
    },
    username: {
      color: colors().text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    stars: {
      flexDirection: 'row',

      marginVertical: 5,
    },
    reviewText: {
      color: colors().text,
      fontSize: 14,
    },
    icon: {
      marginRight: 5,
    },
  });
/* eslint-disable react-native/no-unused-styles */
