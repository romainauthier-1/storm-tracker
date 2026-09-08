import { Text, StyleSheet } from "react-native";
import { colors } from "../utils";
import { fontSize, radius } from "../theme";
import { formatWalkDate, formatWalkTime, listOrRAS } from "../lib/format";
import { Card, CardText, CardTitle } from "./ui";

export default function WalkCard({ walk }) {
	return (
		<Card>
			<Text style={styles.dogBadge}>{walk.dog_name}</Text>
			<CardTitle>
				{formatWalkDate(walk.date)} à {formatWalkTime(walk.time)}
			</CardTitle>
			<CardText>{walk.duration} minutes</CardText>
			<CardText>
				{walk.peed ? "💦" : "Pas de pipi"} |{" "}
				{walk.pooped ? "💩" : "Pas de caca"}
			</CardText>
			<CardText>Humeur du chien : {listOrRAS(walk.dog_mood)}</CardText>
			<CardText>Humeur de l'humain : {listOrRAS(walk.human_mood)}</CardText>
			<CardText>Autres infos : {listOrRAS(walk.other)}</CardText>
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
