import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../utils";
import { fontSize, maxContentWidth, radius, shadows } from "../../theme";

// Rounded content card used for one dog / one walk. `DogCard` and `WalkCard`
// had a byte-for-byte copy of these `card` / `title` / `description` styles.
export default function Card({ children, style }) {
	return <View style={[styles.card, style]}>{children}</View>;
}

export function CardTitle({ children, style }) {
	return <Text style={[styles.title, style]}>{children}</Text>;
}

export function CardText({ children, style }) {
	return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 1,
		borderColor: colors.lightGray,
		borderRadius: radius.lg,
		padding: 10,
		width: "80%",
		maxWidth: maxContentWidth,
		marginTop: 20,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.primary,
		alignSelf: "center",
		// keep the rotated dog badge in WalkCard visible outside the card box
		overflow: "visible",
		...shadows.card,
	},
	title: {
		color: colors.lightGray,
		textAlign: "center",
		fontSize: fontSize.lg,
	},
	text: {
		color: colors.white,
		fontSize: fontSize.md,
		textAlign: "center",
		marginVertical: 10,
	},
});
