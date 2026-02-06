import figma from "@figma/code-connect";
import { CameraIcon } from "./CameraIcon";

figma.connect(
  CameraIcon,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=176-28411",
  {
    example: () => <CameraIcon />,
  }
);
