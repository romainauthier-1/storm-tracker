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
import { setDogs, setWalks } from "../reducers/user";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function WelcomeScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const dogs = user.dogs || [];
	const walks = user.walks || [];
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const getDogs = async (humanId) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/dogs/mydogs/${humanId}`,
			);
			const data = await response.json();

			if (data.result) {
				dispatch(setDogs(data.dogs));
				console.log("CHIENS REÇUS : ", data.dogs);
			}
		} catch (err) {
			console.error(err);
			setErrorMessage(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getDogs(user.id);
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				🤙 Salut {user.username ? capitalize(user.username) : "Invité.e"} !
			</Text>
		</View>
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
});
