import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleComponents = (colors: typeof Colors) =>
	StyleSheet.create({
		ScrollViewContainer: {
			flex: 1,
			backgroundColor: colors().background,
		},
		ScrollViewContentContainer: {
			alignItems: "center",
			justifyContent: "center",
			alignContent: "center",
			gap: 20,
		},
		SafeAreaView: {
			flex: 1,
			backgroundColor: colors().background,
		},
	});
