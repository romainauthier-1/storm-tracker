import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	Pressable,
	KeyboardAvoidingView,
	ActivityIndicator,
	Platform,
	Modal,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import DateField from "./fields/DateField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, toLocalDateString, toLocalTimeString } from "../utils";
import { XCircle } from "lucide-react-native";
import { addDog, addWalk } from "../reducers/user";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function FormModal({ type, isVisible, onClose }) {
	const dispatch = useDispatch();
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
						birth_date: toLocalDateString(dogBirth),
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
	const [dogMood, setDogMood] = useState([]);
	const [humanMood, setHumanMood] = useState([]);
	const [other, setOther] = useState([]);
	const [coprophagie, setCoprophagie] = useState("");

	const [dogMoodVisible, setDogMoodVisible] = useState(false);
	const [humanMoodVisible, setHumanMoodVisible] = useState(false);
	const [otherVisible, setOtherVisible] = useState(false);
	const [coprophagieVisible, setCoprophagieVisible] = useState(false);

	const dogMoodOptions = [
		"Flemme",
		"Joyeux",
		"Excité",
		"Stressé",
		"Fatigué",
		"Sociable",
		"Attentif",
		"Distrait",
		"Vigilant",
		"Tranquille",
		"Dynamique",
	];
	const humanMoodOptions = [
		"Flemme",
		"Triste",
		"Pressé",
		"Agacé",
		"Fatigué",
		"Normal",
		"En forme",
		"Motivé",
		"Bonne composition",
	];
	const otherOptions = [
		"Accident urine",
		"Accident selles",
		"Accident selles + urine",
		"Destruction",
		"Vomi",
		"Selles molles",
		"Diarrhée",
		"Glaires dans les selles",
		"A mangé (non identifié)",
		"A mangé (identifié)",
	];
	const coprophagieOptions = [0, 1, 2, 3, 4];

	const resetWalkInputs = () => {
		setDogId([dogs[0].id]);
		setWalkDate(new Date());
		setWalkTime(new Date());
		setWalkDuration(20);
		setPeed(false);
		setPooped(false);
		setNotes("");
		setDogMood([]);
		setHumanMood([]);
		setOther([]);
		setCoprophagie("");
	};

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

	const toggleDogMood = dogMoodOptions.map((mood, i) => {
		return (
			<Pressable
				key={i}
				onPress={() =>
					dogMood.includes(mood)
						? setDogMood((prev) =>
								prev.filter((moodValue) => moodValue !== mood),
							)
						: setDogMood((prev) => [...prev, mood])
				}
				style={() =>
					dogMood.includes(mood) ? styles.selectedBtn : styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{mood}</Text>
			</Pressable>
		);
	});

	const toggleHumanMood = humanMoodOptions.map((mood, i) => {
		return (
			<Pressable
				key={i}
				onPress={() =>
					humanMood.includes(mood)
						? setHumanMood((prev) =>
								prev.filter((moodValue) => moodValue !== mood),
							)
						: setHumanMood((prev) => [...prev, mood])
				}
				style={() =>
					humanMood.includes(mood) ? styles.selectedBtn : styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{mood}</Text>
			</Pressable>
		);
	});

	const toggleOther = otherOptions.map((otherOption, i) => {
		return (
			<Pressable
				key={i}
				onPress={() =>
					other.includes(otherOption)
						? setOther((prev) =>
								prev.filter((option) => option !== otherOption),
							)
						: setOther((prev) => [...prev, otherOption])
				}
				style={() =>
					other.includes(otherOption)
						? styles.selectedBtn
						: styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{otherOption}</Text>
			</Pressable>
		);
	});

	const toggleCoprophagie = coprophagieOptions.map((option, i) => {
		const displayOption = () => {
			switch (option) {
				case 0:
					return "Non";
				case 1:
					return "1 fois";
				case 2:
					return "2 fois";
				case 3:
					return "3 fois";
				case 4:
					return "4 fois ou +";
				default:
					return option;
			}
		};
		return (
			<Pressable
				key={i}
				onPress={() => setCoprophagie(option)}
				style={() =>
					coprophagie === option ? styles.selectedBtn : styles.unselectedBtn
				}
			>
				<Text style={styles.btnText}>{displayOption()}</Text>
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

	const modalConfig = [
		{
			key: "dogMood",
			label: "Humeur du poilu",
			visible: dogMoodVisible,
			setVisible: setDogMoodVisible,
			options: toggleDogMood,
		},
		{
			key: "humanMood",
			label: "Humeur de l'humain",
			visible: humanMoodVisible,
			setVisible: setHumanMoodVisible,
			options: toggleHumanMood,
		},
		{
			key: "other",
			label: "Autres infos",
			visible: otherVisible,
			setVisible: setOtherVisible,
			options: toggleOther,
		},
		{
			key: "coprophagie",
			label: "Coprophagie",
			visible: coprophagieVisible,
			setVisible: setCoprophagieVisible,
			options: toggleCoprophagie,
		},
	];

	const allModals = () =>
		modalConfig.map(({ key, label, visible, setVisible, options }) => (
			<View key={key} style={styles.modalRow}>
				<Pressable style={styles.outlineBtn} onPress={() => setVisible(true)}>
					<Text style={{ color: colors.primary }}>{label}</Text>
				</Pressable>
				<Modal
					animationType="fade"
					transparent={false}
					visible={visible}
					onRequestClose={() => setVisible(false)}
					style={{
						borderRadius: 15,
						width: screenWidth * 0.8,
						maxHeight: screenHeight * 0.6,
						marginVertical: "auto",
						alignSelf: "center",
					}}
				>
					<View style={styles.optionSheet}>
						<XCircle
							size={30}
							color={colors.destructive}
							onPress={() => setVisible(false)}
							style={{ alignSelf: "flex-end" }}
						/>
						<Text style={styles.title}>{label}</Text>
						<ScrollView
							contentContainerStyle={styles.optionSheetContent}
							showsVerticalScrollIndicator={false}
						>
							{options}
						</ScrollView>
					</View>
				</Modal>
			</View>
		));

	const handleAddingWalk = async (
		dogId,
		walkDate,
		walkTime,
		walkDuration,
		peed,
		pooped,
		notes,
		humanId,
		dogMood,
		humanMood,
		other,
		coprophagie,
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
						date: toLocalDateString(walkDate),
						time: toLocalTimeString(walkTime),
						duration: Number(walkDuration) || 0,
						peed,
						pooped,
						notes,
						walking_human: humanId,
						dog_mood: dogMood,
						human_mood: humanMood,
						other,
						coprophagie: coprophagie === "" ? null : coprophagie,
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
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					style={styles.flex}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
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
							<Pressable onPress={onClose} disabled={isLoading}>
								<XCircle size={30} color={colors.primary} />
							</Pressable>
						</View>
						{isLoading && (
							<ActivityIndicator size="small" color={colors.primary} />
						)}
						{type === "addingDog" && (
							<View style={styles.form}>
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
								<DateField
									mode="date"
									value={dogBirth}
									maximumDate={new Date()}
									onChange={setDogBirth}
								/>
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
						)}
						{type === "addingWalk" && (
							<View style={styles.form}>
								<View style={styles.toggleContainer}>{toggleDogs}</View>
								<Text style={styles.label}>Date</Text>
								<DateField
									mode="date"
									value={walkDate}
									maximumDate={new Date()}
									onChange={setWalkDate}
								/>
								<Text style={styles.label}>Heure</Text>
								<DateField
									mode="time"
									value={walkTime}
									onChange={setWalkTime}
								/>
								<TextInput
									placeholder="Durée (minutes)"
									placeholderTextColor={colors.primary}
									inputMode="numeric"
									returnKeyType="next"
									style={styles.input}
									step={5}
									value={walkDuration}
									onChangeText={setWalkDuration}
								></TextInput>

								<View style={styles.toggleContainer}>{toggleNeeds}</View>

								<View style={styles.toggleContainer}>{allModals()}</View>

								<TextInput
									type="text"
									style={styles.input}
									placeholder="Notes"
									placeholderTextColor={colors.primary}
									returnKeyType="send"
									textAlignVertical="top"
									autoCapitalize="sentences"
									autoCorrect={true}
									value={notes}
									onChangeText={setNotes}
								></TextInput>
								<Pressable
									style={styles.addDogBtn}
									disabled={isLoading}
									onPress={() => {
										console.log(
											`DONNÉES PRÊTES À ENVOYER : dogId = ${dogId} | walkDate = ${toLocalDateString(walkDate)} | walkTime = ${toLocalTimeString(walkTime)} | walkDuration = ${walkDuration} | pipi = ${peed} | caca = ${pooped} | notes = ${notes} | humanId = ${user.id} | dogMood = ${dogMood} | humanMood = ${humanMood} | other = ${other} | coprophagie = ${coprophagie}`,
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
											dogMood,
											humanMood,
											other,
											coprophagie,
										);
									}}
								>
									<Text style={styles.btnText}>
										{isLoading ? "Ajout..." : "Ajouter"}
									</Text>
								</Pressable>
							</View>
						)}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40,
	},
	form: {
		width: "100%",
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
		flexWrap: "wrap",
		gap: 10,
		alignItems: "center",
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
	outlineBtn: {
		padding: 10,
		backgroundColor: colors.lightGray,
		borderRadius: 10,
		fontSize: 18,
		borderWidth: 1,
		borderColor: colors.primary,
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
	modalRow: {
		width: "100%",
		alignItems: "center",
		marginVertical: 6,
	},
	optionSheet: {
		flex: 1,
		backgroundColor: colors.lightGray,
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 20,
	},
	optionSheetContent: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingVertical: 20,
	},
});
