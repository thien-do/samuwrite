const openFile = async () => {
	const [handle] = await window.showOpenFilePicker();
	const file = await handle.getFile();
	const content = await file.text();
	console.log("content", content);
};

export const Toolbar = () => (
	<div>
		<button onClick={openFile}>Open</button>
	</div>
);
