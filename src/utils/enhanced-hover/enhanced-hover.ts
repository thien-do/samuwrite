import { RefObject, useEffect } from "react";
import {
	CompareElementOptions,
	compareElementPosition,
	ComparePositionResult,
} from "./compare";

type callbackFn = () => void;

interface Props {
	options: CompareElementOptions;
	hoverIn?: callbackFn;
	hoverOut?: callbackFn;
}

export const useEnhancedHover = (ref: RefObject<HTMLElement>, props: Props) => {
	useEffect(() => {
		let mousePosition = ComparePositionResult.OUTSIDE;

		const onMouseMove = (event: MouseEvent) => {
			if (ref.current === null) return;
			const mouse = { x: event.x, y: event.y };
			const elementRect = ref.current.getBoundingClientRect();

			const r = compareElementPosition(mouse, elementRect, props.options);
			if (mousePosition !== r) {
				mousePosition = r;
				if (r === ComparePositionResult.INSIDE) {
					props.hoverIn?.();
				} else {
					props.hoverOut?.();
				}
			}
		};

		window.addEventListener("mousemove", onMouseMove);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, []);
};
