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
