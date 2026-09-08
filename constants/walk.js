// Option lists for the "add a walk" / "add a dog" forms.

export const GENDER_OPTIONS = [
	{ value: "MALE", label: "Mâle" },
	{ value: "FEMALE", label: "Femelle" },
	{ value: "INCONNU", label: "Inconnu" },
];

export const NEEDS_OPTIONS = [
	{ value: "peed", label: "Pipi" },
	{ value: "pooped", label: "Caca" },
];

export const DOG_MOOD_OPTIONS = [
	"Flemme",
	"Joyeux",
	"Excité",
	"Stressé",
	"Fatigué",
	"Sociable",
	"Attentif",
	"Distrait",
	"Vigilant",
	"Tranquille",
	"Dynamique",
];

export const HUMAN_MOOD_OPTIONS = [
	"Flemme",
	"Triste",
	"Pressé",
	"Agacé",
	"Fatigué",
	"Normal",
	"En forme",
	"Motivé",
	"Bonne composition",
];

export const OTHER_OPTIONS = [
	"Accident urine",
	"Accident selles",
	"Accident selles + urine",
	"Destruction",
	"Vomi",
	"Selles molles",
	"Diarrhée",
	"Glaires dans les selles",
	"A mangé (non identifié)",
	"A mangé (identifié)",
];

export const COPROPHAGIE_OPTIONS = [
	{ value: 0, label: "Non" },
	{ value: 1, label: "1 fois" },
	{ value: 2, label: "2 fois" },
	{ value: 3, label: "3 fois" },
	{ value: 4, label: "4 fois ou +" },
];
