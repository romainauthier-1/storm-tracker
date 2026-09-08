import { render, screen } from "@testing-library/react-native";
import {
	Card,
	CardText,
	CardTitle,
	EmptyState,
	ScreenLayout,
	ScreenTitle,
} from "../components/ui";

describe("ui primitives", () => {
	it("Card renders its title and text children", () => {
		render(
			<Card>
				<CardTitle>Storm</CardTitle>
				<CardText>25 minutes</CardText>
			</Card>,
		);
		expect(screen.getByText("Storm")).toBeTruthy();
		expect(screen.getByText("25 minutes")).toBeTruthy();
	});

	it("EmptyState renders its message", () => {
		render(<EmptyState>Aucune balade</EmptyState>);
		expect(screen.getByText("Aucune balade")).toBeTruthy();
	});

	it("ScreenLayout renders a ScreenTitle child", () => {
		render(
			<ScreenLayout>
				<ScreenTitle>Mes poilus</ScreenTitle>
			</ScreenLayout>,
		);
		expect(screen.getByText("Mes poilus")).toBeTruthy();
	});
});
