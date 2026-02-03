import React from "react";
import ExchangeControl from "./ExchangeControl";
import figma from "@figma/code-connect";

figma.connect(
  ExchangeControl,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=41-1606",
  {
    props: {},
    example: () => (
      <ExchangeControl />
    ),
  }
);
