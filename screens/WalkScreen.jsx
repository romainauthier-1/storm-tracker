import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	Pressable,
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
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/walks/${humanId}`,
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

	const walksDisplay = walks
		.slice()
		.reverse()
		.map((walk, i) => {
			return <WalkCard key={i} walk={walk} />;
		});

	return (
		<View style={styles.container}>
			<FormModal
				type="addingWalk"
				isVisible={isAddingWalk}
				onClose={() => setIsAddingWalk(false)}
			/>

			{isLoading ? (
				<ActivityIndicator size="small" color={colors.darkWhite} />
			) : walks.length === 0 ? (
				<Text style={styles.title}>👣 Aucune balade pour le moment 👣</Text>
			) : (
				<ScrollView
					style={styles.list}
					contentContainerStyle={styles.cardContainer}
					showsVerticalScrollIndicator={false}
				>
					{walksDisplay}
				</ScrollView>
			)}

			{!isAddingWalk && !isLoading && (
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background,
		paddingTop: 30,
		paddingBottom: 40,
	},
	list: {
		flex: 1,
		width: "100%",
	},
	cardContainer: {
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 120,
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
		padding: 10,
		position: "absolute",
		bottom: 80,
		left: "50%",
		transform: [{ translateX: -25 }],
		zIndex: 100,
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
		padding: 10,
		position: "absolute",
		bottom: 80,
		left: "50%",
		transform: [{ translateX: -25 }],
		zIndex: 100,
	},
	title: {
		fontSize: 30,
		color: colors.darkWhite,
		fontWeight: "bold",
		letterSpacing: 2,
		textAlign: "center",
	},
});
