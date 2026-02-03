# Technical Debt & Improvement Tracker

> Last updated: 2026-01-28

---

## Table of Contents
1. [Completed Fixes](#completed-fixes)
2. [Pending Issues](#pending-issues)
3. [Component Improvements](#component-improvements)
4. [Figma Code Connect Audit](#figma-code-connect-audit)
5. [Token Standardization](#token-standardization)
6. [Architecture Recommendations](#architecture-recommendations)

---

## Completed Fixes

### Critical Bugs (Fixed)

| Issue | File | Description | Status |
|-------|------|-------------|--------|
| Undefined variable | `ToggleRow.tsx:50` | `hasDescription` was undefined, changed to `description &&` | ✅ Fixed |
| Typo in Figma prop | `ListItemTransaction.figma.tsx:16` | `" rightColumn"` had leading space, removed | ✅ Fixed |
| Missing `showHeader` mapping | `MiniModal.figma.tsx` | `hasTopNav` wasn't mapped to `showHeader` prop | ✅ Fixed |
| Modal double layer | `BankScreen.tsx` | Backdrop appeared as separate modal when closing | ✅ Fixed |

### Token Standardization (Fixed)

#### Colors Converted to Tokens
| File | Line | Before | After |
|------|------|--------|-------|
| `MiniModal.tsx` | 101 | `"#FD3"` | `colorMaps.object.primary.bold.default` |
| `ListItem.tsx` | 58 | `"#0066FF"` | `colorMaps.face.accentBold` |
| `BankScreen.tsx` | 141 | `"#fff"` | `colorMaps.face.inversePrimary` |
| `BankScreen.tsx` | 143 | `"#E56910"` | `colorMaps.face.negativeBold` |
| `Toggle.tsx` | 84 | `"#000"` | `colorMaps.face.primary` |
| `CategoryBoostsTile.tsx` | 72 | `"#6A5F55"` | `colorMaps.face.tertiary` |

#### Spacing Converted to Tokens
| File | Line | Before | After |
|------|------|--------|-------|
| `FoldPageViewHeader.tsx` | 226 | `16` | `spacing["400"]` |
| `RootTemplate.tsx` | 97 | `24` | `spacing["600"]` |
| `FullscreenTemplate.tsx` | 79 | `24` | `spacing["600"]` |
| `NavTabBar.tsx` | 78 | `8` | `spacing["200"]` |
| `ExchangeScreen.tsx` | 56 | `16` | `spacing["400"]` |
| `TagScreen.tsx` | 50 | `24` | `spacing["600"]` |

---

## Pending Issues

### Medium Priority

| Issue | File | Description | Effort |
|-------|------|-------------|--------|
| Missing `chipLabel` mapping | `RowSelector.figma.tsx` | Figma has `chipLabel` prop but it's not mapped | 5 min |
| Missing `type` mapping | `ModalFooter.figma.tsx` | Figma has `type` (dulaButton/default) not mapped | 10 min |
| Missing `hasDisclaimer` mapping | `ModalFooter.figma.tsx` | Boolean toggle not mapped | 5 min |
| Hardcoded example values | `ListItemTransaction.figma.tsx` | Uses hardcoded strings instead of Figma data | 15 min |
| Prop naming inconsistency | Multiple files | `hasDiv` vs `showDivider` naming | 20 min |

### Low Priority

| Issue | File | Description | Effort |
|-------|------|-------------|--------|
| Missing `size` prop | `ListItemFeature` | Figma has size (lrg/med/sml) not in component | 30 min |
| Missing `isActive` prop | `ListItemFeature` | Figma has isActive toggle not in component | 20 min |
| Missing `hasFaceId` prop | `ListItemFeature` | Figma has FaceID icon toggle not in component | 15 min |
| Missing `hasFootnoteChips` prop | `ListItemFeature` | Figma has footnote chips toggle not in component | 15 min |
| Custom spacing values | Multiple | Values like 10, 14, 46 don't map to tokens | N/A |

---

## Component Improvements

### 1. MiniModal - Separate Handle from Header
**Priority:** Medium
**Effort:** 30 min

Currently `showHeader` controls both the handle (drag indicator) and the header section. These should be separate:

```tsx
// Proposed API
interface MiniModalProps {
  showHandle?: boolean;  // Controls yellow drag indicator (default: true)
  showHeader?: boolean;  // Controls header section only (default: true)
  // ... existing props
}
```

**Files to modify:**
- `components/modals/MiniModal.tsx`
- `components/modals/MiniModal.figma.tsx`

---

### 2. ModalFooter - Add Link Text Pattern
**Priority:** Low
**Effort:** 20 min

Currently requires custom ReactNode for disclaimers with styled links. Add convenience props:

```tsx
// Proposed API
interface ModalFooterProps {
  disclaimer?: string;
  disclaimerLink?: {
    text: string;
    onPress?: () => void;
  };
  // ... existing props
}

// Usage
<ModalFooter
  disclaimer="Activate by phone: "
  disclaimerLink={{ text: "1-833-904-2761", onPress: handleCall }}
/>
```

**Files to modify:**
- `components/modals/ModalFooter.tsx`
- `components/modals/ModalFooter.figma.tsx`

---

### 3. Extract Shared Primitives
**Priority:** Low
**Effort:** 1-2 hours

#### 3a. Divider Component
Multiple components implement dividers differently. Extract to shared primitive:

```tsx
// components/Primitives/Divider.tsx
interface DividerProps {
  position?: "top" | "bottom";
  insetLeft?: number;
  insetRight?: number;
  color?: string;
}
```

**Components to refactor:**
- `ToggleRow.tsx`
- `ListItem.tsx`
- `RowSelector.tsx`

#### 3b. SelectionIndicator Component
Extract selection indicator pattern:

```tsx
// components/Primitives/SelectionIndicator.tsx
interface SelectionIndicatorProps {
  selected: boolean;
  size?: number;
}
```

**Components to refactor:**
- `RowSelector.tsx`
- `TileSelector.tsx`

---

### 4. Standardize Prop Naming
**Priority:** Medium
**Effort:** 30 min

| Current | Proposed | Components |
|---------|----------|------------|
| `hasDiv` | `showDivider` | ToggleRow |
| `isSelected` | `selected` | ToggleRow, RowSelector |
| `leadingIcon` / `leadingSlot` | `leadingSlot` | Button, ListItem |

**Files to modify:**
- `components/Toggle/ToggleRow.tsx`
- `components/Toggle/ToggleRow.figma.tsx`

---

## Figma Code Connect Audit

### Components with Complete Mappings ✅
- `Button.figma.tsx`
- `MiniModal.figma.tsx` (after fix)
- `ToggleRow.figma.tsx`
- `TextField.figma.tsx`
- `ProductSurfacePrimary.figma.tsx`

### Components Needing Updates

#### RowSelector.figma.tsx
```tsx
// Add missing prop
props: {
  // ... existing
  chipLabel: figma.string("chipLabel"), // ADD THIS
},
example: (props) => (
  <RowSelector
    // ... existing
    chipLabel={props.chipLabel} // ADD THIS
  />
),
```

#### ModalFooter.figma.tsx
```tsx
// Add missing props
props: {
  type: figma.enum("type", {           // ADD THIS
    default: "stacked",
    dulaButton: "sideBySide",
  }),
  hasDisclaimer: figma.boolean("hasDisclaimer"), // ADD THIS
  disclaimer: figma.boolean("hasDisclaimer", {
    true: figma.string("disclaimer"),
    false: undefined,
  }),
  // ... existing
},
```

#### ListItemTransaction.figma.tsx
```tsx
// Replace hardcoded values with Figma data
props: {
  // ... existing
  title: figma.string("title"),              // ADD
  secondaryText: figma.string("secondaryText"), // ADD
  rightTitle: figma.string("rightTitle"),       // ADD
  rightSecondaryText: figma.string("rightSecondaryText"), // ADD
},
example: (props) => (
  <ListItem
    variant="transaction"
    title={props.title}                    // USE PROP
    secondaryText={props.secondaryText}    // USE PROP
    rightTitle={props.rightTitle}          // USE PROP
    rightSecondaryText={props.rightSecondaryText} // USE PROP
    // ...
  />
),
```

### Best Practices for Code Connect

1. **Always pair boolean toggles with content props:**
```tsx
showHeader: figma.boolean("hasTopNav"),
header: figma.boolean("hasTopNav", {
  true: figma.children("topNav"),
  false: undefined,
}),
```

2. **Use `figma.nestedProps` for nested components:**
```tsx
textContainerProps: figma.nestedProps("textContainer", {
  state: figma.enum("state", { ... }),
  placeholder: figma.string("placeholderText"),
}),
```

3. **Document Figma → Code mappings:**
```tsx
/**
 * @figma https://figma.com/design/XXX?node-id=YYY
 * @figmaProps
 * - hasTopNav → showHeader
 * - hasFooter → footer (conditional)
 * - variant → variant
 */
```

---

## Token Standardization

### Custom Values Without Tokens
These values don't map to existing spacing tokens. Consider adding to token system or documenting as intentional:

| Value | Used In | Closest Token | Action |
|-------|---------|---------------|--------|
| `10` | IconContainer, ToggleRow | 8 or 12 | Add `spacing["250"]` = 10? |
| `14` | Toast | 12 or 16 | Add `spacing["350"]` = 14? |
| `46` | NavTabBar | 48 | Keep as custom |

### Icon Default Colors
Icon components use hardcoded default colors that match tokens. This is acceptable because:
- Colors can be overridden via props
- Adding imports to every icon adds overhead
- Values match the design system

| Icon | Default | Equivalent Token |
|------|---------|------------------|
| Most icons | `#383323` | `colorMaps.face.primary` |
| InfoCircleIcon | `#7A6E53` | `colorMaps.face.tertiary` |
| XCircleIcon | `#C7281B` | `colorMaps.face.negativeBold` |
| AlertHexagonIcon | `#D22619` | `colorMaps.face.negativeBold` |

### Files Still Using Hardcoded Values (Acceptable)

| File | Reason |
|------|--------|
| `IconLibrary.tsx` | Development/documentation file |
| `KeyboardTestScreen.tsx` | Test file |
| `ChartSkeleton.tsx` | SVG stroke color |
| `SkeuomorphicButtonBorder.tsx` | Complex gradient stops |
| Icon `*.tsx` files | Default colors (overridable) |

---

## Architecture Recommendations

### 1. Create Shared Types
```tsx
// types/common.ts
export type VisualState = "default" | "pressed" | "focused" | "disabled";

export interface SlotProps {
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
}

export interface DividerProps {
  showDivider?: boolean;
}
```

### 2. Component Documentation Template
Add to each component:
```tsx
/**
 * ComponentName
 *
 * @description Brief description of the component
 * @figma https://figma.com/design/XXX?node-id=YYY
 *
 * @example
 * <ComponentName variant="primary" onPress={() => {}} />
 */
```

### 3. Testing Checklist
For each component, ensure:
- [ ] All Figma props are mapped in `.figma.tsx`
- [ ] No hardcoded colors (use `colorMaps`)
- [ ] No hardcoded spacing (use `spacing` tokens)
- [ ] Props use consistent naming (`show*` for visibility)
- [ ] Component has `testID` prop for testing

---

## Quick Reference: Token Values

### Spacing
| Token | Value |
|-------|-------|
| `spacing["50"]` | 2px |
| `spacing["100"]` | 4px |
| `spacing["150"]` | 6px |
| `spacing["200"]` | 8px |
| `spacing["300"]` | 12px |
| `spacing["400"]` | 16px |
| `spacing["500"]` | 20px |
| `spacing["600"]` | 24px |
| `spacing["800"]` | 32px |
| `spacing["1000"]` | 40px |
| `spacing["1200"]` | 48px |

### Common Color Tokens
| Token | Use Case |
|-------|----------|
| `colorMaps.face.primary` | Primary text |
| `colorMaps.face.secondary` | Secondary text |
| `colorMaps.face.tertiary` | Tertiary/muted text |
| `colorMaps.face.accentBold` | Links, accent text |
| `colorMaps.face.negativeBold` | Error text |
| `colorMaps.face.positiveBold` | Success text |
| `colorMaps.face.inversePrimary` | White text on dark |
| `colorMaps.object.primary.bold.default` | Primary button bg |
| `colorMaps.object.secondary.default` | Secondary button bg |
| `colorMaps.object.tertiary.default` | Card backgrounds |
| `colorMaps.border.tertiary` | Subtle borders |

---

## Progress Tracker

### Sprint 1 (Completed)
- [x] Fix ToggleRow `hasDescription` bug
- [x] Fix ListItemTransaction typo
- [x] Fix MiniModal `showHeader` mapping
- [x] Fix modal backdrop issue
- [x] Convert hardcoded colors to tokens
- [x] Convert hardcoded spacing to tokens

### Sprint 2 (Pending)
- [ ] Add missing Figma Code Connect mappings
- [ ] Standardize prop naming (`hasDiv` → `showDivider`)
- [ ] Extract Divider primitive
- [ ] Extract SelectionIndicator primitive

### Sprint 3 (Future)
- [ ] Add missing ListItemFeature props (size, isActive, etc.)
- [ ] Create shared types file
- [ ] Add component documentation
- [ ] Consider adding spacing tokens for 10, 14

---

## Contributing

When adding new components:
1. Use tokens for all colors and spacing
2. Create `.figma.tsx` file with complete prop mappings
3. Follow prop naming conventions (`show*`, `has*`, `*Slot`)
4. Add `testID` prop for testing
5. Update this document if adding technical debt
