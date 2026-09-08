import { ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import { colors } from "../utils";
import { useWalks } from "../hooks/useWalks";
import FormModal from "../components/FormModal";
import WalkCard from "../components/WalkCard";
import { EmptyState, Fab, ScreenLayout } from "../components/ui";

export default function WalkScreen() {
	const { walks, isLoading } = useWalks();
	const [isAddingWalk, setIsAddingWalk] = useState(false);

	const walksDisplay = walks
		.slice()
		.reverse()
		.map((walk, i) => <WalkCard key={i} walk={walk} />);

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
