export function capitalize(string) {
	if (typeof string !== "string" || string.length === 0) {
		return string;
	}

	return string[0].toUpperCase() + string.slice(1);
}

const pad = (n) => String(n).padStart(2, "0");

// Renvoie la date "YYYY-MM-DD" telle qu'affichée à l'utilisateur
// (fuseau de l'appareil), sans conversion UTC.
export function toLocalDateString(date) {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Renvoie l'heure "HH:MM:SS" locale (fuseau de l'appareil), sans conversion UTC.
export function toLocalTimeString(date) {
	return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

// Design tokens live in `theme/`. Re-exported here so existing
// `import { colors } from "../utils"` call sites keep working.
export { colors } from "./theme/colors";
