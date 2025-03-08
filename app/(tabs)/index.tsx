import { StyleSheet, Platform, ScrollView, SafeAreaView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";

import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
	return (
		<SafeAreaView style={styleComponents(Colors).SafeAreaView}>
			<ScrollView
				style={styleComponents(Colors).ScrollViewContainer}
				contentContainerStyle={
					styleComponents(Colors).ScrollViewContentContainer
				}
			>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Welcome!</ThemedText>
					<HelloWave />
				</ThemedView>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
