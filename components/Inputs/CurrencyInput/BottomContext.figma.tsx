import figma from "@figma/code-connect";
import BottomContext from "./BottomContext";

figma.connect(
  BottomContext,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18689",
  {
    props: {
      variant: figma.enum("variant", {
        "Max button": "maxButton",
        "Payment method": "paymentMethod",
        "Add payment method": "addPaymentMethod",
        "Empty": "empty",
      }),
      children: figma.children("*"),
    },
    example: ({ variant, children }) => (
      <BottomContext variant={variant}>{children}</BottomContext>
    ),
  }
);
