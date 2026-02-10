import figma from "@figma/code-connect";
import Transactions from "./Transactions";

figma.connect(
  Transactions,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=50-17184",
  {
    props: {},
    example: () => (
      <Transactions
        onTransactionPress={(transaction) => console.log("Transaction pressed", transaction.id)}
      />
    ),
  }
);
