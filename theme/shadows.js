import { colors } from "./colors";

// Elevation presets. Spread into a StyleSheet entry: `{ ...shadows.card }`.
export const shadows = {
	// Cards, sheets.
	card: {
		shadowColor: colors.shadow,
		shadowOffset: { width: 8, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
	// Floating controls (FAB, tab bar).
	floating: {
		shadowColor: colors.shadow,
		shadowOffset: { width: 5, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 12,
		elevation: 8,
	},
};
