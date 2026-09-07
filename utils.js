export function capitalize(string) {
	if (typeof string !== "string" || string.length === 0) {
		return string;
	}

	return string[0].toUpperCase() + string.slice(1);
}

export function minimize(string) {
	if (typeof string !== "string" || string.length === 0) {
		return string;
	}

	return string[0] + string.slice(1).toLowerCase();
}

export function fullCaps(string) {
	if (typeof string !== "string" || string.length === 0) {
		return string;
	}

	return string.toUpperCase();
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

export const colors = {
	primary: "#33715F",
	secondary: "#4FB064",
	white: "#FFFFFF",
	darkWhite: "#ebebeb",
	text: "#16312A",
	muted: "#8692a7d1",
	lightGray: "#cfcfcf",
	background: "#336471",
	destructive: "#ca0d0d",
};

const checkName = (name) => {
	if (name.includes("-")) {
		let composedName = name.split("-");
		composedName =
			composedName[0][0].toUpperCase() +
			composedName[0].slice(1) +
			" " +
			composedName[1].toUpperCase();
		return composedName;
	} else if (name.includes(" ")) {
		let doubleName = name.split(" ");
		doubleName =
			doubleName[0][0].toUpperCase() +
			doubleName[0].slice(1) +
			" " +
			doubleName[1].toUpperCase();
		return doubleName;
	} else {
		let regularName = name[0].toUpperCase() + name.slice(1);
		return regularName;
	}
};
