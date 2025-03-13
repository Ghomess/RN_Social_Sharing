import { Share } from "react-native";

export const onShare = async (url: string) => {
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
