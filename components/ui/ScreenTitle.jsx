import { Text, StyleSheet } from "react-native";
import { colors } from "../../utils";
import { screenTitle } from "../../theme";

// The big heading at the top of a screen ("Mes poilus", "Salut …", …).
// The same style block was repeated in four screens.
export default function ScreenTitle({ children, style }) {
	return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
	title: {
		...screenTitle,
		color: colors.darkWhite,
	},
});
