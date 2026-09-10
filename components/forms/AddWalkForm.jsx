import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { walksApi } from "../../api";
import { toLocalDateString, toLocalTimeString } from "../../utils";
import { addWalk } from "../../reducers/user";
import {
	COPROPHAGIE_OPTIONS,
	DOG_MOOD_OPTIONS,
	HUMAN_MOOD_OPTIONS,
	NEEDS_OPTIONS,
	OTHER_OPTIONS,
} from "../../constants/walk";
import { ChipGroup, Field } from "../ui";
import DateField from "../fields/DateField";
import OptionPickerModal from "./OptionPickerModal";
import { formStyles } from "./formStyles";

export default function AddWalkForm({ onClose }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const dogs = user.dogs;

	const [dogId, setDogId] = useState(dogs[0]?.id ?? "");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [duration, setDuration] = useState("20");
	const [peed, setPeed] = useState(false);
	const [pooped, setPooped] = useState(false);
	const [notes, setNotes] = useState("");
	const [dogMood, setDogMood] = useState([]);
	const [humanMood, setHumanMood] = useState([]);
	const [other, setOther] = useState([]);
	const [coprophagie, setCoprophagie] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const needs = [peed && "peed", pooped && "pooped"].filter(Boolean);
	const setNeeds = (next) => {
		setPeed(next.includes("peed"));
		setPooped(next.includes("pooped"));
	};

	const dogOptions = dogs.map((dog) => ({ value: dog.id, label: dog.name }));

	const submit = async () => {
		if (!dogId) {
			showMessage({ message: "Choisis un poilu.", type: "warning" });
			return;
		}
		if (!(Number(duration) > 0)) {
			showMessage({
				message: "Indique une durée en minutes.",
				type: "warning",
			});
			return;
		}

		setIsLoading(true);
		try {
			const data = await walksApi.create({
				walked_dog: dogId,
				date: toLocalDateString(date),
				time: toLocalTimeString(time),
				duration: Number(duration),
				peed,
				pooped,
				notes,
				walking_human: user.id,
				dog_mood: dogMood,
				human_mood: humanMood,
				other,
				coprophagie: coprophagie,
			});
			dispatch(addWalk(data.savedWalk));
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
			<ChipGroup options={dogOptions} value={dogId} onChange={setDogId} />

			<Text style={formStyles.label}>Date</Text>
			<DateField
				mode="date"
				value={date}
				maximumDate={new Date()}
				onChange={setDate}
			/>
			<Text style={formStyles.label}>Heure</Text>
			<DateField mode="time" value={time} onChange={setTime} />

			<Field
				placeholder="Durée (minutes)"
				inputMode="numeric"
				returnKeyType="next"
				value={duration}
				onChangeText={setDuration}
			/>

			<ChipGroup
				options={NEEDS_OPTIONS}
				value={needs}
				onChange={setNeeds}
				multiple
			/>

			<OptionPickerModal
				label="Humeur du poilu"
				options={DOG_MOOD_OPTIONS}
				value={dogMood}
				onChange={setDogMood}
				multiple
			/>
			<OptionPickerModal
				label="Humeur de l'humain"
				options={HUMAN_MOOD_OPTIONS}
				value={humanMood}
				onChange={setHumanMood}
				multiple
			/>
			<OptionPickerModal
				label="Autres infos"
				options={OTHER_OPTIONS}
				value={other}
				onChange={setOther}
				multiple
			/>
			<OptionPickerModal
				label="Coprophagie"
				options={COPROPHAGIE_OPTIONS}
				value={coprophagie}
				onChange={setCoprophagie}
			/>

			<Field
				placeholder="Notes"
				returnKeyType="send"
				textAlignVertical="top"
				autoCapitalize="sentences"
				value={notes}
				onChangeText={setNotes}
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
