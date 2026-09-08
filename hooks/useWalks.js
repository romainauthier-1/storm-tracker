import { useCallback, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { walksApi } from "../api";
import { setWalks } from "../reducers/user";

// Loads the current user's walks into the store and re-fetches whenever the
// screen regains focus. Replaces the fetch skeleton duplicated in WalkScreen.
export function useWalks() {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const walks = useSelector((state) => state.user.walks);
	const userId = useSelector((state) => state.user.id);
	const [isLoading, setIsLoading] = useState(false);

	const refresh = useCallback(async () => {
		if (!userId) return;
		setIsLoading(true);
		try {
			dispatch(setWalks(await walksApi.list(userId)));
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

	return { walks, isLoading, refresh };
}
