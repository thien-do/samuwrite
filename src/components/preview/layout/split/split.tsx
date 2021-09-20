import { PrefsState } from "~src/components/prefs/state";

interface Props {
	prefs: PrefsState;
}

export const PreviewLayoutSplit = (props: Props): JSX.Element => (
	<label>
		Preview split
		<input
			type="checkbox"
			checked={props.prefs.previewSplit}
			onChange={(event) => {
				props.prefs.setPreviewSplit(event.target.checked);
			}}
		/>
	</label>
);
