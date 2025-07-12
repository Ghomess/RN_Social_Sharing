import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  ActivityIndicator,
  View,
  InteractionManager,
} from 'react-native';
import FastImage, {
  FastImageProps,
  ImageStyle,
  Priority,
} from 'react-native-fast-image';

import { Colors } from '@/constants/Colors';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useRenderTiming } from '@/hooks/useRenderTiming';
/* import { Image, ImageProps, ImageStyle } from 'expo-image'; */

type FastImageWrapperProps = FastImageProps /* ImageProps */ & {
  index: number;
  priority?: Priority /* string */;
  debugLabel?: string;
  style?: StyleProp<ImageStyle>;
  loadingIndicatorColor?: string;
};

export default function FastImageWrapper({
  index,
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
  const colors = Colors();
  const [loading, setLoading] = useState(true);
  const [loadStartTime, setLoadStartTime] = useState<number | null>(null);

  const handleLoadStart = useCallback(() => {
    setLoadStartTime(Date.now());
    setLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);

  useRenderTiming('FastImageWrapper');
  useLayoutEffect(() => {
    if (loading) {
      const start = performance.now();
      requestAnimationFrame(() => {
        const time = performance.now() - start;
        console.log(
          `⏳ Skeleton appeared in ${time.toFixed(2)} ms, index: ${index}`
        );
      });
    }
  }, [loading]);

  const handleError = useCallback(() => {
    setLoading(false);
    onError?.();
  }, [onError]);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  const sourceWithPriority = useMemo(
    () => ({
      ...(source as object),
      priority,
    }),
    [source, priority]
  );

  const SkeletonComponent = useMemo(() => {
    return (
      loading && (
        <SkeletonPlaceholder
          backgroundColor={colors.tabIconSelected}
          highlightColor={colors.shareOptionsBG}
          speed={1000}
          direction="right">
          <SkeletonPlaceholder.Item width={'100%'} height={'100%'} />
        </SkeletonPlaceholder>
      )
    );
  }, [loading]);

  return (
    <View style={styles.defaultContainer}>
      {SkeletonComponent}
      <FastImage
        style={loading ? styles.hiddenImage : style}
        source={sourceWithPriority}
        defaultSource={defaultSource}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onProgress={onProgress}
        onLoad={onLoad}
        onError={handleError}
        onLoadEnd={handleLoadEnd}
        fallback={fallback}
        tintColor={tintColor}
        {...otherProps}
      />
      {/* <Image
        source={source.uri}
        style={loading ? styles.hiddenImage : style}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...otherProps}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    overflow: 'hidden',
  },
  defaultStyle: {
    width: '100%',
    height: '100%',
  },
  hiddenImage: {
    opacity: 0,
    position: 'absolute',
  },
});
