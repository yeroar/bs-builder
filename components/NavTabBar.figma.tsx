import React from "react"
import NavTabBar from "./NavTabBar"
import figma from "@figma/code-connect"

figma.connect(
  NavTabBar,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-443&t=kVKzATbYBdqXXugQ-4",
  {
    props: {
      activeTab: figma.enum("activeTab", {
        left: "left",
        center: "center",
        right: "right",
      }),
    },
    example: ({ activeTab }) => <NavTabBar activeTab={activeTab} />,
  },
)
