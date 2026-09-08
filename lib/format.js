// Display helpers. More date / list helpers land here in a later lot.

// Backend gender enum -> label shown on a dog card.
export function genderLabel(gender) {
	if (gender === "MALE") return "Mâle";
	if (gender === "FEMALE") return "Femelle";
	return "Sexe inconnu";
}
