// Clamp a Date into the [minimumDate, maximumDate] range (both bounds optional).
// iOS Safari does not enforce the `min` / `max` attributes of a
// <input type="date">, so <DateField> clamps the picked value itself.
export function clampDate(date, minimumDate, maximumDate) {
	if (!(date instanceof Date) || Number.isNaN(date.getTime())) return date;
	if (minimumDate instanceof Date && date.getTime() < minimumDate.getTime()) {
		return minimumDate;
	}
	if (maximumDate instanceof Date && date.getTime() > maximumDate.getTime()) {
		return maximumDate;
	}
	return date;
}
