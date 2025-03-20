/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { useColorScheme } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const colors = {
	light: {
		text: "#11181C",
		background: "#fff",
		tint: "#34C759",
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: "#34C759",
		buttonDefault: "#687076",
		buttonSelected: "#34C759",
		dogBreedHighlight: "#F7D2C4",
		photoOverlay: "#333333",
		shareButton: "#4CAF50",
		modalBG: "#fff",
		shareOptionsBG: "#fff",
	},

	dark: {
		text: "#ECEDEE",
		background: "#11181C",
		tint: "#8BC34A",
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: "#8BC34A",
		buttonDefault: "#9BA1A6",
		buttonSelected: "#8BC34A",
		buttonTextDefault: "#ECEDEE",
		buttonTextSelected: "#8BC34A",
		dogBreedHighlight: "#FFC080",
		photoOverlay: "#666666",
		shareButton: "#3E8E41",
		modalBG: "#11181C",
		shareOptionsBG: "#333333",
	},
};

export const Colors = () => {
	const theme = useColorScheme() ?? "light";

	return colors[theme];
};
