import { StyleSheet, Pressable, type PressableProps } from 'react-native';

import { Colors } from '@/constants/Colors';

export function ThemedButton({ style, ...otherProps }: PressableProps) {
  const colors = Colors();

  return (
    <Pressable
      style={({ pressed }) => ({
        ...styles.container,
        backgroundColor: pressed ? colors.buttonSelected : colors.buttonDefault,
        style, // Modified line
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
