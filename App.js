import { StatusBar } from "expo-status-bar";
import { Provider, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";
import {
	HeartHandshake,
	SquareArrowRightExit,
	PawPrint,
	Footprints,
} from "lucide-react-native";

import { colors } from "./utils";
import { radius } from "./theme";
import user from "./reducers/user";
import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LogOutScreen from "./screens/LogOutScreen";
import DogScreen from "./screens/DogScreen";
import WalkScreen from "./screens/WalkScreen";

const reducers = combineReducers({ user });
const persistConfig = { key: "Storm-Tracker", storage: AsyncStorage };

const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
persistStore(store);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Shared tab-bar options — only the icon differs between tabs.
const tabOptions = (Icon) => ({
	tabBarIcon: ({ focused }) => (
		<Icon
			size={focused ? 30 : 20}
			color={focused ? colors.lightGray : colors.primary}
		/>
	),
	tabBarActiveTintColor: colors.lightGray,
	tabBarInactiveTintColor: colors.primary,
	tabBarLabelStyle: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
});

const HomeTabs = () => {
	const dogs = useSelector((state) => state.user.dogs) || [];

	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
		>
			<Tab.Screen
				name="Accueil"
				component={WelcomeScreen}
				options={tabOptions(HeartHandshake)}
			/>
			<Tab.Screen
				name={dogs.length > 1 ? "Chiens" : "Chien"}
				component={DogScreen}
				options={tabOptions(PawPrint)}
			/>
			<Tab.Screen
				name="Balades"
				component={WalkScreen}
				options={tabOptions(Footprints)}
			/>
			<Tab.Screen
				name="Déconnexion"
				component={LogOutScreen}
				options={tabOptions(SquareArrowRightExit)}
			/>
		</Tab.Navigator>
	);
};

const AppNavigation = () => {
	const isConnected = useSelector((state) => state.user.isConnected);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isConnected ? (
				<Stack.Screen name="Tracker | Bienvenue" component={HomeTabs} />
			) : (
				<Stack.Screen name="Tracker | Connexion" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

const navigationTheme = {
	...DefaultTheme,
	colors: { ...DefaultTheme.colors, background: colors.background },
};

const styles = {
	tabBar: {
		height: 60,
		position: "absolute",
		borderTopWidth: 0,
		shadowColor: colors.shadow,
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 8,
		marginHorizontal: 30,
		borderRadius: radius.pill,
		marginBottom: 10,
		backgroundColor: colors.secondary,
		padding: 10,
		paddingBottom: 5,
	},
};

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<NavigationContainer theme={navigationTheme}>
					<AppNavigation />
				</NavigationContainer>
				<StatusBar style="light" />
				<FlashMessage position="top" />
			</SafeAreaProvider>
		</Provider>
	);
}
