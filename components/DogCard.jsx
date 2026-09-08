import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, minimize } from "../utils";
import { fontSize, maxContentWidth, radius, shadows } from "../theme";

export default function DogCard({ dog }) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		day: "numeric",
		year: "numeric",
		month: "long",
		timeZone: userTimeZone,
	};

	return (
		<View style={styles.card}>
			<Text style={styles.title}>{dog.name}</Text>
			<Text style={styles.description}>
				{dog.gender === "MALE"
					? `Mâle`
					: dog.gender === "INCONNU"
						? "Sexe inconnu"
						: `Femelle`}
			</Text>
			<Text style={styles.description}>
				{dog.race2 ? `Croisé ${dog.race1} / ${dog.race2}` : dog.race1}
			</Text>
			<Text style={styles.description}>
				{dog.gender === "MALE"
					? `Né le ${new Date(dog.birth_date).toLocaleDateString("fr-FR", dateOptions)}`
					: `Née le ${new Date(dog.birth_date).toLocaleDateString("fr-FR", dateOptions)}`}
			</Text>
		</View>
	);
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
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.primary,
		alignSelf: "center",
		...shadows.card,
	},
	title: {
		color: colors.lightGray,
		textAlign: "center",
		fontSize: fontSize.lg,
	},
	description: {
		color: colors.white,
		fontSize: fontSize.md,
		textAlign: "center",
		marginVertical: 10,
	},
});
