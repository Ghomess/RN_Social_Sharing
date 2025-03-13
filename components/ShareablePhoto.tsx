import { Image, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedButton } from "./ThemedButton";
import { onShare } from "@/features/share/onShareFunction";
import { styleComponents } from "@/styles/components";
import { Colors } from "@/constants/Colors";
import { Emoji } from "./Emoji";

export const ShareablePhoto = ({ source }: { source: string }) => {
	console.log("Source:", source);
	return (
		<ThemedView style={styles.container}>
			<Image source={{ uri: source }} style={styleComponents(Colors).Image} />
			<ThemedButton onPress={() => onShare(source)} style={styles.button}>
				<Emoji emoji="🔗" emojiStyle={{ fontSize: 25, padding: 10 }} />
			</ThemedButton>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		borderRadius: 10,
	},
	button: {
		position: "absolute",
		top: 0,
		right: 0,
	},
});
