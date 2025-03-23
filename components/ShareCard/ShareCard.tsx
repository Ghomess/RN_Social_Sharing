import { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { captureRef } from 'react-native-view-shot';

import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

import { ReviewCard } from './ReviewCard';

import { onShare } from '@/features/share/onShareFunction';
import { Colors } from '@/constants/Colors';

export const ShareCard = ({
  visible,
  onClose,
  selectedPhoto,
}: {
  visible: boolean;
  onClose: () => void;
  selectedPhoto: string | null | undefined;
}) => {
  const colors = Colors();
  const styles = themedStyles(Colors);
  const ref = useRef<View>(null);
  const [reviewCardUrl, setReviewCardUrl] = useState('');

  useEffect(() => {
    if (ref.current) {
      captureRef(ref, {
        result: 'data-uri',
      }).then((uri) => setReviewCardUrl(uri));
    }
  }, []);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <ThemedView style={styles.overlay}>
        <ThemedView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="x" type="feather" color={colors.text} size={24} />
            </TouchableOpacity>
            <ThemedText style={styles.title}>Share</ThemedText>
          </View>

          <ReviewCard viewRef={ref} selectedPhoto={selectedPhoto} />
          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onShare({ url: selectedPhoto!, type: 'download' })
              }>
              <Icon
                name="download"
                type="feather"
                color={colors.text}
                size={22}
              />
              <ThemedText type="defaultSemiBold" style={styles.actionText}>
                Save
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onShare({ url: selectedPhoto!, type: 'link' })}>
              <Icon name="link" type="feather" color={colors.text} size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                onShare({ url: reviewCardUrl!, type: 'instagram' })
              }>
              <Icon
                name="instagram"
                type="feather"
                color={colors.text}
                size={22}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="x" type="feather" color={colors.text} size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon
                name="more-horizontal"
                type="feather"
                color={colors.text}
                size={22}
              />
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

/* eslint-disable react-native/no-unused-styles */
const themedStyles = (colors: typeof Colors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors().transparent,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: colors().modalBG,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
      alignItems: 'center',
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingBottom: 10,
    },
    closeButton: {
      position: 'absolute',
      left: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
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
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginTop: 15,
    },
    actionButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center',
      backgroundColor: colors().downloadButton,
      padding: 5,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    actionText: {
      marginLeft: 5,
    },
    icon: {
      marginRight: 5,
    },
  });
/* eslint-enable react-native/no-unused-styles */
