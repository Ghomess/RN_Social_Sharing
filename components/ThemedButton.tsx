import { StyleSheet, Pressable, type PressableProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

export type ThemedViewProps = PressableProps & {
	text: string;
};

export function ThemedButton({ style, text, ...otherProps }: ThemedViewProps) {
	const colors = Colors();

	const [pressed, setPressed] = useState(false);

	return (
		<Pressable
			style={({ pressed }) => ({
				...(pressed
					? { backgroundColor: colors.buttonSelected }
					: { backgroundColor: colors.buttonDefault }),
				...styles(Colors).container,
			})}
			onPressIn={() => setPressed(true)}
			onPressOut={() => setPressed(false)}
			{...otherProps}
		>
			<ThemedText
				style={{
					backgroundColor: pressed
						? colors.buttonSelected
						: colors.buttonDefault,
					...styles(Colors).text,
				}}
			>
				{text}
			</ThemedText>
		</Pressable>
	);
}

const styles = (colors: typeof Colors) =>
	StyleSheet.create({
		container: {
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 10,
		},
		text: {
			padding: 10,
			color: colors().text,
		},
	});
