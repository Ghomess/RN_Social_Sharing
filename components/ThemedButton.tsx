import {
  StyleSheet,
  Pressable,
  type PressableProps,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/Colors';

interface ThemedButtonProps extends PressableProps {
  style?: ViewStyle;
}

export function ThemedButton({ style, ...otherProps }: ThemedButtonProps) {
  const colors = Colors();

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.container,
        ...(style || {}), // Spread the passed style if it exists
        backgroundColor: pressed ? colors.buttonSelected : colors.buttonDefault,
      })}
      {...otherProps}>
      {otherProps.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 10,
  },
});
