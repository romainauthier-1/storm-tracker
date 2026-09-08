import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../utils";
import { radius } from "../../theme";

// Wrap-around row of selectable "chips". Replaces the seven near-identical
// `toggleXxx` builders that FormModal used to carry.
//
// options   array of `string | number` or `{ value, label }`
// value     single mode: the selected value (or "" / null when none)
//           multiple mode: an array of selected values
// onChange  single mode: (nextValue) => void   (re-tapping clears -> "")
//           multiple mode: (nextArray) => void
// multiple  boolean
export default function ChipGroup({
	options,
	value,
	onChange,
	multiple = false,
}) {
	const items = options.map((option) =>
		option != null && typeof option === "object"
			? option
			: { value: option, label: String(option) },
	);

	const isSelected = (v) =>
		multiple ? Array.isArray(value) && value.includes(v) : value === v;

	const toggle = (v) => {
		if (multiple) {
			const current = Array.isArray(value) ? value : [];
			onChange(
				current.includes(v) ? current.filter((x) => x !== v) : [...current, v],
			);
		} else {
			onChange(value === v ? "" : v);
		}
	};

	return (
		<View style={styles.group}>
			{items.map((item) => (
				<Pressable
					key={String(item.value)}
					onPress={() => toggle(item.value)}
					style={isSelected(item.value) ? styles.chipOn : styles.chip}
				>
					<Text style={styles.chipText}>{item.label}</Text>
				</Pressable>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	group: {
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		alignItems: "center",
		justifyContent: "space-evenly",
		padding: 10,
	},
	chip: {
		padding: 10,
		backgroundColor: colors.muted,
		borderRadius: radius.sm,
	},
	chipOn: {
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: radius.sm,
	},
	chipText: {
		color: colors.white,
	},
});
