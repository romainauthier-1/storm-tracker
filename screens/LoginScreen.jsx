import {
	View,
	ScrollView,
	Text,
	Pressable,
	StyleSheet,
	TextInput,
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Keyboard,
} from "react-native";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { login } from "../reducers/user";
import { colors } from "../utils";
import { Eye, EyeOff } from "lucide-react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function LoginScreen() {
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [focus, setFocus] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const passwordRef = useRef(null);
	const emailRef = useRef(null);
	const isFocused = useIsFocused();

	const user = useSelector((state) => state.user);

	const dispatch = useDispatch();

	const validateLoginInputs = () => {
		if (!email || !password) {
			setErrorMessage("Nom ou mot de passe invalide.");
			return false;
		}
		return true;
	};

	const validateSignupInputs = () => {
		if (!username || !email || !password) {
			setErrorMessage("Tous les champs sont obligatoires.");
			return false;
		}
		return true;
	};

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	const handleLogin = async () => {
		setErrorMessage("");
		if (!validateLoginInputs()) return;

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/humans/signin`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				},
			);

			const data = await response.json();
			// console.log("DATA: ", data);
			if (data.result) {
				dispatch(
					login({
						id: data.connectedUser.id,
						username: data.connectedUser.username,
						dogs: data.connectedUser.dogs || [],
						subscription: data.connectedUser.subscription ? true : false,
					}),
				);
				setEmail(null);
				setPassword(null);
			} else {
				setErrorMessage(data.message || "Problème lors de la connexion.");
			}
		} catch (err) {
			console.error(err);
			setErrorMessage(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignup = async () => {
		setErrorMessage("");
		if (!validateSignupInputs()) return;

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.EXPO_PUBLIC_BACKEND_URL}/humans/signup`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username, email, password }),
				},
			);

			const data = await response.json();
			if (data.result) {
				dispatch(
					login({
						id: data.savedUser.id,
						username: data.savedUser.username,
						subscription: data.savedUser.subscription ? true : false,
						dogs: data.savedUser.dogs || [],
					}),
				);
				setUsername(null);
				setEmail(null);
				setPassword(null);
			} else {
				setErrorMessage(data.message || "Problème lors de la connexion.");
			}
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const placeholderColor = colors.white;
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<View style={styles.header}>
				<Text style={styles.title}>🐾 Bienvenue 🐾</Text>
				<Text style={styles.subtitle}>Commencer à noter vos balades !</Text>
			</View>
			{isLoading ? (
				<View style={styles.container}>
					<ActivityIndicator size="large" color={colors.primary} />
				</View>
			) : (
				<View style={styles.content}>
					<View style={styles.contentHeader}>
						<Text style={styles.contentHeaderTitle}></Text>
						<Text style={styles.contentHeaderSubtitle}></Text>
					</View>

					<View style={{ gap: 12, marginBottom: 20 }}>
						{/*  sert à regrouper le formulaire */}
						{isSignup && (
							<>
								<View>
									<Text style={styles.label}>Nom d'utilisateur.ice</Text>

									<TextInput
										style={styles.input}
										placeholder="Alexandre"
										placeholderTextColor={placeholderColor}
										value={username}
										onChangeText={setUsername}
										keyboardType="default"
										returnKeyType="next"
										autoCapitalize="words"
										onSubmitEditing={() => emailRef.current?.focus()}
										onFocus={() => setFocus("username")}
										onBlur={() => setFocus(null)}
									/>
								</View>
							</>
						)}
						<View>
							<Text style={styles.label}>Email</Text>

							<TextInput
								style={styles.input}
								ref={emailRef}
								placeholder="alex.dupont@mail.com"
								placeholderTextColor={placeholderColor}
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								returnKeyType="next"
								autoCapitalize="none"
								onSubmitEditing={() => passwordRef.current?.focus()}
								onFocus={() => setFocus("email")}
								onBlur={() => setFocus(null)}
							/>
						</View>
						<View>
							<Text style={styles.label}>Mot de passe</Text>
							<View style={styles.passwordContainer}>
								<TextInput
									style={styles.passwordText}
									ref={passwordRef}
									placeholder="************"
									placeholderTextColor={placeholderColor}
									value={password}
									onChangeText={setPassword}
									secureTextEntry={!isPasswordVisible}
									returnKeyType="done"
									onSubmitEditing={handleLogin}
									onFocus={() => setFocus("password")}
									onBlur={() => setFocus(null)}
									autoCapitalize="none"
									autoCorrect={false}
								/>
								<Pressable onPress={togglePasswordVisibility}>
									{isPasswordVisible ? (
										<EyeOff size={20} color={placeholderColor} />
									) : (
										<Eye size={20} color={placeholderColor} />
									)}
								</Pressable>
							</View>
						</View>
						{errorMessage !== "" && (
							<Text style={styles.errorText}>{errorMessage}</Text>
						)}
					</View>

					{isSignup ? (
						<View style={{ gap: 12 }}>
							<Pressable style={styles.buttonPrimary} onPress={handleSignup}>
								<Text style={styles.buttonPrimaryText}>S'inscrire</Text>
							</Pressable>
							<Pressable
								style={styles.buttonPrimary}
								onPress={() => setIsSignup(false)}
							>
								<Text style={styles.buttonPrimaryText}>
									J'ai déjà un compte
								</Text>
							</Pressable>
						</View>
					) : (
						<View style={{ gap: 12 }}>
							<Pressable style={styles.buttonPrimary} onPress={handleLogin}>
								<Text style={styles.buttonPrimaryText}>Se connecter</Text>
							</Pressable>
							<Pressable
								style={styles.buttonPrimary}
								onPress={() => setIsSignup(true)}
							>
								<Text style={styles.buttonPrimaryText}>Créer un compte</Text>
							</Pressable>
						</View>
					)}
				</View>
			)}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		width: screenWidth,
		height: screenHeight,
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
		flex: 1,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 16,
		color: colors.darkWhite,
	},
	subtitle: {
		color: colors.darkWhite,
		textAlign: "center",
	},
	content: {
		justifyContent: "space-between",
		backgroundColor: colors.darkWhite,
		borderTopLeftRadius: 48,
		borderTopRightRadius: 48,
		width: "100%",
		padding: 40,
		minHeight: screenHeight * 0.6,
		shadowColor: "#000",
		shadowOffset: { width: 8, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
	contentHeader: {
		marginBottom: 32,
	},
	contentHeaderTitle: {
		fontSize: 24,
		fontWeight: "bold",
		color: colors.secondary,
	},
	contentHeaderSubtitle: {
		color: colors.secondary,
	},
	label: {
		color: colors.secondary,
		marginBottom: 8,
		fontWeight: "bold",
	},
	input: {
		width: "100%",
		color: colors.white,
		backgroundColor: colors.primary,
		borderColor: colors.lightGray,
		borderWidth: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 12,
		paddingRight: 12,
		borderRadius: 8,
		marginBottom: 8,
		fontSize: 16,
	},
	errorText: {
		color: colors.destructive,
		marginTop: 8,
	},
	buttonPrimary: {
		backgroundColor: colors.primary,
		padding: 16,
		borderRadius: 10,
	},
	buttonPrimaryText: {
		color: colors.darkWhite,
		fontWeight: "bold",
		textAlign: "center",
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",
		color: colors.white,
		backgroundColor: colors.primary,
		borderColor: colors.lightGray,
		borderWidth: 1,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 12,
		paddingRight: 12,
		borderRadius: 8,
		marginBottom: 8,
		fontSize: 16,
	},
	passwordText: {
		color: colors.white,
		flex: 1,
	},
});
