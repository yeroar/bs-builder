import figma from "@figma/code-connect";
import TopContext from "./TopContext";

figma.connect(
  TopContext,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=74-18678",
  {
    props: {
      variant: figma.enum("variant", {
        "~฿": "btc",
        "Frequency": "frequency",
        "Giftcard": "giftcard",
        "Empty": "empty",
      }),
      label: figma.string("topLabel"),
    },
    example: ({ variant, label }) => <TopContext variant={variant} value={label} />,
  }
);
