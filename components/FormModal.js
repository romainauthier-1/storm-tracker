import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	Pressable,
	KeyboardAvoidingView,
	Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { showMessage, hideMessage } from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, fullCaps } from "../utils";
import { XCircle } from "lucide-react-native";
import { addDog } from "../reducers/user";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function FormModal({ type, isVisible, onClose }) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);

	const [isLoading, setIsLoading] = useState(false);

	const [dogName, setDogName] = useState("");
	const [dogBirth, setDogBirth] = useState(new Date());
	const [dogRace1, setDogRace1] = useState("");
	const [dogRace2, setDogRace2] = useState("");
	const [dogGender, setDogGender] = useState("");

	const possibleGenders = ["Mâle", "Femelle", "Inconnu"];

	const toggleGender = possibleGenders.map((option, i) => {
		return (
			<Pressable
				key={i}
				onPress={() => setDogGender(option)}
				style={() =>
					dogGender === option ? styles.selectedGenderBtn : styles.genderBtn
				}
			>
				<Text style={styles.btnText}>{option}</Text>
			</Pressable>
		);
	});

	const handleAddingDog = async (
		dogName,
		dogBirth,
		dogRace1,
		dogRace2,
		dogGender,
		dogHumanId,
	) => {
		setIsLoading(true);

		let gender;
		if (dogGender === "Mâle") {
			gender = "MALE";
		} else if (dogGender === "Femelle") {
			gender = "FEMALE";
		} else {
			gender = "INCONNU";
		}

		console.log("--- DONNÉES ENVOYÉES ---");
		console.log("ID HUMAIN : ", dogHumanId);
		console.log("NOM CHIEN : ", dogName);
		console.log("NAISSANCE CHIEN : ", dogBirth.toISOString().split("T")[0]);
		console.log("RACE 1 : ", dogRace1);
		console.log("RACE 2 : ", dogRace2);
		console.log("SEXE: ", gender);
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/dogs/`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: dogName,
						birth_date: dogBirth.toISOString().split("T")[0],
						race1: dogRace1,
						race2: dogRace2,
						gender,
						human: dogHumanId,
					}),
				},
			);
			const data = await response.json();

			if (data.result) {
				console.log(data.savedDog);
				dispatch(addDog(data.savedDog));
				showMessage({
					message: data.message,
					type: "success",
				});
				onClose();
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={styles.centeredView}>
				<View style={styles.card}>
					<View style={styles.header}>
						<View></View>
						<Text style={styles.title}>Ajouter un poilu</Text>
						<Pressable onPress={onClose}>
							<XCircle size={30} color={colors.primary} />
						</Pressable>
					</View>
					<TextInput
						type="text"
						style={styles.input}
						placeholder="Nom de la bestiole"
						autoCapitalize="words"
						autoCorrect={false}
						value={dogName}
						onChangeText={setDogName}
					></TextInput>
					<View style={styles.toggleContainer}>{toggleGender}</View>
					<Text style={styles.label}>Date de naissance</Text>
					<DateTimePicker
						locale="fr-FR"
						mode="date"
						value={dogBirth}
						onChange={(event, date) => setDogBirth(date)}
					></DateTimePicker>
					<TextInput
						type="text"
						style={styles.input}
						placeholder="Race"
						autoCapitalize="sentences"
						autoCorrect={true}
						value={dogRace1}
						onChangeText={setDogRace1}
					></TextInput>
					<TextInput
						type="text"
						style={styles.input}
						placeholder="2ème race si croisé"
						autoCapitalize="sentences"
						autoCorrect={true}
						value={dogRace2}
						onChangeText={setDogRace2}
					></TextInput>
					<Pressable
						style={styles.addDogBtn}
						onPress={() =>
							handleAddingDog(
								dogName,
								dogBirth,
								dogRace1,
								dogRace2,
								dogGender,
								user.id,
							)
						}
					>
						<Text style={styles.btnText}>Ajouter</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		borderRadius: 15,
		padding: 10,
		width: screenWidth * 0.8,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.lightGray,
		alignSelf: "center",
		shadowColor: "#000",
		shadowOffset: { width: 10, height: 6 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 8,
	},
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	title: {
		color: colors.primary,
		textAlign: "center",
		fontSize: 20,
		padding: 10,
		marginBottom: 20,
	},
	label: {
		color: colors.primary,
		textAlign: "center",
		fontSize: 18,
		padding: 8,
	},
	input: {
		color: colors.primary,
		fontSize: 18,
		textAlign: "center",
		borderColor: colors.secondary,
		borderBottomWidth: 1,
		marginVertical: 20,
		width: "80%",
	},
	toggleContainer: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-evenly",
		padding: 10,
	},
	genderBtn: {
		padding: 10,
		backgroundColor: colors.muted,
		borderRadius: 10,
		fontSize: 18,
	},
	selectedGenderBtn: {
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 10,
		fontSize: 18,
	},
	btnText: {
		color: colors.white,
	},
	addDogBtn: {
		padding: 15,
		backgroundColor: colors.primary,
		borderRadius: 20,
	},
	textBtn: {
		fontSize: 20,
		color: colors.white,
	},
});
