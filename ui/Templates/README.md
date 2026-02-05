# Templates

Reusable layout scaffolds that provide consistent structure for screens. Templates handle navigation headers, content areas, footers, and animations.

## Directory Structure

```
Templates/
├── EnterAmount/           # Amount input pattern
│   ├── instances/         # Domain-specific implementations
│   │   ├── BTC/
│   │   └── Cash/
│   ├── EnterAmount.tsx    # Base template
│   └── useAmountInput.ts  # Shared hook
├── Success/               # Success state pattern
│   ├── instances/         # Domain-specific implementations
│   │   ├── BTC/
│   │   └── GiftCard/
│   └── TransactionSuccess.tsx  # Base template
├── TxConfirmation/        # Transaction confirmation pattern
│   ├── instances/         # Domain-specific implementations
│   │   ├── BTC/
│   │   ├── Cash/
│   │   └── GiftCard/
│   └── TxConfirmation.tsx # Base template
├── FullscreenTemplate.tsx # Fullscreen overlay template
├── IntroTemplate.tsx      # Feature intro template
├── RootTemplate.tsx       # Main tab template
└── ScreenStack.tsx        # Animated navigation stack
```

## Root Templates

### RootTemplate
Main template for tab screens with bottom navigation.

```tsx
<RootTemplate
  activeTab="left"
  onTabPress={handleTabPress}
  homeSlot={<BankHomeSlot />}
  rightComponents={[<NotificationIcon />]}
/>
```

**Props:**
- `activeTab` - Currently selected tab
- `onTabPress` - Tab selection handler
- `homeSlot` - Main content slot
- `scrollable` - Enable scroll (default: true)
- `tabBarVariant` - 'default' | 'brand'

### FullscreenTemplate
Overlay template for detail screens and flows.

```tsx
<FullscreenTemplate
  title="Buy bitcoin"
  navVariant="start"      // or "step"
  onLeftPress={handleClose}
  footer={<ModalFooter />}
>
  <EnterAmountSlot />
</FullscreenTemplate>
```

**Props:**
- `title` / `subTitle` - Header text
- `navVariant` - 'start' (X, slides from bottom) | 'step' (back, slides from right)
- `enterAnimation` - 'slide' | 'fill' | 'none'
- `footer` - Sticky footer content
- `variant` - 'fullscreen' | 'progressive' | 'yellow'

### IntroTemplate
Template for feature introduction screens with header and list content.

```tsx
<IntroTemplate
  header="Round ups"
  body="Automatically round up purchases to bitcoin"
  disclaimer="Terms apply"
>
  <ListItem title="How it works" />
</IntroTemplate>
```

### ScreenStack
Animated navigation stack for multi-step flows.

```tsx
<ScreenStack
  stack={["enterAmount", "confirm"]}
  renderScreen={(step) => renderScreen(step)}
  animateInitial
  onEmpty={handleFlowClose}
/>
```

**Props:**
- `stack` - Array of screen keys
- `renderScreen` - Function returning screen for key
- `animateInitial` - Animate first screen on mount
- `onEmpty` - Called when stack empties

## Content Templates

### EnterAmount/
Base template for amount input screens.

**Base:** `EnterAmount.tsx` - Flex container with space-between layout

**Instances:**
| File | Purpose |
|------|---------|
| `instances/BTC/BtcBuyEnterAmount.tsx` | Bitcoin purchase amount |
| `instances/BTC/BtcSellEnterAmount.tsx` | Bitcoin sell amount |
| `instances/BTC/BtcSendEnterAmount.tsx` | Bitcoin send amount |
| `instances/BTC/BtcAutoStackEnterAmount.tsx` | Auto-stack amount setup |
| `instances/Cash/InstantDepositEnterAmount.tsx` | Instant deposit amount |
| `instances/Cash/OneTimeDepositEnterAmount.tsx` | One-time deposit amount |
| `instances/Cash/RecurringDepositEnterAmount.tsx` | Recurring deposit amount |

**Hook:** `useAmountInput.ts` - Shared amount input state logic

### TxConfirmation/
Base template for transaction confirmation screens.

**Base:** `TxConfirmation.tsx` - Scrollable content with slots for currency input, receipt details, and footer

```tsx
<TxConfirmation
  currencyInput={<CurrencyInput value="$100" />}
  receiptDetails={<ReceiptDetails items={items} />}
  footer={<ModalFooter primaryButton={<Button label="Confirm" />} />}
  disclaimer="Funds will be available in 3-5 days"
/>
```

**Instances:**
| File | Purpose |
|------|---------|
| `instances/BTC/BtcBuyConfirmation.tsx` | Buy confirmation |
| `instances/BTC/BtcSellConfirmation.tsx` | Sell confirmation |
| `instances/BTC/BtcSendConfirmation.tsx` | Send confirmation |
| `instances/BTC/BtcAutoStackConfirmation.tsx` | Auto-stack confirmation |
| `instances/Cash/InstantDepositConfirmation.tsx` | Instant deposit confirmation |
| `instances/Cash/OneTimeDepositConfirmation.tsx` | One-time deposit confirmation |
| `instances/Cash/RecurringDepositConfirmation.tsx` | Recurring deposit confirmation |
| `instances/GiftCard/GiftCardConfirmation.tsx` | Gift card confirmation |
| `instances/GiftCard/RedeemBtcGiftCardConfirmation.tsx` | BTC gift card redemption confirmation |

### Success/
Base template for transaction success screens.

**Base:** `TransactionSuccess.tsx` - Yellow background, animated entry, header/content/footer slots

```tsx
<TransactionSuccess
  header={<FoldPageViewHeader title="Purchase complete" />}
  footer={<ModalFooter primaryButton={<Button label="Done" />} />}
  enterAnimation="fill"
>
  <CurrencyInput value="$100" />
</TransactionSuccess>
```

**Instances:**
| File | Purpose |
|------|---------|
| `instances/BTC/BtcBuySuccess.tsx` | Buy success |
| `instances/BTC/BtcSellSuccess.tsx` | Sell success |
| `instances/BTC/BtcSendSuccess.tsx` | Send success |
| `instances/GiftCard/GiftCardSuccess.tsx` | Gift card success |
| `instances/GiftCard/RedeemBtcGiftCardSuccess.tsx` | BTC gift card redemption success |

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Base template | `[Pattern].tsx` | `TxConfirmation.tsx` |
| Instance | `[Domain][Action].tsx` | `BtcBuyConfirmation.tsx` |
| Root template | `[Name]Template.tsx` | `FullscreenTemplate.tsx` |

**Note:** Template instances should NOT have "Slot" suffix - that's reserved for actual Slots.

## Creating New Templates

### New Root Template
Add to `Templates/` root if it's a new layout pattern.

### New Content Template Instance
1. Create in appropriate `instances/[Domain]/` folder
2. Import base template
3. Compose with domain-specific components
4. Use in flows

## Animation Types

Templates support multiple animation types:

| Animation | Behavior |
|-----------|----------|
| `slide` | Slides in from bottom (start) or right (step) |
| `fill` | Background fills up, then content fades in |
| `none` | No animation |
