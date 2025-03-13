import { Colors } from "@/constants/Colors";
import { StyleSheet, StatusBar } from "react-native";

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
			paddingTop: StatusBar.currentHeight + 10,
			backgroundColor: colors().background,
		},
		Image: {
			width: 300,
			height: 300,
			borderRadius: 10,
		},
	});
