# Patterns

Cross-domain reusable UI patterns that are shared across multiple features. Unlike Slots (which are domain-specific), Patterns are used across different domains.

## Directory Structure

```
Patterns/
├── PaymentMethods/          # Payment method selection patterns
│   ├── AddPaymentSlot.tsx
│   ├── ChooseBankAccountSlot.tsx
│   ├── ChooseDebitCardSlot.tsx
│   ├── ChoosePaymentCardSlot.tsx
│   └── ChoosePaymentMethodFoldSlot.tsx
└── index.ts                 # Barrel exports
```

## PaymentMethods/

Payment method selection components used across BTC purchases, deposits, gift cards, etc.

| File | Purpose |
|------|---------|
| `AddPaymentSlot.tsx` | Options to add new payment methods (bank, card) |
| `ChooseBankAccountSlot.tsx` | List of linked bank accounts to select from |
| `ChooseDebitCardSlot.tsx` | List of debit cards to select from |
| `ChoosePaymentCardSlot.tsx` | List of payment cards to select from |
| `ChoosePaymentMethodFoldSlot.tsx` | Collapsed payment method display with cash balance option |

## Usage

Import from the Patterns barrel:

```tsx
import { ChooseBankAccountSlot, AddPaymentSlot } from "../../Patterns";
```

Or import directly:

```tsx
import ChooseBankAccountSlot from "../../Patterns/PaymentMethods/ChooseBankAccountSlot";
```

## Why Patterns vs Slots?

- **Slots** = Domain-specific (BTC, Cash, GiftCard)
- **Patterns** = Cross-domain reusable

PaymentMethods is used by:
- BTC flows (buying, selling)
- Cash flows (deposits)
- Gift card purchases

Since it's not specific to any one domain, it lives in Patterns.
