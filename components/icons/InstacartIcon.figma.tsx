import React from "react";
import figma from "@figma/code-connect";
import { InstacartIcon } from "./InstacartIcon";

figma.connect(InstacartIcon, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=277:22719", {
  example: () => <InstacartIcon />,
});
