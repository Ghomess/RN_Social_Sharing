import { Image, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedButton } from "./ThemedButton";
import { styleComponents } from "@/styles/components";
import { Colors } from "@/constants/Colors";
import { Emoji } from "./Emoji";

export const Photo = ({
	source,
	onPress,
}: {
	source: string;
	onPress: () => void;
}) => {
	return (
		<ThemedView
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				alignContent: "center",
				alignSelf: "center",
				backgroundColor: Colors().background,
			}}
		>
			<ThemedView style={styles.container}>
				<Image source={{ uri: source }} style={styleComponents(Colors).Image} />
				<ThemedButton onPress={onPress} style={styles.share}>
					<Emoji emoji="🔗" emojiStyle={{ fontSize: 25, padding: 10 }} />
				</ThemedButton>
			</ThemedView>
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
	share: {
		position: "absolute",
		top: 0,
		right: 0,
	},
});
