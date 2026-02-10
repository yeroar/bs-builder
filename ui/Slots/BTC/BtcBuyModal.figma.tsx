import figma from "@figma/code-connect";
import BtcBuyModal from "./BtcBuyModal";

figma.connect(
  BtcBuyModal,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18340",
  {
    example: () => <BtcBuyModal selectedAmount={null} onSelectAmount={() => {}} />,
  }
);
