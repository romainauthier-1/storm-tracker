import { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { dogsApi } from "../api";
import { setDogs } from "../reducers/user";

// Loads the current user's dogs into the store and re-fetches on focus.
// Replaces the fetch skeleton in WelcomeScreen.
export function useDogs() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const dogs = useSelector((state) => state.user.dogs);
	const userId = useSelector((state) => state.user.id);
	const [isLoading, setIsLoading] = useState(false);

	const refresh = useCallback(async () => {
		if (!userId) return;
		setIsLoading(true);
		try {
			dispatch(setDogs(await dogsApi.listMine(userId)));
		} catch (err) {
			console.error(err);
			showMessage({ message: err.message, type: "danger" });
		} finally {
			setIsLoading(false);
		}
	}, [dispatch, userId]);

	useEffect(() => {
		refresh();
	}, [isFocused, refresh]);

	return { dogs, isLoading, refresh };
}
