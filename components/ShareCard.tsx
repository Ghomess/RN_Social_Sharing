import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { onShare } from "@/features/share/onShareFunction";

export const ShareCard = ({
	visible,
	onClose,
	selectedPhoto,
}: {
	visible: boolean;
	onClose: () => void;
	selectedPhoto: string | null | undefined;
}) => {
	return (
		<Modal transparent visible={visible} animationType="slide">
			<ThemedView style={styles.overlay}>
				<ThemedView style={styles.container}>
					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<Icon name="x" type="feather" color={Colors().text} size={24} />
						</TouchableOpacity>
						<ThemedText style={styles.title}>Share</ThemedText>
					</View>

					{/* Review Card */}
					<View style={styles.reviewCard}>
						<Image
							source={{ uri: selectedPhoto ? selectedPhoto : "" }} // Replace with actual image
							style={styles.poster}
						/>
						<View style={styles.reviewContent}>
							<Text style={styles.username}>Ghomes</Text>
							<View style={styles.stars}>
								{[...Array(5)].map((_, i) => (
									<Icon
										key={i}
										name="star"
										type="font-awesome"
										color="#4CAF50"
										size={18}
										style={{ marginRight: 5 }}
									/>
								))}
								<Icon
									name="heart"
									type="font-awesome"
									color="#4CAF50"
									size={18}
								/>
							</View>
							<ThemedText style={styles.reviewText}>Cute dog</ThemedText>
						</View>
					</View>

					{/* Action Buttons */}
					<View style={styles.actions}>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() => onShare({ url: selectedPhoto!, type: "download" })}
						>
							<Icon
								name="download"
								type="feather"
								color={Colors().text}
								size={22}
							/>
							<ThemedText type="defaultSemiBold" style={styles.actionText}>
								Save
							</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() => onShare({ url: selectedPhoto!, type: "link" })}
						>
							<Icon
								name="link"
								type="feather"
								color={Colors().text}
								size={22}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionButton}
							onPress={() =>
								onShare({ url: selectedPhoto!, type: "instagram" })
							}
						>
							<Icon
								name="instagram"
								type="feather"
								color={Colors().text}
								size={22}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionButton}>
							<Icon name="x" type="feather" color={Colors().text} size={22} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionButton}>
							<Icon
								name="more-horizontal"
								type="feather"
								color={Colors().text}
								size={22}
							/>
						</TouchableOpacity>
					</View>
				</ThemedView>
			</ThemedView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
	},
	container: {
		backgroundColor: "darkslategray",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 15,
		alignItems: "center",
	},
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		paddingBottom: 10,
	},
	closeButton: {
		position: "absolute",
		left: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	reviewCard: {
		flexDirection: "row",
		backgroundColor: "#3e3e3e",
		borderRadius: 15,
		padding: 10,
		alignItems: "center",
		width: "90%",
	},
	poster: {
		width: 80,
		height: 120,
		borderRadius: 10,
	},
	reviewContent: {
		flex: 1,
		marginLeft: 10,
		alignSelf: "flex-start",
	},
	username: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	stars: {
		flexDirection: "row",

		marginVertical: 5,
	},
	reviewText: {
		color: "#fff",
		fontSize: 14,
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "90%",
		marginTop: 15,
	},
	actionButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		alignContent: "center",
		textAlign: "center",
		/* backgroundColor: "#3e3e3e", */
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		padding: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
	},
	actionText: {
		marginLeft: 5,
	},
});
