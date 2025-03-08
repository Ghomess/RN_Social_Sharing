import {
	StyleSheet,
	Image,
	Platform,
	ScrollView,
	SafeAreaView,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";
import { Colors } from "@/constants/Colors";

export default function TabTwoScreen() {
	return (
		<SafeAreaView style={styleComponents(Colors).SafeAreaView}>
			<ScrollView
				style={styleComponents(Colors).ScrollViewContainer}
				contentContainerStyle={
					styleComponents(Colors).ScrollViewContentContainer
				}
			>
				<ThemedView style={styles.titleContainer}>
					<ThemedText type="title">Explore</ThemedText>
				</ThemedView>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headerImage: {
		color: "#808080",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
	},
});
