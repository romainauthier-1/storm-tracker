import { formatBirthDate, genderLabel } from "../lib/format";
import { Card, CardText, CardTitle } from "./ui";

export default function DogCard({ dog }) {
	const birthDate = formatBirthDate(dog.birth_date);

	return (
		<Card>
			<CardTitle>{dog.name}</CardTitle>
			<CardText>{genderLabel(dog.gender)}</CardText>
			<CardText>
				{dog.race2 ? `Croisé ${dog.race1} / ${dog.race2}` : dog.race1}
			</CardText>
			<CardText>
				{dog.gender === "MALE" ? `Né le ${birthDate}` : `Née le ${birthDate}`}
			</CardText>
		</Card>
	);
}
