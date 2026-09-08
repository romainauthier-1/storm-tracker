import { genderLabel } from "../lib/format";
import { Card, CardText, CardTitle } from "./ui";

export default function DogCard({ dog }) {
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const dateOptions = {
		day: "numeric",
		year: "numeric",
		month: "long",
		timeZone: userTimeZone,
	};

	const birthDate = new Date(dog.birth_date).toLocaleDateString(
		"fr-FR",
		dateOptions,
	);

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
