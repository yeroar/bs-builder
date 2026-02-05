# Screens

Top-level screens and navigation entry points. Screens orchestrate templates, slots, modals, and flows to create complete user experiences.

## Directory Structure

```
Screens/
├── flows/                          # Multi-step user journeys
├── mainTabs/                       # Main bottom tab screens
├── GiftCardConfirmationScreen.tsx  # Gift card purchase confirmation
├── HistoryScreen.tsx               # Transaction history
└── TransactionDetailScreen.tsx     # Individual transaction details
```

## Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `GiftCardConfirmationScreen.tsx` | Gift card purchase confirmation page | Displaying gift card purchase details before confirmation |
| `HistoryScreen.tsx` | Transaction history list | Showing user's past transactions |
| `TransactionDetailScreen.tsx` | Single transaction detail view | Drill-down into a specific transaction |

## Subdirectories

### `flows/`
Multi-step user journeys that guide users through complex tasks (buying BTC, depositing cash, etc.). See [flows/README.md](./flows/README.md).

### `mainTabs/`
The primary tab screens accessible from the bottom navigation bar.

| File | Purpose |
|------|---------|
| `BankScreen.tsx` | Main banking tab - shows balances, manages BTC/Cash slots, launches flows |
| `ExchangeScreen.tsx` | Exchange/trading tab |
| `TagScreen.tsx` | Tag/categories tab |

## Screen Responsibilities

Screens are responsible for:

1. **State Management** - Managing local UI state (modals, active flows)
2. **Flow Orchestration** - Launching and handling completion of user flows
3. **Navigation** - Handling tab presses and screen transitions
4. **Template Composition** - Wrapping content in appropriate templates

## Example: BankScreen

```tsx
export default function BankScreen({ onTabPress }) {
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);
  const [showBtcSlot, setShowBtcSlot] = useState(false);

  return (
    <>
      {/* Main screen with RootTemplate */}
      <RootTemplate
        activeTab="left"
        onTabPress={onTabPress}
        homeSlot={<BankHomeSlot onBuyPress={handleOpenBuyModal} />}
      />

      {/* Overlaid BTC detail screen */}
      {showBtcSlot && (
        <FullscreenTemplate onLeftPress={handleCloseBtcScreen}>
          <BtcSlot onBuyPress={handleOpenBuyModal} />
        </FullscreenTemplate>
      )}

      {/* Active flow */}
      {activeFlow === "buy" && (
        <BtcBuyFlow onComplete={handleFlowComplete} onClose={handleFlowClose} />
      )}
    </>
  );
}
```

## Creating a New Screen

1. Create the file in `Screens/` (or appropriate subdirectory)
2. Use a Template for layout (`RootTemplate`, `FullscreenTemplate`)
3. Compose Slots for content
4. Handle navigation via props (`onTabPress`, etc.)
5. Export from index if part of a collection

## Patterns

- **Modal Management**: Screens manage modal visibility state and pass to `<Modal>` + `<MiniModal>`
- **Flow Launching**: Screens conditionally render flow components and handle their `onComplete`/`onClose`
- **Nested Screens**: Use `FullscreenTemplate` for drill-down screens that overlay the main content
