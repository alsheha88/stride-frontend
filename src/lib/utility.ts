

export function formatDate(date: string) {
	const input = new Date(date);
	if (!input) return "Never";

	const formattedDate = input.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return formattedDate;
}


