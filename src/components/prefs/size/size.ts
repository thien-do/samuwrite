export const SIZE_NAMES = [
	"4XS",
	"3XS",
	"2XS",
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"2XL",
	"3XL",
	"4XL",
	"5XL",
	"6XL",
	"7XL",
	"8XL",
	"9XL",
	"10XL",
] as const;

export type SizeName = typeof SIZE_NAMES[number];

export interface SizeMetrics {
	fontSize: number;
	/** Relative to font size */
	lineHeight: number;
	spacing: number;
	/** 400 - 500 */
	weight: number;
}

export const SIZE_METRICS: Record<SizeName, SizeMetrics> = {
	"4XS": { fontSize: 11, lineHeight: 1.9, spacing: 42, weight: 490 },
	"3XS": { fontSize: 12, lineHeight: 1.89, spacing: 38, weight: 482 },
	"2XS": { fontSize: 13, lineHeight: 1.89, spacing: 34, weight: 475 },
	XS: { fontSize: 14, lineHeight: 1.88, spacing: 28, weight: 470 },
	S: { fontSize: 15, lineHeight: 1.87, spacing: 24, weight: 465 },
	M: { fontSize: 16, lineHeight: 1.86, spacing: 22, weight: 460 },
	L: { fontSize: 18, lineHeight: 1.85, spacing: 20, weight: 455 },
	XL: { fontSize: 20, lineHeight: 1.83, spacing: 20, weight: 450 },
	"2XL": { fontSize: 24, lineHeight: 1.79, spacing: 20, weight: 445 },
	"3XL": { fontSize: 28, lineHeight: 1.75, spacing: 19, weight: 440 },
	"4XL": { fontSize: 32, lineHeight: 1.71, spacing: 18, weight: 435 },
	"5XL": { fontSize: 36, lineHeight: 1.67, spacing: 17, weight: 430 },
	"6XL": { fontSize: 42, lineHeight: 1.61, spacing: 16, weight: 425 },
	"7XL": { fontSize: 48, lineHeight: 1.55, spacing: 15, weight: 425 },
	"8XL": { fontSize: 54, lineHeight: 1.49, spacing: 14, weight: 425 },
	"9XL": { fontSize: 60, lineHeight: 1.43, spacing: 13, weight: 425 },
	"10XL": { fontSize: 72, lineHeight: 1.38, spacing: 12, weight: 425 },
};
