# Flows

Multi-step user journeys that guide users through complex tasks. Flows manage their own navigation stack and animate between steps.

## Directory Structure

```
flows/
├── BTC/                      # Bitcoin-related flows
│   ├── BtcBuyFlow.tsx
│   ├── BtcSellFlow.tsx
│   ├── BtcSendFlow.tsx
│   ├── BtcAutoStackFlow.tsx
│   ├── DirectToBitcoinFlow.tsx
│   └── index.ts
├── Cash/                     # Cash/deposit-related flows
│   ├── DepositFlow.tsx
│   ├── InstantDepositFlow.tsx
│   ├── OneTimeDepositFlow.tsx
│   ├── RecurringDepositFlow.tsx
│   ├── RoundUpsFlow.tsx
│   └── index.ts
└── index.ts                  # Barrel exports
```

## BTC Flows

| File | Purpose | Steps |
|------|---------|-------|
| `BtcBuyFlow.tsx` | Purchase bitcoin | Amount entry → Payment method → Confirmation → Success |
| `BtcSellFlow.tsx` | Sell bitcoin | Amount entry → Confirmation → Success |
| `BtcSendFlow.tsx` | Send bitcoin to address | Amount entry → Address entry → Confirmation → Success |
| `BtcAutoStackFlow.tsx` | Set up recurring bitcoin purchases | Intro → Amount → Frequency → Confirmation |
| `DirectToBitcoinFlow.tsx` | Auto-convert deposits to BTC | Intro → Percentage selection → Confirmation |

## Cash Flows

| File | Purpose | Steps |
|------|---------|-------|
| `DepositFlow.tsx` | Deposit selection hub | Chooses between deposit types |
| `InstantDepositFlow.tsx` | Instant cash deposit | Amount entry → Confirmation → Success |
| `OneTimeDepositFlow.tsx` | One-time scheduled deposit | Amount entry → Confirmation → Success |
| `RecurringDepositFlow.tsx` | Recurring deposit setup | Amount → Frequency → Confirmation |
| `RoundUpsFlow.tsx` | Round-up purchases to bitcoin | Intro → Multiplier selection → Confirmation |

## Architecture

Flows use `ScreenStack` to manage animated navigation between steps:

```tsx
export default function BtcBuyFlow({ onComplete, onClose }) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["enterAmount"]);

  const renderScreen = (step: string) => {
    switch (step) {
      case "enterAmount":
        return (
          <FullscreenTemplate title="Buy bitcoin" onLeftPress={handleClose}>
            <BtcBuyEnterAmount onContinue={handleContinue} />
          </FullscreenTemplate>
        );
      case "confirm":
        return (
          <FullscreenTemplate title="Confirm" onLeftPress={handleBack}>
            <BtcBuyConfirmation onConfirm={handleConfirm} />
          </FullscreenTemplate>
        );
    }
  };

  return (
    <ScreenStack
      stack={flowStack}
      renderScreen={renderScreen}
      onEmpty={onClose}
    />
  );
}
```

## Flow Lifecycle

1. **Launch**: Parent screen sets `activeFlow` state, renders flow component
2. **Navigate**: Flow manages internal `flowStack` array, pushes/pops steps
3. **Complete**: Flow calls `onComplete` callback, parent handles success state
4. **Close**: User cancels, flow calls `onClose`, parent removes flow

## Props Pattern

All flows follow a consistent props interface:

```tsx
interface FlowProps {
  /** Called when flow completes successfully */
  onComplete: (result?: any) => void;
  /** Called when user closes/cancels the flow */
  onClose: () => void;
  /** Optional: initial data to pre-fill */
  initialAmount?: string;
  /** Optional: for edit flows, indicates feature is already active */
  isFeatureActive?: boolean;
}
```

## Creating a New Flow

1. Identify the domain (BTC or Cash)
2. Create `[Feature]Flow.tsx` in the appropriate subdirectory
3. Define step types: `type FlowStep = "step1" | "step2" | ...`
4. Use `useState` to manage the flow stack
5. Implement `renderScreen(step)` switch statement
6. Wrap each step in `FullscreenTemplate` with appropriate `navVariant`
7. Use `ScreenStack` for animated transitions
8. Export from subdirectory's `index.ts`

## Step Navigation

```tsx
// Push to next step
setFlowStack(prev => [...prev, "confirm"]);

// Pop back
setFlowStack(prev => prev.slice(0, -1));

// Clear stack (triggers onEmpty)
setFlowStack([]);
```

## Template Variants

- `navVariant="start"` - First screen in flow (X button, slides from bottom)
- `navVariant="step"` - Subsequent steps (back chevron, slides from right)

## Exports

Flows are exported via barrel files:

```tsx
// flows/index.ts re-exports from subdirectories
import { BtcBuyFlow, BtcSellFlow } from "../flows";
import { DepositFlow, RoundUpsFlow } from "../flows";
```
