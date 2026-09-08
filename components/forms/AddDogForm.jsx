import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { dogsApi } from "../../api";
import { toLocalDateString } from "../../utils";
import { addDog } from "../../reducers/user";
import { GENDER_OPTIONS } from "../../constants/walk";
import { ChipGroup, Field } from "../ui";
import DateField from "../fields/DateField";
import { formStyles } from "./formStyles";

export default function AddDogForm({ onClose }) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.user.id);

	const [name, setName] = useState("");
	const [birth, setBirth] = useState(new Date());
	const [race1, setRace1] = useState("");
	const [race2, setRace2] = useState("");
	const [gender, setGender] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const submit = async () => {
		if (!name.trim() || !gender) {
			showMessage({
				message: "Le nom et le sexe du poilu sont obligatoires.",
				type: "warning",
			});
			return;
		}

		setIsLoading(true);
		try {
			const data = await dogsApi.create({
				name: name.trim(),
				birth_date: toLocalDateString(birth),
				race1,
				race2,
				gender,
				human: userId,
			});
			dispatch(addDog(data.savedDog));
			showMessage({ message: data.message, type: "success" });
			onClose();
		} catch (err) {
			console.error(err);
			showMessage({ message: err.message, type: "danger" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={formStyles.form}>
			<Field
				placeholder="Nom de la bestiole"
				autoCapitalize="words"
				autoCorrect={false}
				value={name}
				onChangeText={setName}
			/>
			<ChipGroup options={GENDER_OPTIONS} value={gender} onChange={setGender} />
			<Text style={formStyles.label}>Date de naissance</Text>
			<DateField
				mode="date"
				value={birth}
				maximumDate={new Date()}
				onChange={setBirth}
			/>
			<Field
				placeholder="Race"
				autoCapitalize="sentences"
				value={race1}
				onChangeText={setRace1}
			/>
			<Field
				placeholder="2ème race si croisé"
				autoCapitalize="sentences"
				value={race2}
				onChangeText={setRace2}
			/>
			<Pressable
				style={formStyles.submitBtn}
				disabled={isLoading}
				onPress={submit}
			>
				<Text style={formStyles.submitText}>
					{isLoading ? "Ajout..." : "Ajouter"}
				</Text>
			</Pressable>
		</View>
	);
}
