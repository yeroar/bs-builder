import figma from "@figma/code-connect";
import { ShieldIcon } from "./ShieldIcon";

figma.connect(ShieldIcon, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-19562", {
  example: () => <ShieldIcon />,
});
