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
import { colors } from "../utils";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function WalkCard({ walk }) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const dogs = user.dogs;

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		weekDay: "long",
		day: "numeric",
		year: "numeric",
		month: "long",
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
	return (
		<View style={styles.card}>
			<Text style={styles.title}>
				{new Date(walk.date).toLocaleString("fr-FR", dateOptions)} à {walk.time}
			</Text>
			<Text style={styles.description}>Durée : {walk.duration} minutes</Text>
			{walk.meetings && (
				<Text style={styles.description}>{walk.meetingsDisplay}</Text>
			)}
			<Text style={styles.description}>
				A fait pipi : {walk.peed ? "Oui" : "Non"}
			</Text>
			<Text style={styles.description}>
				A fait caca : {walk.pooped ? "Oui" : "Non"}
			</Text>
			<Text style={styles.description}>
				Notes : {walk.notes ? walk.notes : "Aucune note"}
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
