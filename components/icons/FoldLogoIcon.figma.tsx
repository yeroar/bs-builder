import React from "react";
import figma from "@figma/code-connect";
import { FoldLogoIcon } from "./FoldLogoIcon";

figma.connect(FoldLogoIcon, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=277:22832", {
  example: () => <FoldLogoIcon />,
});
