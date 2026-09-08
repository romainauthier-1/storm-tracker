import { render, screen } from "@testing-library/react-native";
import WalkCard from "../components/WalkCard";

const baseWalk = {
	dog_name: "Storm",
	date: "2026-01-05",
	time: "09:30:00",
	duration: 25,
	peed: true,
	pooped: false,
	dog_mood: [],
	human_mood: [],
	other: [],
	coprophagie: 0,
};

describe("WalkCard", () => {
	it("shows the dog name, the formatted time and the duration", () => {
		render(<WalkCard walk={baseWalk} />);

		expect(screen.getByText("Storm")).toBeTruthy();
		expect(screen.getByText(/09h30/)).toBeTruthy();
		expect(screen.getByText("25 minutes")).toBeTruthy();
	});

	it("falls back to RAS when no mood is recorded", () => {
		render(<WalkCard walk={baseWalk} />);

		expect(screen.getAllByText(/RAS/).length).toBeGreaterThan(0);
	});
});
