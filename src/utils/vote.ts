const ISSUES_URL = "https://github.com/samuwrite/samuwrite/issues";

const MESSAGE = `
This feature is not yet available. Would you like to vote for it?

Click OK to go to the corresponding issue on our GitHub.
`.trim();

export const vote = (issue: number): void => {
	const confirm = window.confirm(MESSAGE);
	if (confirm === false) return;
	const url = `${ISSUES_URL}/${issue}`;
	window.open(url);
};
