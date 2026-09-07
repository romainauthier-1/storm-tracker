import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "../utils";

const screenWidth = Dimensions.get("window").width;

export default function WalkCard({ walk }) {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		weekday: "long",
		day: "numeric",
		month: "numeric",
		timeZone: userTimeZone,
	};

	const timeOptions = {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		timeZone: userTimeZone,
	};

	const meetingsDisplay = walk.meetings?.map((metDog, i) => {
		return (
			<View key={i}>
				<Text>Qui : {metDog.dog}</Text>
				<Text>Réaction : {metDog.reaction}</Text>
			</View>
		);
	});

	const dateToDisplay = new Date(walk.date).toLocaleDateString(
		"fr-FR",
		dateOptions,
	);

	const timeToDisplay = walk.time
		? walk.time.split(".")[0].split(":").slice(0, 2).join("h")
		: "";
	return (
		<View style={styles.card}>
			<Text style={styles.dogBadge}>{walk.dog_name}</Text>
			<Text style={styles.title}>
				{dateToDisplay} à {timeToDisplay}
			</Text>
			<Text style={styles.description}>{walk.duration} minutes</Text>
			{walk.meetings && (
				<Text style={styles.description}>{meetingsDisplay}</Text>
			)}
			<Text style={styles.description}>
				{walk.peed ? "💦" : "Pas de pipi"} |{" "}
				{walk.pooped ? "💩" : "Pas de caca"}
			</Text>
			<Text style={styles.description}>
				Humeur du chien :{" "}
				{walk.dog_mood?.length > 0
					? walk.dog_mood.map((mood) => mood).join(", ")
					: "RAS ✅"}
			</Text>
			<Text style={styles.description}>
				Humeur de l'humain :{" "}
				{walk.human_mood?.length > 0
					? walk.human_mood.map((mood) => mood).join(", ")
					: "RAS ✅"}
			</Text>
			<Text style={styles.description}>
				Autres infos :{" "}
				{walk.other?.length > 0
					? walk.other.map((other) => other).join(", ")
					: "RAS ✅"}
			</Text>
			<Text style={styles.description}>
				Coprophagie :{" "}
				{walk.coprophagie > 0 ? `${walk.coprophagie} fois` : "RAS ✅"}
			</Text>
			{walk.notes && (
				<Text style={styles.description}>
					Notes : {walk.notes ? walk.notes : "RAS ✅"}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: colors.lightGray,
		borderRadius: 15,
		padding: 10,
		width: screenWidth * 0.8,
		marginTop: 20,
		marginBottom: 20,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.primary,
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 8, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
		overflow: "visible",
	},
	title: {
		color: colors.lightGray,
		textAlign: "center",
		fontSize: 18,
	},
	dogBadge: {
		backgroundColor: colors.darkWhite,
		padding: 8,
		borderRadius: 12,
		fontSize: 20,
		transform: [{ rotate: "-90deg" }],
		position: "absolute",
		top: "35%",
		left: -25,
		zIndex: 999,
	},
	description: {
		color: colors.white,
		fontSize: 16,
		textAlign: "center",
		marginVertical: 10,
	},
});
