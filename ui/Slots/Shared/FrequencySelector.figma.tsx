import React from "react";
import figma from "@figma/code-connect";
import FrequencySelector from "./FrequencySelector";

figma.connect(
  FrequencySelector,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-23545",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => (
      <FrequencySelector
        options={[
          { label: "Daily", value: "Daily" },
          { label: "Weekly", value: "Weekly" },
          { label: "Monthly", value: "Monthly" },
        ]}
        selectedValue="Daily"
        onSelect={(value) => {}}
      />
    ),
  }
);
