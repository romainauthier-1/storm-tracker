import { Pressable, StyleSheet } from "react-native";
import { Plus } from "lucide-react-native";
import { colors } from "../../utils";
import { radius, shadows } from "../../theme";

// Floating "+" action button, pinned bottom-centre above the tab bar.
// `DogScreen` and `WalkScreen` each carried a verbatim copy of this Pressable
// plus its `addBtn` / `addBtnPressed` styles.
export default function Fab({ onPress, accessibilityLabel = "Ajouter" }) {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
			onPress={onPress}
		>
			<Plus color={colors.darkWhite} size={25} />
		</Pressable>
	);
}

const base = {
	borderRadius: radius.pill,
	borderWidth: 1,
	...shadows.floating,
	padding: 10,
	position: "absolute",
	bottom: 80,
	left: "50%",
	transform: [{ translateX: -25 }],
	zIndex: 100,
};

const styles = StyleSheet.create({
	fab: {
		...base,
		backgroundColor: colors.primary,
		borderColor: colors.darkWhite,
	},
	fabPressed: {
		...base,
		backgroundColor: colors.secondary,
		borderColor: colors.white,
	},
});
