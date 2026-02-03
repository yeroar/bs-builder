import figma from "@figma/code-connect";
import ReceiptDetails from "./ReceiptDetails";

// BTC transaction confirm details
figma.connect(ReceiptDetails, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=115-15443", {
  props: {
    children: figma.children("*"),
  },
  example: ({ children }) => (
    <ReceiptDetails>
      {children}
    </ReceiptDetails>
  ),
});

// Gift card transaction confirm details
figma.connect(ReceiptDetails, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=115-15784", {
  props: {
    children: figma.children("*"),
  },
  example: ({ children }) => (
    <ReceiptDetails>
      {children}
    </ReceiptDetails>
  ),
});

// Cash deposit transaction details
figma.connect(ReceiptDetails, "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=116-12186", {
  props: {
    children: figma.children("*"),
  },
  example: ({ children }) => (
    <ReceiptDetails>
      {children}
    </ReceiptDetails>
  ),
});
