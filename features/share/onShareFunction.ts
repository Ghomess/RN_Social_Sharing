import { Alert } from 'react-native';

import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import Share, { Social } from 'react-native-share';
import { getBase64Image } from '../base64image';

interface onShareProps {
  url: string;
  type: string;
}

export const onShare = async ({ url, type }: onShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const deepLink = `rn-social-sharing://dog/${encodedUrl}`;
  const base64Image = await getBase64Image(url);
  const imageType = url.slice(-3);

  switch (type) {
    case 'download':
      try {
        // Define file path
        const filePath = `${RNFS.CachesDirectoryPath}/saved_image.png`;

        //Extract base64 data
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

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
    case 'image':
      try {
        await Share.open({
          url: base64Image,
          type: `image/${imageType}`,
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case 'link':
      try {
        await Share.open({
          url: deepLink,
          type: 'text/plain',
        });
      } catch (error) {
        console.log(error);
      }
      break;
    case 'instagram':
      console.log(url);
      try {
        await Share.shareSingle({
          social: Social.InstagramStories,
          title: 'Instagram Stories',
          message: 'Check out this cool image!',
          backgroundTopColor: '#ffffff',
          backgroundBottomColor: '#ffffff',
          stickerImage: url,
          type: `image/${imageType}`,
          appId: 'com.ghomess.rnsocialsharing',
        });
      } catch (error) {
        console.log(error);
      }
      break;
  }
};
