import { Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { logout } from "../reducers/user";
import { authApi } from "../api";
import { colors, capitalize } from "../utils";
import { fontSize, radius } from "../theme";
import { ScreenLayout, ScreenTitle } from "../components/ui";

export default function LogOutScreen() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const handleLogOut = async (humanId) => {
		try {
			await authApi.logout(humanId);
		} catch (err) {
			// The server-side session may already be gone; log out locally anyway.
			console.error(err);
		}
		dispatch(logout());
		showMessage({ message: "À bientôt !", type: "success" });
	};

	return (
		<ScreenLayout>
			<ScreenTitle>
				🤙 Hey {user.username ? capitalize(user.username) : "Invité.e"}
			</ScreenTitle>
			<Pressable
				onPress={() => handleLogOut(user.id)}
				style={styles.logoutButton}
			>
				<Text style={styles.text}>Déconnexion</Text>
			</Pressable>
		</ScreenLayout>
	);
}

const styles = StyleSheet.create({
	logoutButton: {
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.secondary,
		height: 100,
		width: 210,
		padding: 10,
		borderRadius: radius.round,
	},
	text: {
		color: colors.lightGray,
		fontSize: fontSize.xl,
		fontWeight: "bold",
	},
});
