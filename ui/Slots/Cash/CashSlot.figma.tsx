import figma from "@figma/code-connect";
import CashSlot from "./CashSlot";

figma.connect(
  CashSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=167-17984",
  {
    props: {
      cashAmount: figma.string("amount"),
    },
    example: (props) => (
      <CashSlot
        cashAmount={props.cashAmount}
        onAddCashPress={() => {}}
        onAuthorizedUsersPress={() => {}}
        onRoundUpsPress={() => {}}
        onDirectDepositPress={() => {}}
        onSeeAllTransactionsPress={() => {}}
      />
    ),
  }
);
