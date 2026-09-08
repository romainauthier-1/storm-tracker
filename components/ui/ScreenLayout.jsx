import { View, StyleSheet } from "react-native";
import { colors } from "../../utils";

// Full-screen container shared by the tab screens: fills the screen, centres
// its children horizontally and paints the app background. `justify` maps to
// `justifyContent`; `paddingVertical` gives the screen some breathing room.
export default function ScreenLayout({
	children,
	justify = "space-evenly",
	paddingVertical = 0,
	style,
}) {
	return (
		<View
			style={[
				styles.screen,
				{ justifyContent: justify, paddingVertical },
				style,
			]}
		>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.background,
	},
});
