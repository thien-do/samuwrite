export const isMac = (): boolean => window.navigator.platform.startsWith("Mac");

export const isIOS = (): boolean =>
	["iPhone", "iPad", "iPod"].some((model) =>
		navigator.platform.startsWith(model)
	);

export const isApple = (): boolean => isMac() || isIOS();
