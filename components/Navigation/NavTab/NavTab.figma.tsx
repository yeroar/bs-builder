import React from "react"
import NavTab from "./NavTab"
import figma from "@figma/code-connect"

const sharedProps = {
  isActive: figma.boolean("isActive"),
  icon: figma.boolean("isActive", {
    true:figma.instance("iconActive"),
    false:figma.instance("iconDefault"),
  })
}

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-267&t=kVKzATbYBdqXXugQ-4",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab 
        variant="left" 
        isActive={isActive} 
        onPress={() => {}} 
        icon={icon}
      />
    ),
  },
)

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-284&t=kVKzATbYBdqXXugQ-4",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab 
        variant="center" 
        isActive={isActive} 
        onPress={() => {}} 
        icon={icon}
      />
    ),
  },
)

figma.connect(
  NavTab,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=5-300&t=kVKzATbYBdqXXugQ-4",
  {
    props: sharedProps,
    example: ({ isActive, icon }) => (
      <NavTab 
        variant="right" 
        isActive={isActive} 
        onPress={() => {}} 
        icon={icon}
      />
    ),
  },
)
