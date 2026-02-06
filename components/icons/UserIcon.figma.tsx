import figma from "@figma/code-connect";
import { UserIcon } from "./UserIcon";

figma.connect(UserIcon, "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=170-20179", {
  example: () => <UserIcon />,
});
