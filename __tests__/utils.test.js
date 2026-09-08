import { capitalize, toLocalDateString, toLocalTimeString } from "../utils";

describe("capitalize", () => {
	it("uppercases the first letter", () => {
		expect(capitalize("romain")).toBe("Romain");
	});

	it("leaves an empty string untouched", () => {
		expect(capitalize("")).toBe("");
	});

	it("passes through non-strings", () => {
		expect(capitalize(null)).toBeNull();
	});
});

describe("toLocalDateString", () => {
	it("formats a Date as YYYY-MM-DD in the device timezone (no UTC shift)", () => {
		expect(toLocalDateString(new Date(2026, 0, 5))).toBe("2026-01-05");
		expect(toLocalDateString(new Date(2026, 11, 31))).toBe("2026-12-31");
	});
});

describe("toLocalTimeString", () => {
	it("formats a Date as HH:MM:SS", () => {
		expect(toLocalTimeString(new Date(2026, 0, 1, 9, 4, 0))).toBe("09:04:00");
	});
});
