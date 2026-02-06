import figma from "@figma/code-connect";
import Ring from "./Ring";

figma.connect(
  Ring,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=157-19771",
  {
    props: {
      percentage: figma.enum("state", {
        "0%": 0,
        "25%": 25,
        "50%": 50,
        "75%": 75,
        "100%": 100,
      }),
    },
    example: (props) => (
      <Ring
        percentage={props.percentage}
        size={280}
        onChange={() => { }}
      />
    ),
  }
);
