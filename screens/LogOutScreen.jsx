import { Text, Pressable, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { colors, capitalize } from "../utils";
import { fontSize, radius } from "../theme";
import { ScreenLayout, ScreenTitle } from "../components/ui";

export default function LogOutScreen({ navigation, onActivatePush }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const isNotifActive = useSelector((state) => state.user.notifActivated);

	const handleLogOut = async (humanId) => {
		try {
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/humans/logout/${humanId}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ humanId }),
				},
			);
			const data = await response.json();

			if (data.result) {
				dispatch(logout());
				console.log(data.message);
				console.log(data.offlineUser);
			}
		} catch (err) {
			console.error(err);
		}
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

			{/* Notifications push — à câbler (voir backlog) :
			{isNotifActive ? (
				<View style={styles.notif}>
					<Text style={styles.notifText}>Notifications activées</Text>
				</View>
			) : (
				<Pressable
					onPress={async () => {
						try {
							await onActivatePush();
							dispatch(activateNotif(true));
						} catch (err) {
							console.error("Erreur activation notifs :", err);
						}
					}}
					style={styles.logoutButton}
				>
					<Text style={styles.text}>🔔 Active les notifs</Text>
				</Pressable>
			)} */}
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
	notif: {
		backgroundColor: colors.secondary,
		justifyContent: "center",
		alignItems: "center",
		width: 210,
		height: 100,
		borderRadius: radius.round,
		padding: 10,
		opacity: 0.5,
	},
	notifText: {
		color: colors.white,
		textAlign: "center",
		fontSize: 15,
		fontWeight: "bold",
	},
});
