import figma from "@figma/code-connect";
import { EyeIcon } from "./EyeIcon";

figma.connect(EyeIcon, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-19554", {
  example: () => <EyeIcon />,
});
