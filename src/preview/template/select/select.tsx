import { PrefsState } from "~src/prefs/state";
import { Select } from "~src/select/select";
import { PREVIEW_TEMPLATE_NAMES } from "../state";

interface Props {
	prefs: PrefsState;
}

export const PreviewTemplateSelect = (props: Props): JSX.Element => (
	<Select
		value={props.prefs.previewTemplate}
		setValue={props.prefs.setPreviewTemplate}
		options={PREVIEW_TEMPLATE_NAMES.map((name) => ({
			id: name,
			label: name,
			value: name,
		}))}
	/>
);
