import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FlashMessage from "react-native-flash-message";

import {
	Handshake,
	HeartHandshake,
	SquareArrowRightExit,
	PawPrint,
} from "lucide-react-native";
import { colors } from "./utils";

import user from "./reducers/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ user });

const persistConfig = { key: "Storm-Tracker", storage: AsyncStorage };

const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import LoginScreen from "./screens/LoginScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LogOutScreen from "./screens/LogOutScreen";
import DogScreen from "./screens/DogScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabs = ({ onActivatePush }) => {
	const user = useSelector((state) => state.user);
	const dogs = useSelector((state) => state.user.dogs) || [];

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: 60,
					position: "absolute",
					borderTopWidth: 0,
					elevation: 0,
					marginHorizontal: 30,
					borderRadius: 25,
					marginBottom: 10,
					backgroundColor: colors.secondary,
					padding: 10,
					paddingBottom: 5,
				},
			}}
		>
			<Tab.Screen
				name="Accueil"
				component={WelcomeScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<HeartHandshake
							size={focused ? 30 : 20}
							color={focused ? colors.lightGray : colors.primary}
						/>
					),
					tabBarActiveTintColor: colors.lightGray,
					tabBarInactiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "bold",
						marginBottom: 5,
					},
				}}
			/>
			<Tab.Screen
				name={dogs.length > 1 ? "Chiens" : "Chien"}
				component={DogScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<PawPrint
							size={focused ? 30 : 20}
							color={focused ? colors.lightGray : colors.primary}
						/>
					),
					tabBarActiveTintColor: colors.lightGray,
					tabBarInactiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "bold",
						marginBottom: 5,
					},
				}}
			/>
			<Tab.Screen
				name="Déconnexion"
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<SquareArrowRightExit
							size={focused ? 30 : 20}
							color={focused ? colors.lightGray : colors.primary}
						/>
					),
					tabBarActiveTintColor: colors.lightGray,
					tabBarInactiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "bold",
						marginBottom: 5,
					},
				}}
			>
				{(props) => <LogOutScreen {...props} onActivatePush={onActivatePush} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

const urlBase64ToUint8Array = (base64String) => {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

const AppNavigation = () => {
	const isConnected = useSelector((state) => state.user.isConnected);

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{isConnected ? (
				<Stack.Screen name="Tracker | Bienvenue">
					{(props) => <HomeTabs {...props} />}
				</Stack.Screen>
			) : (
				<Stack.Screen name="Tracker | Connexion" component={LoginScreen} />
			)}
		</Stack.Navigator>
	);
};

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.backgroundLight,
	},
};

export default function App({ navigation }) {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<PersistGate persistor={persistor}>
					<NavigationContainer theme={MyTheme}>
						<AppNavigation />
					</NavigationContainer>
				</PersistGate>
				<StatusBar style="light" />
				<FlashMessage position="top" />
			</SafeAreaProvider>
		</Provider>
	);
}
