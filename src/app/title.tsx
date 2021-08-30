import { Helmet } from "react-helmet";
import { FileState } from "~src/components/file/state";

interface Props {
	file: FileState;
}

const getTitle = (file: FileState): string => {
	const prefix = file.dirty ? "* " : "";
	const name = file.handle?.name ?? "Untitled";
	return `${prefix}${name} - Samuwrite`;
};

export const AppTitle = (props: Props): JSX.Element => (
	<Helmet>
		<title>{getTitle(props.file)}</title>
	</Helmet>
);
