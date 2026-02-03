import React from "react";
import figma from "@figma/code-connect";
import GCCategoriesSlot from "./GCCategoriesSlot";

figma.connect(
  GCCategoriesSlot,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=105-10401",
  {
    example: () => (
      <GCCategoriesSlot
        selectedCategories={[]}
        onCategoryToggle={(category) => console.log("Toggled:", category)}
      />
    ),
  }
);
