import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TextInput,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Pressable,
	Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, capitalize } from "../utils";
import { setWalks, addWalk } from "../reducers/user";
import FormModal from "../components/FormModal";
import WalkCard from "../components/WalkCard";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function WalkScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const dogs = user.dogs;
	const walks = user.walks;

	const [isLoading, setIsLoading] = useState(false);
	const [isAddingWalk, setIsAddingWalk] = useState(false);

	const getWalks = async (humanId) => {
		setIsLoading(true);

		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/walks`,
			);
			const data = await response.json();

			if (data.result) {
				dispatch(setWalks(data.allWalks));
				console.log("BALADES REÇUES : ", data.allWalks);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getWalks(user.id);
	}, [isFocused]);

	const walksDisplay = walks.map((walk, i) => {
		return <WalkCard key={i} walk={walk} />;
	});

	return (
		<View style={styles.container}>
			<FormModal
				type="addingWalk"
				isVisible={isAddingWalk}
				onClose={() => {
					setIsAddingWalk(false);
				}}
			/>
			{!isAddingWalk && (
				<ScrollView contentContainerStyle={styles.cardContainer}>
					{walksDisplay}
				</ScrollView>
			)}
			{!isAddingWalk && (
				<Pressable
					style={({ pressed }) => [
						styles.addBtn,
						pressed && styles.addBtnPressed,
					]}
					onPress={() => setIsAddingWalk(true)}
				>
					<Plus color={colors.darkWhite} size={25} />
				</Pressable>
			)}
		</View>
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
	cardContainer: {
		flex: 1,
	},
	addBtn: {
		backgroundColor: colors.primary,
		borderRadius: 25,
		borderColor: colors.darkWhite,
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
		padding: 15,
	},
	addBtnPressed: {
		backgroundColor: colors.secondary,
		borderRadius: 25,
		borderColor: colors.white,
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
		padding: 15,
	},
});
