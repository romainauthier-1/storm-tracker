import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../utils";
import { setWalks } from "../reducers/user";
import FormModal from "../components/FormModal";
import WalkCard from "../components/WalkCard";
import { EmptyState, Fab, ScreenLayout } from "../components/ui";

export default function WalkScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
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
		<ScreenLayout justify="center" style={styles.screen}>
			<FormModal
				type="addingWalk"
				isVisible={isAddingWalk}
				onClose={() => setIsAddingWalk(false)}
			/>

			{isLoading ? (
				<ActivityIndicator size="small" color={colors.darkWhite} />
			) : walks.length === 0 ? (
				<EmptyState>👣 Aucune balade pour le moment 👣</EmptyState>
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
				<Fab
					onPress={() => setIsAddingWalk(true)}
					accessibilityLabel="Ajouter une balade"
				/>
			)}
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	screen: {
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
});
