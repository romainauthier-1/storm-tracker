import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../utils";

// Web / PWA implementation of <DateField>.
// `@react-native-community/datetimepicker` has no web build (it renders `null`
// after a console warning), so on the deployed PWA the native component is
// simply absent. Here we fall back to a real DOM <input type="date|time">,
// which on iOS Safari opens the native wheel picker and works offline.
//
// Same props as the native DateField: { mode, value, onChange, label,
// maximumDate, minimumDate }.

const pad = (n) => String(n).padStart(2, "0");

// Date -> value string expected by <input type="date"> (YYYY-MM-DD)
// or <input type="time"> (HH:MM), in the device timezone (no UTC shift).
function toInputValue(date, mode) {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
	if (mode === "time") {
		return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
	}
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Input string -> Date, reusing the untouched part of the previous value
// (keep the time when picking a date, keep the day when picking a time).
function fromInputValue(raw, mode, previous) {
	const base = previous instanceof Date ? new Date(previous) : new Date();
	if (!raw) return base;
	if (mode === "time") {
		const [h, m] = raw.split(":").map(Number);
		base.setHours(h || 0, m || 0, 0, 0);
		return base;
	}
	const [y, mo, d] = raw.split("-").map(Number);
	base.setFullYear(y, (mo || 1) - 1, d || 1);
	return base;
}

const inputStyle = {
	fontSize: "18px",
	color: colors.primary,
	textAlign: "center",
	border: "none",
	borderBottom: `1px solid ${colors.secondary}`,
	background: "transparent",
	padding: "8px 4px",
	margin: "12px 0",
	width: "80%",
	fontFamily: "inherit",
};

export default function DateField({
	mode = "date",
	value,
	onChange,
	label,
	maximumDate,
	minimumDate,
}) {
	return (
		<View style={styles.field}>
			{label ? <Text style={styles.label}>{label}</Text> : null}
			<input
				type={mode === "time" ? "time" : "date"}
				value={toInputValue(value, mode)}
				max={maximumDate ? toInputValue(maximumDate, mode) : undefined}
				min={minimumDate ? toInputValue(minimumDate, mode) : undefined}
				onChange={(event) =>
					onChange(fromInputValue(event.target.value, mode, value))
				}
				style={inputStyle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	field: {
		width: "100%",
		alignItems: "center",
	},
	label: {
		color: colors.primary,
		textAlign: "center",
		fontSize: 18,
		padding: 8,
	},
});
