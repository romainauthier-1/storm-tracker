import { Text, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors, capitalize } from "../utils";
import { fontSize } from "../theme";
import { setDogs } from "../reducers/user";
import { ScreenLayout, ScreenTitle } from "../components/ui";

export default function WelcomeScreen() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user);
	const walks = user.walks || [];
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const getDogs = async (humanId) => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/dogs/mydogs/${humanId}`,
			);
			const data = await response.json();

			if (data.result) {
				dispatch(setDogs(data.dogs));
			}
		} catch (err) {
			console.error(err);
			setErrorMessage(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getDogs(user.id);
	}, [isFocused]);

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: userTimeZone,
	};

	const todayDisplay = new Date().toLocaleDateString("fr-FR", dateOptions);
	const today = new Date();

	const walksOfToday = walks.filter((walk) => {
		const walkDate = new Date(walk.date);
		return (
			walkDate.getFullYear() === today.getFullYear() &&
			walkDate.getMonth() === today.getMonth() &&
			walkDate.getDate() === today.getDate()
		);
	});

	const nbOfWalksToday = walksOfToday?.length;

	return (
		<ScreenLayout justify="space-between" paddingVertical={80}>
			<ScreenTitle>
				🤙 Salut {user.username ? capitalize(user.username) : "Invité.e"} !
			</ScreenTitle>
			<Text style={styles.date}>{todayDisplay}</Text>
			<Text style={styles.date}>
				{nbOfWalksToday === 0
					? "Pas encore de balade aujourd'hui"
					: nbOfWalksToday === 1
						? `${nbOfWalksToday} balade aujourd'hui !`
						: `${nbOfWalksToday} balades aujourd'hui !`}
			</Text>
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	date: {
		fontSize: fontSize.xl,
		color: colors.darkWhite,
		fontWeight: "bold",
		letterSpacing: 2,
	},
});
