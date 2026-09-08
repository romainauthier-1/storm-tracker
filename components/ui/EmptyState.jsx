import { Text, StyleSheet } from "react-native";
import { colors } from "../../utils";
import { screenTitle } from "../../theme";

// Centred "nothing here yet" message. Replaces three hand-rolled variants
// (walks list, dogs list, today's walks) that had drifted apart.
export default function EmptyState({ children, style }) {
	return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	text: {
		...screenTitle,
		color: colors.darkWhite,
	},
});
