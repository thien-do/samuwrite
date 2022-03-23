const ISSUES_URL = "https://github.com/thien-do/samuwrite/issues";

const MESSAGE = `
This feature is not yet available. Would you like to vote for it?
`.trim();

export const vote = (issue: number): void => {
	const confirm = window.confirm(MESSAGE);
	if (confirm === false) return;
	const url = `${ISSUES_URL}/${issue}`;
	window.open(url);
};
