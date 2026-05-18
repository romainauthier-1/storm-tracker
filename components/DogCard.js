import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	Pressable,
	KeyboardAvoidingView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, minimize } from "../utils";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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
				{dog.gender === "MALE" ? `Mâle` : `Femelle`}
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
	},
	title: {
		color: colors.lightGray,
		textAlign: "center",
		fontSize: 18,
	},
	description: {
		color: colors.white,
		fontSize: 16,
		textAlign: "center",
		marginVertical: 10,
	},
});
