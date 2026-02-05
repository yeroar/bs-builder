# UI Architecture

This directory contains the user interface layer of the application, organized into four main categories that work together to create complete user experiences.

## Directory Structure

```
ui/
├── Screens/          # Top-level screens and user flows
│   ├── flows/        # Multi-step user journeys
│   │   ├── BTC/      # Bitcoin-related flows
│   │   └── Cash/     # Cash/deposit flows
│   └── mainTabs/     # Main tab screens
├── Slots/            # Domain-specific content sections
│   ├── ActivateCards/
│   ├── BTC/
│   ├── Cash/
│   ├── GiftCard/
│   └── MainTabs/
├── Patterns/         # Cross-domain reusable patterns
│   └── PaymentMethods/
└── Templates/        # Reusable layout scaffolds
    ├── EnterAmount/
    ├── Success/
    └── TxConfirmation/
```

## Core Concepts

### Templates
Layout scaffolds that provide consistent structure. Templates handle:
- Navigation headers
- Content areas
- Footers
- Animations

Use templates when you need a standard screen layout (fullscreen, root tab, confirmation, etc.).

### Slots
Self-contained, domain-specific UI modules. Slots:
- Are organized by domain (BTC, Cash, GiftCard)
- Handle their own layout within their bounds
- Receive data via props
- Emit events via callbacks

Use slots to fill template content areas with domain-specific UI.

### Patterns
Cross-domain reusable UI patterns. Unlike Slots:
- Used across multiple domains
- Not tied to a specific feature

Example: PaymentMethods is used by BTC flows, Cash flows, and Gift Cards.

### Screens
Complete pages that combine templates + slots. Screens:
- Manage navigation state
- Orchestrate user flows
- Handle business logic coordination

### Flows
Multi-step journeys that span multiple screens. Flows:
- Use `ScreenStack` for animated transitions
- Manage step state internally
- Wrap individual screens in `FullscreenTemplate`
- Organized by domain (BTC/, Cash/)

## Composition Pattern

```
Screen
└── Template (layout)
    └── Slot or Pattern (content)
        └── Components (primitives)
```

Example:
```tsx
<FullscreenTemplate title="Buy bitcoin">
  <BtcBuyEnterAmount onContinue={handleContinue} />
</FullscreenTemplate>
```

## Naming Conventions

| Type | Suffix | Example |
|------|--------|---------|
| Screen | `Screen` | `BankScreen.tsx` |
| Flow | `Flow` | `BtcBuyFlow.tsx` |
| Slot | `Slot` | `BtcSlot.tsx` |
| Pattern | `Slot` | `ChooseBankAccountSlot.tsx` |
| Template | None or `Template` | `FullscreenTemplate.tsx`, `TxConfirmation.tsx` |
| Template Instance | `[Domain][Action].tsx` | `BtcBuyConfirmation.tsx` |
| Figma mapping | `.figma.tsx` | `BtcSlot.figma.tsx` |

## Adding New UI

1. **New standalone screen**: Add to `Screens/`
2. **New multi-step flow**: Add to `Screens/flows/[BTC|Cash]/`
3. **New domain content**: Add Slot to appropriate `Slots/` subdirectory
4. **New cross-domain pattern**: Add to `Patterns/`
5. **New layout pattern**: Add to `Templates/`

See individual README files in each subdirectory for detailed guidance.
