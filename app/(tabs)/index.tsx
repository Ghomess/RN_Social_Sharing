import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Modal,
	View,
	Button,
} from "react-native";

import { Emoji } from "@/components/Emoji";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";

import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

import { fetchDogPhotos } from "@/api/fetchDogPhotos";

import { Photo } from "@/components/Photo";
import { ShareCard } from "@/components/ShareCard";

export default function HomeScreen() {
	const [dogPhotos, setDogPhotos] = useState<Array<string>>([]);
	const [modal, setModal] = useState(false);
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

	useEffect(() => {
		const getDogPhotos = async () => {
			const response = await fetchDogPhotos();
			setDogPhotos([...dogPhotos, response]);
		};
		getDogPhotos();
	}, []);

	const openModal = (photo: string) => {
		setSelectedPhoto(photo);
		setModal(true);
	};

	const closeModal = () => {
		console.log("closeModal");
		setSelectedPhoto(null);
		setModal(false);
	};

	return (
		<SafeAreaView style={styleComponents(Colors).SafeAreaView}>
			<ThemedView style={styles(Colors).titleContainer}>
				<ThemedText type="title">Welcome!</ThemedText>
				<Emoji emoji="👋" />
			</ThemedView>
			<Photo source={dogPhotos[0]} onPress={() => openModal(dogPhotos[0])} />

			<ShareCard
				visible={modal}
				onClose={closeModal}
				selectedPhoto={selectedPhoto}
			/>
		</SafeAreaView>
	);
}

const styles = (colors: typeof Colors) =>
	StyleSheet.create({
		titleContainer: {
			flexDirection: "row",
			alignItems: "center",
		},

		modalOverlay: {
			flex: 1,
			backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
			//justifyContent: "flex-end",
			// Align content to bottom
		},
		modalContent: {
			width: "100%", // Full width of the screen
			padding: 20,
			backgroundColor: colors().background, // Use your theme color
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			elevation: 5, // For Android shadow
		},
	});
