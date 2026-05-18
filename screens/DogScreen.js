import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Pressable,
	Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, capitalize } from "../utils";
import { Plus } from "lucide-react-native";
import DogCard from "../components/DogCard";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function DogScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const dogs = useSelector((state) => state.user.dogs);

	const dogsToDisplay = dogs.map((dog) => <DogCard dog={dog} key={dog.id} />);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<Text style={styles.title}>
				🐶 {dogs.length > 1 ? "Mes poilus" : "Mon poilu"} 🐶
			</Text>

			<View style={styles.dogsContainer}>{dogsToDisplay}</View>
			<Pressable
				style={({ pressed }) => [
					styles.addBtn,
					pressed && styles.addBtnPressed,
				]}
			>
				<Plus color={colors.darkWhite} size={25} />
			</Pressable>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1,
		backgroundColor: colors.background,
	},
	title: {
		fontSize: 30,
		color: colors.darkWhite,
		fontWeight: "bold",
		letterSpacing: 2,
	},
	addBtn: {
		backgroundColor: colors.primary,
		borderRadius: 25,
		borderColor: colors.darkWhite,
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
		padding: 15,
	},
	addBtnPressed: {
		backgroundColor: colors.secondary,
		borderRadius: 25,
		borderColor: colors.white,
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
		padding: 15,
	},
});
