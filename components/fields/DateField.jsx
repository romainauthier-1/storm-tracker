import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { colors } from "../../utils";

// Cross-platform date / time field.
// This is the native implementation (iOS + Android). The web / PWA build
// resolves `DateField.web.jsx` instead, because the underlying
// `@react-native-community/datetimepicker` ships no web implementation.
//
// Props:
//   mode         "date" | "time"            (default "date")
//   value        Date                        current value
//   onChange     (next: Date) => void        called with the picked Date
//   label        string (optional)           shown above the control (Android)
//   maximumDate  Date (optional)
//   minimumDate  Date (optional)
export default function DateField({
	mode = "date",
	value,
	onChange,
	label,
	maximumDate,
	minimumDate,
}) {
	const current = value instanceof Date ? value : new Date();

	const handleChange = (event, next) => {
		if (event?.type === "dismissed" || !next) return;
		onChange(next);
	};

	// Android has no inline picker: open the platform dialog on demand.
	if (Platform.OS === "android") {
		const openPicker = () =>
			DateTimePickerAndroid.open({
				value: current,
				mode,
				is24Hour: true,
				maximumDate,
				minimumDate,
				onChange: handleChange,
			});

		const display =
			mode === "time"
				? current.toLocaleTimeString("fr-FR", {
						hour: "2-digit",
						minute: "2-digit",
					})
				: current.toLocaleDateString("fr-FR");

		return (
			<View style={styles.androidField}>
				{label ? <Text style={styles.label}>{label}</Text> : null}
				<Pressable style={styles.androidButton} onPress={openPicker}>
					<Text style={styles.androidButtonText}>{display}</Text>
				</Pressable>
			</View>
		);
	}

	// iOS: inline picker (unchanged behaviour from before the refactor).
	return (
		<RNDateTimePicker
			locale="fr-FR"
			mode={mode}
			value={current}
			maximumDate={maximumDate}
			minimumDate={minimumDate}
			onChange={handleChange}
		/>
	);
}

const styles = StyleSheet.create({
	androidField: {
		width: "100%",
		alignItems: "center",
	},
	label: {
		color: colors.primary,
		textAlign: "center",
		fontSize: 18,
		padding: 8,
	},
	androidButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.primary,
		marginVertical: 8,
	},
	androidButtonText: {
		color: colors.primary,
		fontSize: 18,
	},
});
