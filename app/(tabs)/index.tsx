import {
	StyleSheet,
	Platform,
	ScrollView,
	SafeAreaView,
	Linking,
	Share,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";

import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";

const url = "https://www.google.com";

const onShare = async () => {
	try {
		const result = await Share.share({ message: "Google: " + "\n" + url });
		if (result.action === Share.sharedAction) {
			if (result.activityType) {
				console.log("result.activityType: ", result.activityType);
			} else {
				console.log("shared");
			}
		} else if (result.action === Share.dismissedAction) {
			console.log("dismissed");
		}
	} catch (error) {
		console.log(error);
	}
};

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
				<ThemedView style={styles.titleContainer}>
					<ThemedButton onPress={onShare} text="Press to Share" />
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
