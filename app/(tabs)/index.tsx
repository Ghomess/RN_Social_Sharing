import {
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Modal,
} from "react-native";

import { Emoji } from "@/components/Emoji";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styleComponents } from "@/styles/components";

import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";

import { fetchDogPhotos } from "@/api/fetchDogPhotos";
import { ShareablePhoto } from "@/components/ShareablePhoto";
import { onShare } from "@/features/share/onShareFunction";

export default function HomeScreen() {
	const [dogPhotos, setDogPhotos] = useState<Array<string>>([]);
	const [modal, setModal] = useState(false);
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

	useEffect(() => {
		const getDogPhotos = async () => {
			const response = await fetchDogPhotos();
			console.log("Response:", response); // Add this log
			setDogPhotos([...dogPhotos, response]);
		};
		getDogPhotos();
	}, []);

	const openModal = (photo: string) => {
		setSelectedPhoto(photo);
		setModal(true);
	};

	const closeModal = () => {
		setSelectedPhoto(null);
		setModal(false);
	};

	return (
		<SafeAreaView style={styleComponents(Colors).SafeAreaView}>
			<ScrollView
				style={styleComponents(Colors).ScrollViewContainer}
				contentContainerStyle={
					styleComponents(Colors).ScrollViewContentContainer
				}
			>
				<ThemedView style={styles(Colors).titleContainer}>
					<ThemedText type="title">Welcome!</ThemedText>
					<Emoji emoji="👋" />
				</ThemedView>

				<ShareablePhoto
					source={dogPhotos[0]}
					onPress={() => openModal(dogPhotos[0])}
				/>

				{/* Modal Implementation */}
				<Modal
					animationType="slide"
					transparent={true}
					visible={modal}
					onRequestClose={closeModal}
				>
					<ThemedView style={styles(Colors).modalOverlay}>
						<ThemedView style={styles(Colors).modalContent}>
							<TouchableOpacity
								onPress={closeModal}
								style={styles(Colors).closeButton}
							>
								<ThemedText type="title">Close</ThemedText>
							</TouchableOpacity>
							{selectedPhoto && (
								<ShareablePhoto
									source={selectedPhoto}
									onPress={() => onShare(selectedPhoto)}
								/>
							)}
						</ThemedView>
					</ThemedView>
				</Modal>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = (colors: typeof Colors) =>
	StyleSheet.create({
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
		modalOverlay: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent background
		},
		modalContent: {
			width: "80%",
			padding: 20,
			backgroundColor: colors().background, // Use your theme color
			borderRadius: 10,
			elevation: 5, // For Android shadow
		},
		closeButton: {
			alignSelf: "flex-end",
			marginBottom: 10,
		},
	});
