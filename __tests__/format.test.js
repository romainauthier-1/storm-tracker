import { genderLabel } from "../lib/format";

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
