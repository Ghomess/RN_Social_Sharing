import {
	StyleSheet,
	Platform,
	ScrollView,
	SafeAreaView,
	Linking,
	Share,
} from "react-native";

import { Emoji } from "@/components/Emoji";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";

import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { ThemedButton } from "@/components/ThemedButton";
import { fetchDogPhotos } from "@/api/fetchDogPhotos";
import { ShareablePhoto } from "@/components/ShareablePhoto";

const url = "https://www.google.com";

export default function HomeScreen() {
	const [dogPhotos, setDogPhotos] = useState<Array<string>>([]);

	const getDogPhoto = async () => {
		const response = await fetchDogPhotos();
		console.log("Response:", response); // Add this log
		setDogPhotos([...dogPhotos, response]);
	};

	useEffect(() => {
		const getDogPhotos = async () => {
			const response = await fetchDogPhotos();
			console.log("Response:", response); // Add this log
			setDogPhotos([...dogPhotos, response]);
		};
		getDogPhotos();
	}, []);

	useEffect(() => {
		console.log("dogPhotos:", dogPhotos[0]);
	}, [dogPhotos]);

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
					<Emoji emoji="👋" />
				</ThemedView>
				<ShareablePhoto source={dogPhotos[0]} />
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
