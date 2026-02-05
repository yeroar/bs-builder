# Slots

Domain-specific, self-contained UI sections that render specific content. Slots are designed to be composed within Templates to build complete screens.

## Directory Structure

```
Slots/
├── ActivateCards/     # Card activation flows
├── BTC/               # Bitcoin-related content
├── Cash/              # Cash/banking content
├── GiftCard/          # Gift card content
├── MainTabs/          # Main tab home content
└── index.ts           # Barrel exports
```

## Subdirectories

### ActivateCards/
| File | Purpose |
|------|---------|
| `ActivateDebitCardSlot.tsx` | Card number/CVV input form |
| `ActivationSuccessSlot.tsx` | Success confirmation after activation |

### BTC/
| File | Purpose |
|------|---------|
| `BtcSlot.tsx` | Full bitcoin detail screen content |
| `BtcBuyModalSlot.tsx` | Amount selection modal content |
| `DirectToBitcoinSlot.tsx` | Direct-to-bitcoin feature configuration |

### Cash/
| File | Purpose |
|------|---------|
| `CashSlot.tsx` | Full cash balance screen content |
| `OneTimeDepositSlot.tsx` | One-time deposit options |
| `RoundUpsSlot.tsx` | Round-ups feature configuration |

### GiftCard/
| File | Purpose |
|------|---------|
| `GCCategoriesSlot.tsx` | Gift card category browser |
| `GCDetailSlot.tsx` | Individual gift card details |
| `GCRedemptionMethodSlot.tsx` | Redemption method selection |
| `RedeemBtcGiftCardSlot.tsx` | BTC gift card redemption form |
| `SearchGCEmptySlot.tsx` | Empty state for gift card search |
| `SendAsAGiftSlot.tsx` | Send gift card to recipient |

### MainTabs/
| File | Purpose |
|------|---------|
| `BankHomeSlot.tsx` | Bank tab home content |
| `TagHomeSlot.tsx` | Tag tab home content |

## Slot Design Principles

### 1. Domain-Specific
Slots belong to a specific domain (BTC, Cash, GiftCard). For cross-domain patterns, use `Patterns/` instead.

### 2. Self-Contained
Slots handle their own internal layout and styling. They should work correctly when dropped into any parent container.

### 3. Props-Driven
Slots receive all data via props and emit events via callbacks:

```tsx
interface BtcSlotProps {
  bitcoinAmount?: string;
  onBuyPress?: () => void;
  onSellPress?: () => void;
}
```

### 4. No Navigation Logic
Slots don't navigate. They call callbacks; the parent Screen/Flow handles navigation.

### 5. Composable
Slots can be used inside Templates or directly in Screens:

```tsx
<FullscreenTemplate>
  <BtcSlot onBuyPress={handleBuy} />
</FullscreenTemplate>
```

## Creating a New Slot

1. Identify the domain (BTC, Cash, GiftCard, etc.)
2. Create `[Feature]Slot.tsx` in the appropriate subdirectory
3. Define clear props interface
4. Use internal components for layout
5. Export from `index.ts` if commonly used

## Figma Mappings

Many slots have corresponding `.figma.tsx` files that map the component to Figma designs:

```
BtcSlot.tsx         # Implementation
BtcSlot.figma.tsx   # Figma Code Connect mapping
```

## Exports

Common slots are re-exported from `index.ts`:

```tsx
import { BtcSlot, BankHomeSlot } from "../Slots";
```
