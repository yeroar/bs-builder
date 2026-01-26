import React from "react"
import ProgressIndicator from "./ProgressIndicator"
import figma from "@figma/code-connect"

figma.connect(
  ProgressIndicator,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=8-74&t=sKo2eAiZRSnzJgfo-4",
  {
    props: {
      variant: figma.enum("variant", {
        "01": "01",
        "02": "02",
        "03": "03",
        "04": "04",
      }),
    },
    example: ({ variant }) => <ProgressIndicator variant={variant} />,
  },
)
