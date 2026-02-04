# Fold Design System Rules

## 1. Token Definitions

### Location
All design tokens are defined in `components/tokens/`:
- `colorPrimitives.ts` - Raw color values (yellow, gray, red, green, blue palettes)
- `colorMaps.ts` - Semantic color mappings (layer, object, face, border)
- `spacing.ts` - Spacing scale
- `typography.ts` - Font styles
- `radius.ts` - Border radius values

### Usage
```tsx
import { colorMaps, spacing, radius, typographyStyles } from "../../components/tokens";

// Colors - always use semantic colorMaps, not primitives
backgroundColor: colorMaps.layer.background
color: colorMaps.face.primary
borderColor: colorMaps.border.secondary

// Spacing - use string keys
gap: spacing["400"]        // 16px
padding: spacing["600"]    // 24px
margin: spacing["300"]     // 12px

// Radius
borderRadius: radius.md    // 8
borderRadius: radius.lg    // 12
```

### Spacing Scale
| Token | Value |
|-------|-------|
| `"50"` | 2px |
| `"100"` | 4px |
| `"200"` | 8px |
| `"300"` | 12px |
| `"400"` | 16px |
| `"500"` | 20px |
| `"600"` | 24px |
| `"800"` | 32px |
| `"1000"` | 40px |

---

## 2. Component Library Structure

### Location
```
components/
├── tokens/              # Design tokens
├── Icons/               # SVG icons as React components
├── Primitives/          # Base components (Button, FoldText, Divider, etc.)
├── DataDisplay/         # Headers, ListItems, etc.
├── Inputs/              # Form inputs, QuickBuyInput, etc.
├── Navigation/          # TopNav, TabBar
├── CurrencyInput/       # Currency display component
├── modals/              # Modal components
└── ...
```

### Component Pattern
Each component may have:
- `Component.tsx` - Main component
- `Component.figma.tsx` - Figma Code Connect mapping

```tsx
// Component.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { colorMaps, spacing } from "../../tokens";

export interface ComponentProps {
  // props
}

export default function Component({ ...props }: ComponentProps) {
  return (
    <View style={styles.container}>
      {/* content */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
    padding: spacing["400"],
  },
});
```

---

## 3. Typography

### FoldText Component
Always use `FoldText` for text rendering:
```tsx
import { FoldText } from "../../components/Primitives/FoldText";

<FoldText type="header-lg">Title</FoldText>
<FoldText type="body-md" style={{ color: colorMaps.face.secondary }}>Body text</FoldText>
```

### Typography Scale
| Type | Size | Weight | Line Height |
|------|------|--------|-------------|
| `header-xl` | 40 | 400 | 44 |
| `header-lg` | 32 | 400 | 36 |
| `header-md` | 24 | 400 | 28 |
| `header-sm` | 20 | 400 | 24 |
| `header-xs` | 18 | 400 | 20 |
| `body-lg` | 16 | 400 | 24 |
| `body-md` | 14 | 400 | 20 |
| `body-sm` | 12 | 400 | 16 |
| `caption` | 10 | 400 | 12 |
| `button-lg` | 16 | 500 | 16 |
| `button-sm` | 14 | 500 | 14 |

Font family: **Geist**

---

## 4. Icon System

### Location
Icons are in `components/Icons/` as React Native SVG components.

### Pattern
```tsx
import React from "react";
import Svg, { Path } from "react-native-svg";
import { colorMaps } from "../tokens";

interface IProps extends SvgProps {}

export const IconName = (props: IProps) => {
  const { color = colorMaps.face.primary, ...rest } = props;
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...rest}>
      <Path fill={color} d="..." />
    </Svg>
  );
};

export default IconName;
```

### Usage
```tsx
import { BellIcon } from "../../components/Icons/BellIcon";

<BellIcon width={24} height={24} color={colorMaps.face.primary} />
```

### Naming Convention
- `{Name}Icon.tsx` - Component file
- `{Name}Icon.figma.tsx` - Figma Code Connect

---

## 5. UI Architecture

### Structure
```
ui/
├── Screens/           # Full page views
│   ├── mainTabs/      # Main tab screens (Bank, Exchange, Tag)
│   └── flows/         # Multi-step flows (BtcBuyFlow, DepositFlow)
├── Slots/             # Reusable content blocks
│   ├── BTC/           # Bitcoin-related slots
│   ├── Cash/          # Cash/deposit slots
│   ├── GiftCard/      # Gift card slots
│   ├── ActivateCards/ # Card activation slots
│   └── MainTabs/      # Main tab content slots
└── Templates/         # Layout templates
    ├── EnterAmount/   # Amount input template
    ├── TxConfirmation/# Transaction confirmation template
    └── Success/       # Success state template
```

### Screen vs Slot
- **Screen**: Full page with navigation, uses Templates
- **Slot**: Composable content block, no navigation wrapper
- **Template**: Layout structure with slots for content

```tsx
// Screen composes Slots within Templates
<RootTemplate>
  <BankHomeSlot />  // Slot provides content
</RootTemplate>
```

---

## 6. Figma Code Connect

### Pattern
```tsx
import React from "react";
import Component from "./Component";
import figma from "@figma/code-connect";

figma.connect(
  Component,
  "https://www.figma.com/design/NpygZcXGZbJqCAWqD2mNEE/MCP?node-id=XX-XXX",
  {
    props: {
      label: figma.string("label"),
      variant: figma.enum("variant", {
        primary: "primary",
        secondary: "secondary",
      }),
      hasIcon: figma.boolean("hasIcon", {
        true: figma.instance("iconSlot"),
        false: undefined,
      }),
      children: figma.children("*"),
    },
    example: (props) => (
      <Component
        label={props.label}
        variant={props.variant}
        iconSlot={props.hasIcon}
      >
        {props.children}
      </Component>
    ),
  }
);
```

### Key Mappings
- `figma.string("propName")` - Text content
- `figma.enum("propName", {...})` - Variant selection
- `figma.boolean("propName", {...})` - Conditional props
- `figma.instance("slotName")` - Nested component instance
- `figma.children("*")` - All children

---

## 7. Styling Approach

### React Native StyleSheet
Always use `StyleSheet.create()`:
```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
    padding: spacing["400"],
    gap: spacing["300"],
  },
  title: {
    color: colorMaps.face.primary,
  },
});
```

### Pressable States
Use `FoldPressable` for touch interactions:
```tsx
import FoldPressable from "../../components/Primitives/FoldPressable";

<FoldPressable onPress={handlePress}>
  <Content />
</FoldPressable>
```

---

## 8. Color Semantic Guide

### Layer (Backgrounds)
- `layer.background` - Main background (cream/off-white)
- `layer.primary` - Primary surface
- `layer.secondary` - Secondary surface

### Face (Text/Icons)
- `face.primary` - Primary text (dark)
- `face.secondary` - Secondary text
- `face.tertiary` - Tertiary/muted text
- `face.inversePrimary` - Light text on dark
- `face.positiveBold` - Success text (green)
- `face.negativeBold` - Error text (red)
- `face.accentBold` - Accent text (blue)

### Object (Interactive Elements)
- `object.primary.bold.default` - Primary button (yellow)
- `object.secondary.default` - Secondary button
- `object.inverse.default` - Inverse button (dark)
- `object.positive.bold.default` - Success state
- `object.negative.bold.default` - Error state

### Border
- `border.secondary` - Default border
- `border.primary` - Primary/active border
- `border.focused` - Focus state

---

## 9. Common Components

### Button
```tsx
import Button from "../../components/Primitives/Buttons/Button/Button";

<Button
  label="Continue"
  hierarchy="primary" | "secondary" | "tertiary" | "inverse" | "destructive"
  size="lg" | "md" | "sm" | "xs"
  disabled={false}
  onPress={handlePress}
/>
```

### Divider
```tsx
import Divider from "../../components/Primitives/Divider/Divider";

<Divider />
<Divider inset />
```

### IconContainer
```tsx
import IconContainer from "../../components/Primitives/IconContainer/IconContainer";

<IconContainer
  brand="uber"
  size="sm" | "md" | "lg"
  variant="default-fill" | "default-stroke"
  icon={<CustomIcon />}
/>
```

### ListItem
```tsx
import ListItem from "../../components/DataDisplay/ListItem/ListItem";

<ListItem
  variant="feature" | "default"
  title="Title"
  secondaryText="Description"
  leadingSlot={<Icon />}
  trailingSlot={<ChevronRightIcon />}
  onPress={handlePress}
/>
```
