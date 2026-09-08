import { render, screen, fireEvent } from "@testing-library/react-native";
import ChipGroup from "../components/ui/ChipGroup";

describe("ChipGroup", () => {
	it("single mode: selects a value, and clears it when re-tapped", () => {
		const onChange = jest.fn();
		const { rerender } = render(
			<ChipGroup options={["A", "B"]} value="" onChange={onChange} />,
		);

		fireEvent.press(screen.getByText("A"));
		expect(onChange).toHaveBeenCalledWith("A");

		rerender(<ChipGroup options={["A", "B"]} value="A" onChange={onChange} />);
		fireEvent.press(screen.getByText("A"));
		expect(onChange).toHaveBeenLastCalledWith("");
	});

	it("multiple mode: adds and removes values from the array", () => {
		const onChange = jest.fn();
		const { rerender } = render(
			<ChipGroup
				options={["X", "Y"]}
				value={[]}
				onChange={onChange}
				multiple
			/>,
		);

		fireEvent.press(screen.getByText("X"));
		expect(onChange).toHaveBeenCalledWith(["X"]);

		rerender(
			<ChipGroup
				options={["X", "Y"]}
				value={["X"]}
				onChange={onChange}
				multiple
			/>,
		);
		fireEvent.press(screen.getByText("X"));
		expect(onChange).toHaveBeenLastCalledWith([]);
	});

	it("supports { value, label } options", () => {
		const onChange = jest.fn();
		render(
			<ChipGroup
				options={[{ value: "MALE", label: "Mâle" }]}
				value=""
				onChange={onChange}
			/>,
		);
		fireEvent.press(screen.getByText("Mâle"));
		expect(onChange).toHaveBeenCalledWith("MALE");
	});
});
