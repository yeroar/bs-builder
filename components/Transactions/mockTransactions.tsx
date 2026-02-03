import React from "react";
import { Image, StyleSheet } from "react-native";
import { colorMaps } from "../tokens";
import { TransactionData } from "./TransactionList";
import { IconContainer } from "../IconContainer";

// Icon Imports
import SpotBuysIcon from "../icons/SpotBuysIcon";
import DirectToBitcoinIcon from "../icons/DirectToBitcoinIcon";
import CoinsStackedIcon from "../icons/CoinsStackedIcon";
import SwitchHorizontalIcon from "../icons/SwitchHorizontalIcon";
import CreditCardIcon from "../icons/CreditCardIcon";


import NavBTCFilledIcon from "../icons/NavBTCFilledIcon";

// Image assets
const cardRewardImage = require("../../assets/cardReward.png");

export const MOCK_BITCOIN_TRANSACTIONS: TransactionData[] = [
  {
    id: "tx-1",
    title: "Bitcoin Purchase",
    date: "Today, 10:45 AM",
    amount: "+0.0024 BTC",
    amountSecondary: "+$150.00",
    icon: (
      <IconContainer
        icon={<SpotBuysIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
  {
    id: "tx-2",
    title: "Direct Deposit",
    date: "Yesterday, 3:30 PM",
    amount: "+0.0008 BTC",
    amountSecondary: "+$50.00",
    icon: (
      <IconContainer
        icon={<DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
  {
    id: "tx-3",
    title: "Fold Sweep",
    date: "Oct 24, 11:20 AM",
    amount: "+4,500 sats",
    amountSecondary: "+$2.80",
    icon: (
      <IconContainer
        icon={<CoinsStackedIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
  {
    id: "tx-4",
    title: "Swap to Cash",
    date: "Oct 23, 9:15 AM",
    amount: "-0.0016 BTC",
    amountSecondary: "-$100.00",
    icon: (
      <IconContainer
        icon={<SwitchHorizontalIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
  {
    id: "tx-5",
    title: "Network Fee",
    date: "Oct 22, 8:45 AM",
    amount: "-150 sats",
    amountSecondary: "-$0.09",
    icon: (
      <IconContainer
        icon={<CoinsStackedIcon width={20} height={20} color={colorMaps.face.tertiary} />}
        variant="default-stroke"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
  {
    id: "tx-6",
    title: "Card Purchase",
    date: "Oct 21, 2:15 PM",
    amount: "-0.0004 BTC",
    amountSecondary: "-$25.00",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Bitcoin",
  },
];

export const MOCK_CASH_TRANSACTIONS: TransactionData[] = [
  {
    id: "cash-1",
    title: "Wells Fargo •••• 0684",
    date: "Pending",
    amount: "$105.23",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
  {
    id: "cash-2",
    title: "Adobe",
    date: "Today",
    amount: "$432.18",
    amountSecondary: "Dispute",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
  {
    id: "cash-3",
    title: "Mastercard •••• 0875",
    date: "Dec 9",
    amount: "$218.34",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
  {
    id: "cash-4",
    title: "Chewy gift card",
    date: "Dec 7",
    amount: "$218.34",
    amountSecondary: "892 sats",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
  {
    id: "cash-5",
    title: "Uber",
    date: "Dec 7",
    amount: "$218.34",
    amountSecondary: "892 sats",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
  {
    id: "cash-6",
    title: "Fold+ subscription",
    date: "Dec 1",
    amount: "$15",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Cash",
  },
];

export const MOCK_REWARDS_TRANSACTIONS: TransactionData[] = [
  {
    id: "reward-1",
    title: "Card reward",
    date: "Pending",
    amount: "$0.60",
    amountSecondary: "105 sats",
    icon: (
      <IconContainer
        icon={<NavBTCFilledIcon width={20} height={20} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Rewards",
  },
  {
    id: "reward-2",
    title: "Card reward",
    date: "Today",
    amount: "$0.60",
    amountSecondary: "105 sats",
    icon: (
      <IconContainer
        icon={<NavBTCFilledIcon width={20} height={20} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Rewards",
  },
  {
    id: "reward-3",
    title: "Card reward",
    date: "Yesterday",
    amount: "< $0.01",
    amountSecondary: "10 sats",
    icon: (
      <IconContainer
        icon={<NavBTCFilledIcon width={20} height={20} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Rewards",
  },
  {
    id: "reward-4",
    title: "Card reward",
    date: "Dec 17",
    amount: "$0.33",
    amountSecondary: "302 sats",
    icon: (
      <IconContainer
        icon={<NavBTCFilledIcon width={20} height={20} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Rewards",
  },
];

export const MOCK_CREDIT_TRANSACTIONS: TransactionData[] = [
  {
    id: "credit-1",
    title: "United Airlines",
    date: "Pending",
    amount: "$1,282.13",
    amountSecondary: "55,568 sats",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Credit",
  },
  {
    id: "credit-2",
    title: "Presidio Trust Parking",
    date: "Today",
    amount: "$12.50",
    amountSecondary: "55,568 sats",
    icon: (
      <IconContainer
        icon={<CreditCardIcon width={20} height={20} color={colorMaps.face.primary} />}
        variant="default-fill"
        size="lg"
      />
    ),
    category: "Credit",
  },
  {
    id: "credit-3",
    title: "Payment",
    date: "Dec 8",
    amount: "$830.23",
    amountSecondary: "(paymentType)",
    icon: (
      <IconContainer
        icon={<NavBTCFilledIcon width={20} height={20} />}
        variant="active"
        size="lg"
      />
    ),
    category: "Credit",
  },
];

export const ALL_MOCK_TRANSACTIONS = [
  ...MOCK_BITCOIN_TRANSACTIONS,
  ...MOCK_CASH_TRANSACTIONS,
  ...MOCK_REWARDS_TRANSACTIONS,
  ...MOCK_CREDIT_TRANSACTIONS,
];
