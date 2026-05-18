import {
	View,
	ScrollView,
	Text,
	Pressable,
	StyleSheet,
	TextInput,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { colors } from "../utils";
import { capitalize } from "../utils";
import { activateNotif } from "../reducers/user";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function LogOutScreen({ navigation, onActivatePush }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const isNotifActive = useSelector((state) => state.user.notifActivated);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				🤙 Hey {user.username ? capitalize(user.username) : "Invité.e"} !
			</Text>
			<Pressable onPress={() => dispatch(logout())} style={styles.logoutButton}>
				<Text style={styles.text}>Déconnexion</Text>
			</Pressable>

			{/* {isNotifActive ? (
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
	},
	title: {
		fontSize: 30,
		color: colors.darkWhite,
		fontWeight: "bold",
		letterSpacing: 2,
	},
	logoutButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: colors.secondary,
		height: 100,
		width: 210,
		padding: 10,
		borderRadius: 50,
	},
	text: {
		color: colors.lightGray,
		fontSize: 20,
		fontWeight: "bold",
	},
	notif: {
		backgroundColor: colors.secondary,
		justifyContent: "center",
		alignItems: "center",
		width: 210,
		height: 100,
		borderRadius: 50,
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
