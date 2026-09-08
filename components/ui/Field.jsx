import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../../utils";
import { fontSize } from "../../theme";

// Optional label + a centred underline TextInput, the shape repeated across
// the add-dog / add-walk forms. Extra props go straight to the TextInput.
export default function Field({ label, style, ...inputProps }) {
	return (
		<View style={styles.field}>
			{label ? <Text style={styles.label}>{label}</Text> : null}
			<TextInput
				placeholderTextColor={colors.primary}
				style={[styles.input, style]}
				{...inputProps}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		width: "100%",
		alignItems: "center",
	},
	label: {
		color: colors.primary,
		textAlign: "center",
		fontSize: fontSize.lg,
		padding: 8,
	},
	input: {
		color: colors.primary,
		fontSize: fontSize.lg,
		textAlign: "center",
		borderColor: colors.secondary,
		borderBottomWidth: 1,
		marginVertical: 20,
		width: "80%",
	},
});
