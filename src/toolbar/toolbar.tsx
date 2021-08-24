interface Props {
	setValue: (value: string) => void;
}

const openFile = (props: Props) => async () => {
	const [handle] = await window.showOpenFilePicker();
	const file = await handle.getFile();
	const text = await file.text();
	props.setValue(text);
};

export const Toolbar = (props: Props) => (
	<div>
		<button onClick={openFile(props)}>Open</button>
	</div>
);
