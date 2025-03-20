import { Alert } from 'react-native';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import Share, { Social } from 'react-native-share';

interface onShareProps {
  url: string;
  type: string;
}

export const onShare = async ({ url, type }: onShareProps) => {
  console.log('onShare: ', type);
  switch (type) {
    case 'download':
      try {
        // Define file path
        const filePath = `${RNFS.CachesDirectoryPath}/saved_image.png`;

        // Remove "data:image/png;base64," if present
        const base64Data = url.replace(/^data:image\/\w+;base64,/, '');

        // Write file to local storage
        await RNFS.writeFile(filePath, base64Data, 'base64');

        // Save to Camera Roll
        await CameraRoll.save(`file://${filePath}`, { type: 'photo' });

        Alert.alert('Success', 'Image saved to Camera Roll!');
      } catch (error) {
        console.error('Error saving image:', error);
        Alert.alert('Error', 'An error occurred while saving the image.');
      }
      break;
    case 'link':
      try {
        await Share.open({
          url: url,
          type: 'image/png',
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case 'instagram':
      console.log('instagram');
      try {
        await Share.shareSingle({
          social: Social.InstagramStories,
          stickerImage: url,
          type: 'image/png',
          appId: 'com.ghomess.rnsocialsharing',
        });
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
