import { ChangeEventHandler, ForwardedRef } from "react";
import { VscChevronDown } from "react-icons/vsc";
import s from "./select.module.css";

interface Option<T> {
	value: T;
	id: string;
	label: string;
	disabled?: boolean;
}

interface Props<T> {
	options: Option<T>[];
	autoFocus?: boolean;
	defaultValue?: T;
	forwardedRef?: ForwardedRef<HTMLSelectElement>;
	value?: T;
	setValue?: (value: T) => void;
	disabled?: boolean;
	fill?: boolean;
}

const findId = <T,>(props: Props<T>, value?: T): string | undefined => {
	return props.options.find((o) => o.value === value)?.id;
};

const onChange =
	<T,>(props: Props<T>): ChangeEventHandler<HTMLSelectElement> =>
	(event): void => {
		if (props.setValue === undefined) return;
		const id = event.target.value;
		const option = props.options.find((o) => o.id === id);
		if (!option) throw Error(`Option not found: "${id}"`);
		props.setValue(option.value);
	};

export const Select = <T,>(props: Props<T>): JSX.Element => {
	const value = findId(props, props.value);
	const defaultValue = findId(props, props.defaultValue);

	return (
		<div className={[s.container, s.fill].join(" ")}>
			<select
				className={s.select}
				disabled={props.disabled}
				autoFocus={props.autoFocus}
				// Uncontrolled
				defaultValue={defaultValue}
				ref={props.forwardedRef}
				// Controlled
				value={value}
				onChange={onChange(props)}
			>
				{props.options.map((option) => (
					<option key={option.id} value={option.id} disabled={option.disabled}>
						{option.label}
					</option>
				))}
			</select>
			<VscChevronDown size={16} className={s.arrow} />
		</div>
	);
};
