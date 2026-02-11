# Research Plan: Universal Money Movement Flow

## Thesis

Every "send funds" action — withdraw cash, send bitcoin, pay a contact, transfer between accounts — shares the same UX skeleton: **Who → How much → Confirm → Done**. The differences are in the edges: address formats, fee models, auth gates, confirmation depth. A unified approach should nail the shared skeleton and swap the edges per asset type.

## What we already have

### Benchmarking (7 external apps, 135 screens annotated)
| App | Flow type | Key insight |
|-----|-----------|-------------|
| bunq | Add money (fiat) | Skips confirmation, preset amounts, biometric auth |
| Revolut | Add money (fiat) | Speed-first, processing inline |
| Wise | Send money (fiat cross-border) | 5-step max-safety, dual amount, auth gate |
| KakaoBank | Transfer (fiat domestic) | Bottom sheet confirmation overlay |
| Coinbase | Send Bitcoin | Educational warning before irreversible send |
| Phantom | Send SOL/token | Minimal confirmation, one-tap send |
| Family | Send tokens | Social context, lightweight |

### Prototypes (5 approaches, running in-app)
- A: Express (no confirm, inline fee)
- B: Bottom Sheet (overlay confirm)
- C: Progressive Reveal (receipt fades in)
- D: bunq Literal (presets → processing → Ka-Ching)
- E: Wise Literal (5-step with auth gate)

Each accepts Bitcoin/Cash toggle + shared RecipientStep.

---

## Research areas to explore

### 1. The universal flow skeleton

**Goal:** Formalize the steps every money movement shares.

```
[Recipient] → [Amount] → [Review/Confirm] → [Auth] → [Processing] → [Success]
```

Not every flow uses every step. Map which steps each benchmark app includes/skips:

| Step | bunq | Revolut | Wise | KakaoBank | Coinbase | Phantom | Venmo | Zelle | CashApp |
|------|------|---------|------|-----------|----------|---------|-------|-------|---------|
| Recipient | skip (self) | skip | yes | yes | yes | yes | yes | yes | yes |
| Amount | presets | keypad | dual display | keypad | keypad | keypad | keypad | keypad | keypad |
| Review | skip | inline | full screen | sheet | full + warning | minimal | skip | skip | skip |
| Auth | biometric | biometric | password | PIN | biometric | biometric | - | - | - |
| Processing | animated | inline | hidden | hidden | hidden | hidden | - | - | - |
| Success | branded | toast | fill | full | full | minimal | social | - | - |

**Action:** Expand the matrix with Venmo, Zelle, CashApp from Mobbin. Fill gaps with P2P payment apps.

### 2. Bitcoin Design Foundation patterns

**Source:** [bitcoin.design](https://bitcoin.design/guide/daily-spending-wallet/sending/)

Key patterns to absorb into our annotation format:

- **Entry points** — manual address, contacts, QR scan, payment links, NFC
- **Payment request formats** — on-chain address, Lightning invoice, Lightning address (user@domain), BOLT 12 offers, LNURL, unified QR
- **Fee UX** — "Fees are a sensitive topic... always presented transparently." Lightning vs on-chain fee difference. Dynamic fee estimation (not fixed)
- **Confirmation depth** — Lightning = instant. On-chain = 10min avg, 6 confirmations for finality. UX must communicate uncertainty
- **Contacts as abstraction** — "we primarily think in terms of names and faces, not addresses." Multi-address contacts. Auto-create from incoming payments
- **Processing states** — Lightning: instant done. On-chain: 0 conf → 1 conf → 6 conf. App stays unblocked during confirmation

**Action:** Create `annotations/bitcoin-design-patterns.json` mapping these patterns to our annotation schema. Cross-reference with Phantom and Coinbase annotations.

### 3. Recipient step patterns (deep dive)

The first step varies most across asset types:

| Asset | Recipient input | Format | Validation |
|-------|----------------|--------|------------|
| BTC on-chain | Address (bc1q...) | 26-62 chars, checksum | Instant, format-specific feedback |
| BTC Lightning | Invoice / Lightning address | BOLT11 / user@domain | Expiry check, amount embedded |
| USD (P2P) | Phone / email | Standard formats | Contact book, recent |
| USD (bank) | Account + routing | Numeric | Bank lookup |
| USD (card) | Card number | 16 digits | Luhn check |
| USD (Wise-style) | Recipient profile | Name + bank details | Multi-step |

**Action:** Annotate 3 more apps focused on recipient step UX: Venmo (social/contacts), Zelle (phone/email), Strike (bitcoin + fiat hybrid).

### 4. RICO Semantics connection

**Source:** [google-research-datasets/rico_semantics](https://github.com/google-research-datasets/rico_semantics)

RICO provides:
- 72k Android screens with view hierarchies (JSON)
- 500k human annotations (icon shapes, icon semantics, label associations)
- 27 app categories including Finance
- Normalized bounding boxes + element classes

**How it connects:**
1. **Pattern validation at scale** — filter RICO Finance screens, run Claude to classify into flow steps (recipient / amount / confirm / success / auth). Validate that our skeleton holds across hundreds of apps
2. **Component taxonomy alignment** — RICO's label associations (66k elements → text labels) could map to our component library. Compare what RICO calls a "button" vs what we call `Button/primary/md`
3. **Layout similarity search** — RICO's 64-dim layout vectors. Encode our Figma frames → find structurally similar screens across RICO. Discover patterns we haven't benchmarked

**Limitation:** RICO is 2017 Android. No modern fintech. Use as structural baseline, not design reference.

**Action:** Download RICO Finance subset. Run sample through Claude to test annotation compatibility with our JSON format.

### 5. Fee transparency patterns

Fees are handled completely differently across app types:

| Pattern | Apps | How |
|---------|------|-----|
| Inline live update | bunq, Express approach | Fee appears as you type, total updates |
| Separate breakdown | Wise, Coinbase | Full receipt with line items |
| Bottom sheet summary | KakaoBank | Quick breakdown in overlay |
| Hidden until confirm | Revolut, Phantom | Fee shown only on confirm screen |
| Network fee estimate | Bitcoin wallets | Dynamic, probabilistic, user-selectable priority |

**Action:** Document fee UX decision tree. When to show inline vs separate? Depends on: fee complexity, user trust level, reversibility of action.

### 6. Auth & security gates

When and how apps add friction before executing:

| Pattern | When | Apps |
|---------|------|------|
| No auth | Low value, trusted device | bunq (with biometric fallback) |
| Biometric inline | Before execute | Revolut, Coinbase, Phantom |
| Password page | Before execute | Wise |
| PIN entry | Before execute | KakaoBank |
| 2FA / MFA | High value | Most banks |
| Educational warning | Irreversible action | Coinbase (crypto send) |

Bitcoin.design notes: "Optional security steps (PIN entry) occur after all payment options are selected, representing final user consent."

**Action:** Map auth patterns to risk level. Define when our unified flow needs what level of auth.

---

## Deliverables

1. **`annotations/bitcoin-design-patterns.json`** — Bitcoin Design guide patterns in our annotation format
2. **`annotations/venmo-sending-money.json`** — Venmo P2P send flow annotated
3. **`annotations/zelle-sending-money.json`** — Zelle send flow annotated
4. **`annotations/strike-sending.json`** — Strike (BTC + fiat hybrid) annotated
5. **Updated `pattern-ux-rules.json`** — Add universal flow skeleton rules, fee patterns, auth gates
6. **Updated `outbound-funds-approaches.json`** — Add recipient step matrix, RICO cross-reference findings
7. **`annotations/research/rico-finance-sample.json`** — Sample RICO Finance screens re-annotated in our format (feasibility test)

## Priority order

1. Bitcoin Design patterns (free, structured, directly relevant)
2. Venmo/Zelle/Strike annotations (expand P2P coverage)
3. Universal skeleton formalization (synthesis)
4. RICO feasibility test (experimental)
5. Fee & auth pattern trees (synthesis)
