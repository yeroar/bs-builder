import figma from "@figma/code-connect";
import { PlusIcon } from "./PlusIcon";

figma.connect(PlusIcon, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20180", {
  example: () => <PlusIcon />,
});
