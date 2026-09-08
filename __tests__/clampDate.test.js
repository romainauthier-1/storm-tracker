import { clampDate } from "../components/fields/clampDate";

const day = (iso) => new Date(iso);

describe("clampDate", () => {
	it("returns the date untouched when inside the range", () => {
		const d = day("2026-06-15T10:00:00");
		expect(clampDate(d, day("2026-01-01"), day("2026-12-31"))).toBe(d);
	});

	it("clamps a future date down to maximumDate", () => {
		const max = day("2026-09-08T12:00:00");
		expect(clampDate(day("2027-01-01T00:00:00"), undefined, max)).toBe(max);
	});

	it("clamps a past date up to minimumDate", () => {
		const min = day("2026-01-01T00:00:00");
		expect(clampDate(day("2020-01-01T00:00:00"), min, undefined)).toBe(min);
	});

	it("passes through an invalid value", () => {
		const bad = new Date("nope");
		expect(clampDate(bad, day("2026-01-01"), day("2026-12-31"))).toBe(bad);
	});
});
