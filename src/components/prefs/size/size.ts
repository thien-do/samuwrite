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

// For cleaner definition
type MetricRow = [number, number, number, number];

const METRIC_MATRIX: Record<SizeName, MetricRow> = {
	"4XS": [11, 1.9, 42, 490],
	"3XS": [12, 1.89, 38, 482],
	"2XS": [13, 1.89, 34, 475],
	XS: [14, 1.88, 28, 470],
	S: [15, 1.87, 24, 465],
	M: [16, 1.86, 22, 460],
	L: [18, 1.85, 20, 455],
	XL: [20, 1.83, 20, 450],
	"2XL": [24, 1.79, 20, 445],
	"3XL": [28, 1.75, 19, 440],
	"4XL": [32, 1.71, 18, 435],
	"5XL": [36, 1.67, 17, 430],
	"6XL": [42, 1.61, 16, 425],
	"7XL": [48, 1.55, 15, 425],
	"8XL": [54, 1.49, 14, 425],
	"9XL": [60, 1.43, 13, 425],
	"10XL": [72, 1.38, 12, 425],
};

type MetricRecord = Record<SizeName, SizeMetrics>;

const toMetric = (prev: MetricRecord, key_: string): MetricRecord => {
	const key = key_ as SizeName;
	const row = METRIC_MATRIX[key];
	prev[key] = {
		fontSize: row[0],
		lineHeight: row[1],
		spacing: row[2],
		weight: row[3],
	};
	return prev;
};

export const SIZE_METRICS: MetricRecord = Object.keys(METRIC_MATRIX).reduce(
	toMetric,
	{} as MetricRecord
);

/**
 * The ratio of font size over a character's width. Let just say this is a
 * magic number;
 */
const FONT_SIZE_TO_CHAR_WIDTH = 0.6;

export const getContentWidth = (params: { size: SizeName }): number => {
	const fontSize = SIZE_METRICS[params.size].fontSize;
	const content = fontSize * FONT_SIZE_TO_CHAR_WIDTH * 64;
	return content;
};
