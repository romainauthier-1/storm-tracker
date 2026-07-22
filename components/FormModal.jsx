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
import { addDog, addWalk } from "../reducers/user";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function FormModal({ type, isVisible, onClose }) {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const dogs = user.dogs;

	const [isLoading, setIsLoading] = useState(false);

	// AJOUT CHIEN
	const [dogName, setDogName] = useState("");
	const [dogBirth, setDogBirth] = useState(new Date());
	const [dogRace1, setDogRace1] = useState("");
	const [dogRace2, setDogRace2] = useState("");
	const [dogGender, setDogGender] = useState("");

	const resetDogInputs = () => {
		setDogName("");
		setDogBirth(new Date());
		setDogRace1("");
		setDogRace2("");
		setDogGender("");
	};

	const possibleGenders = ["Mâle", "Femelle", "Inconnu"];

	const toggleGender = possibleGenders.map((option, i) => {
		return (
			<Pressable
				key={i}
				onPress={() => setDogGender(option)}
				style={() =>
					dogGender === option ? styles.selectedBtn : styles.unselectedBtn
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

		// console.log("--- DONNÉES ENVOYÉES ---");
		// console.log("ID HUMAIN : ", dogHumanId);
		// console.log("NOM CHIEN : ", dogName);
		// console.log("NAISSANCE CHIEN : ", dogBirth.toISOString().split("T")[0]);
		// console.log("RACE 1 : ", dogRace1);
		// console.log("RACE 2 : ", dogRace2);
		// console.log("SEXE: ", gender);
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
				resetDogInputs();
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	// AJOUT BALADE
	const [dogId, setDogId] = useState([dogs[0]?.id]);
	const [walkDate, setWalkDate] = useState(new Date());
	const [walkTime, setWalkTime] = useState(new Date());
	const [walkDuration, setWalkDuration] = useState(20);
	const [peed, setPeed] = useState(false);
	const [pooped, setPooped] = useState(false);
	const [notes, setNotes] = useState("");

	const resetWalkInputs = () => {
		setDogId([dogs[0].id]);
		setWalkDate(new Date());
		setWalkTime(new Date());
		setWalkDuration(20);
		setPeed(false);
		setPooped(false);
		setNotes("");
	};

	// PLUSIEURS CHIENS TOGGLE + USEEFFECT
	// const toggleDogs = dogs.map((dog, i) => {
	// 	return (
	// 		<Pressable
	// 			key={i}
	// 			onPress={() => setDogId((prev) => [...prev, dog.id])}
	// 			style={() =>
	// 				dogId.includes(dog.id) ? styles.selectedBtn : styles.unselectedBtn
	// 			}
	// 		>
	// 			<Text style={styles.btnText}>{dog.name}</Text>
	// 		</Pressable>
	// 	);
	// });
	// useEffect(() => {
	// 		dogs.map((dog) => setDogId((prev) => [...prev, dog.id]));
	// 	}, [isFocused]);

	const toggleDogs = dogs.map((dog, i) => {
		return (
			<Pressable
				key={i}
				onPress={() => (dogId !== dog.id ? setDogId(dog.id) : setDogId(""))}
				style={() =>
					dogId === dog.id ? styles.selectedBtn : styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{dog.name}</Text>
			</Pressable>
		);
	});

	const needs = ["Pipi", "Caca"];

	const toggleNeeds = needs.map((need, i) => {
		return (
			<Pressable
				key={i}
				onPress={() => (need === "Pipi" ? setPeed(!peed) : setPooped(!pooped))}
				style={() =>
					(need === "Pipi" && peed) || (need === "Caca" && pooped)
						? styles.selectedBtn
						: styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{need}</Text>
			</Pressable>
		);
	});

	const handleAddingWalk = async (
		dogId,
		walkDate,
		walkTime,
		walkDuration,
		peed,
		pooped,
		notes,
		humanId,
	) => {
		setIsLoading(true);

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/walks`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						walked_dog: dogId,
						date: walkDate.toISOString().split("T")[0],
						time: walkTime.toISOString().split("T")[1],
						duration: walkDuration,
						peed,
						pooped,
						notes,
						walking_human: humanId,
					}),
				},
			);

			const data = await response.json();

			if (data.result) {
				// console.log("RETOUR ADD WALK : ", data.savedWalk);
				showMessage({
					message: data.message,
					type: "success",
				});
				dispatch(addWalk(data.savedWalk));
				onClose();
				resetWalkInputs();
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
						<Text style={styles.title}>
							{type === "addingDog"
								? "Ajouter un poilu"
								: type === "addingWalk"
									? "Ajouter une balade"
									: "-"}
						</Text>
						<Pressable onPress={onClose}>
							<XCircle size={30} color={colors.primary} />
						</Pressable>
					</View>
					{type === "addingDog" && (
						<>
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
						</>
					)}
					{type === "addingWalk" && (
						<>
							<View style={styles.toggleContainer}>{toggleDogs}</View>
							<Text style={styles.label}>Date</Text>
							<DateTimePicker
								locale="fr-FR"
								mode="date"
								value={walkDate}
								onChange={(event, date) => setWalkDate(date)}
							></DateTimePicker>
							<Text style={styles.label}>Heure</Text>
							<DateTimePicker
								locale="fr-FR"
								mode="time"
								value={walkTime}
								onChange={(event, time) => setWalkTime(time)}
							></DateTimePicker>
							<TextInput
								placeholder="Durée (minutes)"
								inputMode="numeric"
								returnKeyType="next"
								style={styles.input}
								step={5}
								value={walkDuration}
								onChangeText={setWalkDuration}
							></TextInput>
							<View style={styles.toggleContainer}>{toggleNeeds}</View>
							<TextInput
								type="text"
								style={styles.input}
								placeholder="Notes"
								autoCapitalize="sentences"
								autoCorrect={true}
								value={notes}
								onChangeText={setNotes}
							></TextInput>
							<Pressable
								style={styles.addDogBtn}
								onPress={() => {
									console.log(
										`DONNÉES PRÊTES À ENVOYER : dogId = ${dogId} | walkDate = ${walkDate.toISOString().split("T")[0]} | walkTime = ${walkTime.toISOString().split("T")[1]} | walkDuration = ${walkDuration} | pipi = ${peed} | caca = ${pooped} | notes = ${notes} | humanId = ${user.id}`,
									);
									handleAddingWalk(
										dogId,
										walkDate,
										walkTime,
										walkDuration,
										peed,
										pooped,
										notes,
										user.id,
									);
								}}
							>
								<Text style={styles.btnText}>Ajouter</Text>
							</Pressable>
						</>
					)}
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
	unselectedBtn: {
		padding: 10,
		backgroundColor: colors.muted,
		borderRadius: 10,
		fontSize: 18,
	},
	selectedBtn: {
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
