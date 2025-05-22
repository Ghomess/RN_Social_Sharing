import React, { useState } from 'react';
import { StyleProp, StyleSheet, ActivityIndicator, View } from 'react-native';
import FastImage, {
  FastImageProps,
  ResizeMode,
  OnProgressEvent,
  OnLoadEvent,
  ImageStyle,
  Priority,
} from 'react-native-fast-image';

type FastImageWrapperProps = FastImageProps & {
  priority?: Priority;
  style?: StyleProp<ImageStyle>;
  loadingIndicatorColor?: string; // Optional color for the ActivityIndicator
};

export default function FastImageWrapper({
  source,
  priority = 'normal',
  defaultSource,
  style = styles.defaultStyle,
  resizeMode = FastImage.resizeMode.cover,
  onLoadStart,
  onProgress,
  onLoad,
  onError,
  onLoadEnd,
  fallback = true,
  tintColor,
  ...otherProps
}: FastImageWrapperProps) {
  const [loading, setLoading] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    onLoadStart?.();
  };

  const handleLoad = (event: OnLoadEvent) => {
    setLoading(false);
    onLoad?.(event);
  };
  const handleLoadEnd = () => {
    setLoading(false);
    onLoadEnd?.();
  };

  const sourceWithPriority = {
    ...(source as object),
    priority: priority,
  };

  return (
    <>
      <FastImage
        style={style} // Make FastImage fill the container
        source={sourceWithPriority}
        defaultSource={defaultSource}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onProgress={onProgress}
        onLoad={handleLoad}
        onError={onError}
        onLoadEnd={handleLoadEnd}
        fallback={fallback}
        tintColor={tintColor}
        {...otherProps}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    width: '100%',
    height: '100%',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
