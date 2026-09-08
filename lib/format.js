// Display helpers (dates, lists, labels). Pure functions, French output.

const DEVICE_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Backend gender enum -> label shown on a dog card.
export function genderLabel(gender) {
	if (gender === "MALE") return "Mâle";
	if (gender === "FEMALE") return "Femelle";
	return "Sexe inconnu";
}

// "lundi 5/1" — the date shown on a walk card.
export function formatWalkDate(dateInput) {
	return new Date(dateInput).toLocaleDateString("fr-FR", {
		weekday: "long",
		day: "numeric",
		month: "numeric",
		timeZone: DEVICE_TZ,
	});
}

// "5 janvier 2026" — a dog's birth date.
export function formatBirthDate(dateInput) {
	return new Date(dateInput).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: DEVICE_TZ,
	});
}

// "lundi 5 janvier 2026" — today's date on the welcome screen.
export function formatLongDate(dateInput) {
	return new Date(dateInput).toLocaleDateString("fr-FR", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: DEVICE_TZ,
	});
}

// "09:30:00.000" | "09:30:00" -> "09h30"
export function formatWalkTime(time) {
	if (!time) return "";
	return time.split(".")[0].split(":").slice(0, 2).join("h");
}

// Same calendar day, in the device timezone.
export function isSameDay(a, b) {
	const da = new Date(a);
	const db = new Date(b);
	return (
		da.getFullYear() === db.getFullYear() &&
		da.getMonth() === db.getMonth() &&
		da.getDate() === db.getDate()
	);
}

// ["Joyeux", "Excité"] -> "Joyeux, Excité" ; [] / undefined -> "RAS ✅"
export function listOrRAS(list) {
	return list && list.length > 0 ? list.join(", ") : "RAS ✅";
}
