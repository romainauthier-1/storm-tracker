import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: null,
	username: null,
	dogs: [],
	isConnected: false,
	notifActivated: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
			state.dogs = action.payload.dogs;
			state.isConnected = true;
			state.notifActivated = action.payload.subscription;
		},
		logout: (state) => {
			state.name = null;
			state.token = null;
			state.isConnected = false;
			state.notifActivated = false;
		},
		activateNotif: (state, action) => {
			state.notifActivated = action.payload;
		},
		setDogs: (state, action) => {
			state.dogs = action.payload;
		},
		addDog: (state, action) => {
			state.dogs.push(action.payload);
		},
	},
});

export const { login, logout, activateNotif, setDogs, addDog } =
	userSlice.actions;
export default userSlice.reducer;
