import { StyleSheet, type TextStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

interface EmojiProps {
  emoji: string;
  emojiStyle?: TextStyle;
}

export function Emoji({ emoji, ...props }: EmojiProps) {
  /* const rotationAnimation = useSharedValue(0);

	useEffect(() => {
		rotationAnimation.value = withRepeat(
			withSequence(
				withTiming(25, { duration: 150 }),
				withTiming(0, { duration: 150 }),
			),
			4, // Run the animation 4 times
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotationAnimation.value}deg` }],
	})); */

  return (
    <>
      {/* <Animated.View style={animatedStyle}>
			<ThemedText style={[styles.text, props?.emojiStyle]}>{emoji}</ThemedText>
		</Animated.View> */}

      <ThemedText style={[styles.text, props?.emojiStyle]}>{emoji}</ThemedText>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
  },
});
