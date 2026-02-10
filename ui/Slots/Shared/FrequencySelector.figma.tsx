import React from "react";
import figma from "@figma/code-connect";
import FrequencySelectorSlot from "./FrequencySelectorSlot";

figma.connect(
  FrequencySelectorSlot,
  "https://figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=181-23545",
  {
    props: {
      children: figma.children("*"),
    },
    example: (props) => (
      <FrequencySelectorSlot
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
