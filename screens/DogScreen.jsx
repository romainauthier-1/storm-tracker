import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Pressable,
	Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, capitalize } from "../utils";
import { radius, screenTitle, shadows } from "../theme";
import { Plus } from "lucide-react-native";
import DogCard from "../components/DogCard";
import FormModal from "../components/FormModal";

export default function DogScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const [isAddingDog, setIsAddingDog] = useState(false);
	const user = useSelector((state) => state.user);
	const dogs = user?.dogs || [];

	const dogsToDisplay = dogs.map((dog) => <DogCard dog={dog} key={dog?.id} />);

	return (
		<KeyboardAvoidingView style={styles.container}>
			{!isAddingDog && (
				<>
					<Text style={styles.title}>
						🐶{" "}
						{dogs.length > 1
							? "Mes poilus"
							: dogs.length === 0
								? "Aucun poilu"
								: "Mon poilu"}{" "}
						{} 🐶
					</Text>
					<Text style={styles.title}>
						{dogs.length === 0 && "pour le moment"}
					</Text>
				</>
			)}

			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.dogContainer}
				showVerticalScrollIndicator={false}
			>
				{dogsToDisplay}
			</ScrollView>
			<FormModal
				type="addingDog"
				isVisible={isAddingDog}
				onClose={() => {
					setIsAddingDog(false);
				}}
			/>
			{!isAddingDog && (
				<Pressable
					style={({ pressed }) => [
						styles.addBtn,
						pressed && styles.addBtnPressed,
					]}
					onPress={() => setIsAddingDog(true)}
				>
					<Plus color={colors.darkWhite} size={25} />
				</Pressable>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		flex: 1,
		backgroundColor: colors.background,
		paddingTop: 30,
		paddingBottom: 40,
	},
	title: {
		...screenTitle,
		color: colors.darkWhite,
	},
	addBtn: {
		backgroundColor: colors.primary,
		borderRadius: radius.pill,
		borderColor: colors.darkWhite,
		borderWidth: 1,
		...shadows.floating,
		padding: 10,
		position: "absolute",
		bottom: 80,
		left: "50%",
		transform: [{ translateX: -25 }],
		zIndex: 100,
	},
	addBtnPressed: {
		backgroundColor: colors.secondary,
		borderRadius: radius.pill,
		borderColor: colors.white,
		borderWidth: 1,
		...shadows.floating,
		padding: 10,
		position: "absolute",
		bottom: 80,
		left: "50%",
		transform: [{ translateX: -25 }],
		zIndex: 100,
	},
});
