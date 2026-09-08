import { useState } from "react";
import {
	View,
	Text,
	Pressable,
	ScrollView,
	Modal,
	StyleSheet,
} from "react-native";
import { XCircle } from "lucide-react-native";
import { colors } from "../../utils";
import { radius } from "../../theme";
import { ChipGroup } from "../ui";

// An outlined button that opens a full-screen sheet holding a <ChipGroup>.
// Used for the walk form's mood / "autres infos" / coprophagie pickers.
export default function OptionPickerModal({
	label,
	options,
	value,
	onChange,
	multiple = false,
}) {
	const [visible, setVisible] = useState(false);

	return (
		<View style={styles.row}>
			<Pressable style={styles.trigger} onPress={() => setVisible(true)}>
				<Text style={styles.triggerText}>{label}</Text>
			</Pressable>
			<Modal
				animationType="fade"
				transparent={false}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<View style={styles.sheet}>
					<XCircle
						size={30}
						color={colors.destructive}
						onPress={() => setVisible(false)}
						style={styles.close}
					/>
					<Text style={styles.title}>{label}</Text>
					<ScrollView
						contentContainerStyle={styles.sheetContent}
						showsVerticalScrollIndicator={false}
					>
						<ChipGroup
							options={options}
							value={value}
							onChange={onChange}
							multiple={multiple}
						/>
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		width: "100%",
		alignItems: "center",
		marginVertical: 6,
	},
	trigger: {
		padding: 10,
		backgroundColor: colors.lightGray,
		borderRadius: radius.sm,
		borderWidth: 1,
		borderColor: colors.primary,
	},
	triggerText: {
		color: colors.primary,
	},
	sheet: {
		flex: 1,
		backgroundColor: colors.lightGray,
		paddingHorizontal: 20,
		paddingTop: 40,
		paddingBottom: 20,
	},
	close: {
		alignSelf: "flex-end",
	},
	title: {
		color: colors.primary,
		textAlign: "center",
		fontSize: 20,
		padding: 10,
		marginBottom: 20,
	},
	sheetContent: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
		alignItems: "center",
		justifyContent: "space-evenly",
		paddingVertical: 20,
	},
});
