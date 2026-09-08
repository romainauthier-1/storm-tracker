import { ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import DogCard from "../components/DogCard";
import FormModal from "../components/FormModal";
import { Fab, ScreenLayout, ScreenTitle } from "../components/ui";

export default function DogScreen() {
	const [isAddingDog, setIsAddingDog] = useState(false);
	const user = useSelector((state) => state.user);
	const dogs = user?.dogs || [];

	const dogsToDisplay = dogs.map((dog) => <DogCard dog={dog} key={dog?.id} />);

	return (
		<ScreenLayout style={styles.screen}>
			{!isAddingDog && (
				<>
					<ScreenTitle>
						🐶{" "}
						{dogs.length > 1
							? "Mes poilus"
							: dogs.length === 0
								? "Aucun poilu"
								: "Mon poilu"}{" "}
						🐶
					</ScreenTitle>
					{dogs.length === 0 && <ScreenTitle>pour le moment</ScreenTitle>}
				</>
			)}

			<ScrollView
				style={styles.list}
				contentContainerStyle={styles.dogContainer}
				showsVerticalScrollIndicator={false}
			>
				{dogsToDisplay}
			</ScrollView>

			<FormModal
				type="addingDog"
				isVisible={isAddingDog}
				onClose={() => setIsAddingDog(false)}
			/>

			{!isAddingDog && (
				<Fab
					onPress={() => setIsAddingDog(true)}
					accessibilityLabel="Ajouter un poilu"
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
	},
	dogContainer: {
		alignItems: "center",
	},
});
