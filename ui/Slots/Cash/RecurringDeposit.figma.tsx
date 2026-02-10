import figma from "@figma/code-connect";
import RecurringDeposit from "./RecurringDeposit";

figma.connect(
  RecurringDeposit,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=180-24681",
  {
    props: {
      hasActive: figma.boolean("hasActive"),
    },
    example: (props) => <RecurringDeposit hasActive={props.hasActive} />,
  }
);
