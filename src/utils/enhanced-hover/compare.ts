interface Coordinate {
	x: number;
	y: number;
}

type MousePosition = Coordinate;

type ElementPosition = DOMRect;

interface Rect {
	topLeft: Coordinate;
	bottomRight: Coordinate;
}

export interface CompareElementOptions {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
}

export enum ComparePositionResult {
	INSIDE = "inside",
	OUTSIDE = "outside",
}

export const compareElementPosition = (
	mouse: MousePosition,
	element: ElementPosition,
	options: CompareElementOptions
): ComparePositionResult => {
	const rect: Rect = {
		topLeft: { x: element.left, y: element.top },
		bottomRight: { x: element.right, y: element.bottom },
	};

	if (options.top) rect.topLeft.y = Math.max(rect.topLeft.y - options.top, 0);
	if (options.left) rect.topLeft.x = Math.max(rect.topLeft.x - options.left, 0);
	if (options.bottom) rect.bottomRight.y += options.bottom;
	if (options.right) rect.bottomRight.x += options.right;

	if (
		mouse.x >= rect.topLeft.x &&
		mouse.x <= rect.bottomRight.x &&
		mouse.y >= rect.topLeft.y &&
		mouse.y <= rect.bottomRight.y
	) {
		return ComparePositionResult.INSIDE;
	}

	return ComparePositionResult.OUTSIDE;
};
