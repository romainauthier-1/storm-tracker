import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Pressable,
	KeyboardAvoidingView,
	Platform,
	Modal,
} from "react-native";
import { XCircle } from "lucide-react-native";
import { colors } from "../utils";
import { fontSize, maxContentWidth, radius } from "../theme";
import AddDogForm from "./forms/AddDogForm";
import AddWalkForm from "./forms/AddWalkForm";

// Slide-up sheet wrapping either the add-dog or the add-walk form. The form
// subtree is only mounted while the sheet is open, so its state resets on
// close (no manual reset needed).
export default function FormModal({ type, isVisible, onClose }) {
	const title =
		type === "addingDog" ? "Ajouter un poilu" : "Ajouter une balade";

	return (
		<Modal
			animationType="slide"
			transparent
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
							<View />
							<Text style={styles.title}>{title}</Text>
							<Pressable onPress={onClose}>
								<XCircle size={30} color={colors.primary} />
							</Pressable>
						</View>

						{isVisible && type === "addingDog" && (
							<AddDogForm onClose={onClose} />
						)}
						{isVisible && type === "addingWalk" && (
							<AddWalkForm onClose={onClose} />
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
	card: {
		borderRadius: radius.lg,
		padding: 10,
		width: "80%",
		maxWidth: maxContentWidth,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.lightGray,
		alignSelf: "center",
		shadowColor: colors.shadow,
		shadowOffset: { width: 10, height: 6 },
		shadowOpacity: 0.3,
		shadowRadius: 20,
		elevation: 8,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	title: {
		color: colors.primary,
		textAlign: "center",
		fontSize: fontSize.xl,
		padding: 10,
		marginBottom: 20,
	},
});
