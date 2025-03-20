import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
	const colors = Colors();

	return (
		<View
			style={[{ backgroundColor: colors.background }, style]}
			{...otherProps}
		/>
	);
}
