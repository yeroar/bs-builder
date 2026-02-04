import figma from "@figma/code-connect";
import { CreditCardDownloadIcon } from "./CreditCardDownloadIcon";

figma.connect(
  CreditCardDownloadIcon,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=133-16476",
  {
    example: () => <CreditCardDownloadIcon />,
  }
);
