import { StyleSheet, Pressable, type PressableProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

export function ThemedButton({ style, ...otherProps }: PressableProps) {
	const colors = Colors();

	const [pressed, setPressed] = useState(false);

	return (
		<Pressable
			style={({ pressed }) => [
				styles(Colors).container,
				{
					backgroundColor: pressed
						? colors.buttonSelected
						: colors.buttonDefault,
				},
				style,
			]}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			{...otherProps}
		>
			{otherProps.children}
		</Pressable>
	);
}

const styles = (colors: typeof Colors) =>
	StyleSheet.create({
		container: {
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 100,
			margin: 10,
		},
	});
