import { Menu as HLMenu } from "@headlessui/react";
import { ForwardedRef, forwardRef, useState } from "react";
import { Button, ButtonProps } from "~/src/button/button";
import { Key } from "~/src/key/key";
import sPopover from "~/src/popover/popover.module.css";
import { PopoverPortal } from "~/src/popover/portal/portal";
import { PopoverShortcut } from "~/src/popover/shortcut/shortcut";
import { MenuDivider } from "./divider/divider";
import { MenuHelp } from "./help/help";
import { MenuItem as MenuItemType } from "./item/interface";
import { MenuItem as MenuItemComponent } from "./item/item";
import s from "./menu.module.css";

interface Props {
  items: MenuItemType[];
  button: ButtonProps;
  shortcut?: string;
}

const Help = (): JSX.Element => (
  <div>
    <Key>↑</Key>
    <span> </span>
    <Key>↓</Key>
    <span> to navigate, </span>
    <Key>↵</Key>
    <span> to select</span>
    {/* <Key>esc</Key>
		<span> to close</span> */}
  </div>
);

interface BodyProps extends Props {
  buttonRef: ForwardedRef<HTMLButtonElement>;
  open: boolean;
}

const Body = (props: BodyProps): JSX.Element => {
  const [reference, setReference] = useState<HTMLElement | null>(null);
  return (
    <>
      {props.shortcut !== undefined && (
        <PopoverShortcut keys={props.shortcut} reference={reference} />
      )}
      <div ref={setReference}>
        <HLMenu.Button
          as={Button}
          ref={props.buttonRef}
          selected={props.open}
          {...props.button}
        />
      </div>
      <PopoverPortal open={props.open} reference={reference}>
        <HLMenu.Items static className={[sPopover.container, s.list].join(" ")}>
          {props.items.map((item, index) => (
            <MenuItemComponent key={index} item={item} />
          ))}
          <MenuDivider />
          <MenuHelp help={{ content: <Help /> }} />
        </HLMenu.Items>
      </PopoverPortal>
    </>
  );
};

export const Menu = forwardRef<HTMLButtonElement, Props>(
  (props, buttonRef): JSX.Element => (
    <HLMenu>
      {({ open }) => <Body {...props} open={open} buttonRef={buttonRef} />}
    </HLMenu>
  )
);
