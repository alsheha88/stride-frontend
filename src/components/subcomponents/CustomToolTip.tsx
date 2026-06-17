import { formatDate } from "../../lib/utility";

const tierColors = [
	"text-danger",
	"text-secondary",
	"text-primary",
	"text-success",
	"text-tertiary",
];

const tierLabels = [
	"Beginner",
	"Learning",
	"Confident",
	"Strong",
	"Mastered",
];

type TooltipProps = {
	active?: boolean;
	payload?: Array<{
		payload: {
			rating: number;
			createdAt: string;
		};
	}>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
	if (!active || !payload?.length) return null;

	const data = payload[0].payload;
	const tierColor = tierColors[data.rating - 1];
	const tierLabel = tierLabels[data.rating - 1];

	return (
		<div className="bg-surface border border-border rounded-md px-3 py-2 shadow-lg shadow-black/40 flex flex-col gap-1">
			<p className="text-paragraph text-sm">
				<span className="text-muted">Rating: </span>
				<span className={tierColor}>{tierLabel}</span>
			</p>
			<p className="text-muted text-xs">{formatDate(data.createdAt)}</p>
		</div>
	);
}

export default CustomTooltip;