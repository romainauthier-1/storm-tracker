import {
	formatWalkTime,
	genderLabel,
	isSameDay,
	listOrRAS,
} from "../lib/format";

describe("genderLabel", () => {
	it("maps the backend enum to a French label", () => {
		expect(genderLabel("MALE")).toBe("Mâle");
		expect(genderLabel("FEMALE")).toBe("Femelle");
	});

	it("falls back to 'Sexe inconnu' for anything else", () => {
		expect(genderLabel("INCONNU")).toBe("Sexe inconnu");
		expect(genderLabel(undefined)).toBe("Sexe inconnu");
	});
});

describe("formatWalkTime", () => {
	it("turns a HH:MM:SS(.mmm) time into HHhMM", () => {
		expect(formatWalkTime("09:30:00")).toBe("09h30");
		expect(formatWalkTime("18:05:00.000")).toBe("18h05");
	});

	it("returns an empty string for a missing time", () => {
		expect(formatWalkTime(undefined)).toBe("");
		expect(formatWalkTime("")).toBe("");
	});
});

describe("isSameDay", () => {
	it("is true only for the same calendar day", () => {
		expect(isSameDay("2026-01-05", new Date(2026, 0, 5, 23))).toBe(true);
		expect(isSameDay("2026-01-05", new Date(2026, 0, 6))).toBe(false);
	});
});

describe("listOrRAS", () => {
	it("joins a non-empty list", () => {
		expect(listOrRAS(["Joyeux", "Excité"])).toBe("Joyeux, Excité");
	});

	it("returns 'RAS ✅' for empty or missing lists", () => {
		expect(listOrRAS([])).toBe("RAS ✅");
		expect(listOrRAS(undefined)).toBe("RAS ✅");
	});
});
