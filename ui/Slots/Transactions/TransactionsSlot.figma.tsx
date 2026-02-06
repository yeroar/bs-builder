import figma from "@figma/code-connect";
import TransactionsSlot from "./TransactionsSlot";

figma.connect(
  TransactionsSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=50-17184",
  {
    props: {},
    example: () => (
      <TransactionsSlot
        onTransactionPress={(transaction) => console.log("Transaction pressed", transaction.id)}
      />
    ),
  }
);
