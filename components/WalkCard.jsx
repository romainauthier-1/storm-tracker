import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils";
import { fontSize, radius } from "../theme";
import { Card, CardText, CardTitle } from "./ui";

export default function WalkCard({ walk }) {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		weekday: "long",
		day: "numeric",
		month: "numeric",
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
		<Card>
			<Text style={styles.dogBadge}>{walk.dog_name}</Text>
			<CardTitle>
				{dateToDisplay} à {timeToDisplay}
			</CardTitle>
			<CardText>{walk.duration} minutes</CardText>
			{walk.meetings && <CardText>{meetingsDisplay}</CardText>}
			<CardText>
				{walk.peed ? "💦" : "Pas de pipi"} |{" "}
				{walk.pooped ? "💩" : "Pas de caca"}
			</CardText>
			<CardText>
				Humeur du chien :{" "}
				{walk.dog_mood?.length > 0
					? walk.dog_mood.map((mood) => mood).join(", ")
					: "RAS ✅"}
			</CardText>
			<CardText>
				Humeur de l'humain :{" "}
				{walk.human_mood?.length > 0
					? walk.human_mood.map((mood) => mood).join(", ")
					: "RAS ✅"}
			</CardText>
			<CardText>
				Autres infos :{" "}
				{walk.other?.length > 0
					? walk.other.map((other) => other).join(", ")
					: "RAS ✅"}
			</CardText>
			<CardText>
				Coprophagie :{" "}
				{walk.coprophagie > 0 ? `${walk.coprophagie} fois` : "RAS ✅"}
			</CardText>
			{walk.notes && <CardText>Notes : {walk.notes}</CardText>}
		</Card>
	);
}

const styles = StyleSheet.create({
	dogBadge: {
		backgroundColor: colors.darkWhite,
		padding: 8,
		borderRadius: radius.md,
		fontSize: fontSize.xl,
		transform: [{ rotate: "-90deg" }],
		position: "absolute",
		top: "35%",
		left: -25,
		zIndex: 999,
	},
});
