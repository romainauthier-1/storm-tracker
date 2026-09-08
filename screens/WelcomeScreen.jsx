import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { colors, capitalize } from "../utils";
import { fontSize } from "../theme";
import { formatLongDate, isSameDay } from "../lib/format";
import { useDogs } from "../hooks/useDogs";
import { ScreenLayout, ScreenTitle } from "../components/ui";

export default function WelcomeScreen() {
	// Fetched here (and cached in the store) so the Chiens tab has data too.
	useDogs();

	const user = useSelector((state) => state.user);
	const walks = user.walks || [];

	const now = new Date();
	const nbOfWalksToday = walks.filter((walk) =>
		isSameDay(walk.date, now),
	).length;

	return (
		<ScreenLayout justify="space-between" paddingVertical={80}>
			<ScreenTitle>
				🤙 Salut {user.username ? capitalize(user.username) : "Invité.e"} !
			</ScreenTitle>
			<Text style={styles.date}>{formatLongDate(now)}</Text>
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
