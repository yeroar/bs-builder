import figma from "@figma/code-connect";
import RecurringDepositDetails from "./RecurringDepositDetails";

figma.connect(
  RecurringDepositDetails,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-25590",
  {
    props: {
      state: figma.enum("state", {
        active: "active",
        paused: "paused",
      }),
    },
    example: (props) => <RecurringDepositDetails state={props.state} />,
  }
);
