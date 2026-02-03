import figma from "@figma/code-connect";
import NavTab from "./NavTab";

const sharedProps = {
  isActive: figma.boolean("isActive"),
  icon: figma.boolean("isActive", {
    true: figma.instance("iconActive"),
    false: figma.instance("iconDefault"),
  }),
};

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-267",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab variant="left" isActive={isActive} icon={icon} />
    ),
  }
);

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-284",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab variant="center" isActive={isActive} icon={icon} />
    ),
  }
);

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-300",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab variant="right" isActive={isActive} icon={icon} />
    ),
  }
);
