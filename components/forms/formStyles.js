import { StyleSheet } from "react-native";
import { colors } from "../../utils";
import { fontSize, radius } from "../../theme";

// Styles shared by AddDogForm and AddWalkForm.
export const formStyles = StyleSheet.create({
	form: {
		width: "100%",
		alignItems: "center",
	},
	label: {
		color: colors.primary,
		textAlign: "center",
		fontSize: fontSize.lg,
		padding: 8,
	},
	submitBtn: {
		padding: 15,
		backgroundColor: colors.primary,
		borderRadius: radius.xl,
		marginTop: 10,
	},
	submitText: {
		color: colors.white,
	},
});
