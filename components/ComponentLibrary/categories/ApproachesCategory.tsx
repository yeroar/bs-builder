import React from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import Button from "../../Primitives/Buttons/Button/Button";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing } from "../../tokens";

export type ApproachId = "express" | "bottomSheet" | "progressive" | "bunq" | "wise" | "venmo" | "zelle" | "cashApp" | "strike" | "remittance" | "mpesa";

interface ApproachesCategoryProps {
  onLaunch: (id: ApproachId) => void;
}

export default function ApproachesCategory({ onLaunch }: ApproachesCategoryProps) {
  return (
    <View style={styles.container}>
      <ComponentCard
        title="A: Express"
        description="Inline fee preview, no confirmation. CTA shows exact amount."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="bunq + Revolut hybrid" />
          <Meta label="Steps" value="2 (Amount → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("express")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="B: Bottom Sheet"
        description="Amount screen stays visible. MiniModal confirmation overlay."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="KakaoBank" />
          <Meta label="Steps" value="2 (Amount → Sheet → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("bottomSheet")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="C: Progressive Reveal"
        description="Single screen. Receipt fades in as you type amount."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Wise + Coinbase" />
          <Meta label="Steps" value="1 (Amount+Confirm → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("progressive")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="D: bunq Literal"
        description="Instant debit card withdrawal. Amount with max, confirmation with receipt + legal copy."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="FE-482 spec" />
          <Meta label="Steps" value="3 (Amount → Confirmation → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("bunq")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="E: Wise Literal"
        description="Dual amount, transfer summary, confirm & send, password auth."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Wise (literal)" />
          <Meta label="Steps" value="5 (Amount → Summary → Confirm → Auth → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("wise")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="F: Venmo-style"
        description="Social-first. Required note with emoji, privacy toggle, no confirmation."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Venmo" />
          <Meta label="Steps" value="2 (Recipient → Amount+Note → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("venmo")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="G: Zelle-style"
        description="Bank-trust review. Amount + memo, full review, irreversibility warning."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Zelle + Bank of America" />
          <Meta label="Steps" value="3 (Recipient → Amount → Review → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("zelle")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="H: Cash App-style"
        description="Amount-first, recipient-second. Keypad opens immediately, one-tap pay."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Cash App" />
          <Meta label="Steps" value="2 (Amount → Recipient → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("cashApp")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="I: Strike/Lightning-style"
        description="Invoice-driven. Scan QR / paste address, amount, confirm with fee."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Strike" />
          <Meta label="Steps" value="3 (Address → Amount → Confirm → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("strike")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="J: Remittance-style"
        description="Multi-step corridor transfer. Country, amount with FX rate, recipient form, full review."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="Remitly / Western Union" />
          <Meta label="Steps" value="5 (Country → Amount → Recipient → Review → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("remittance")} />
        </View>
      </ComponentCard>

      <ComponentCard
        title="K: M-Pesa-style"
        description="Ultra-minimal. Phone → amount → PIN auto-submit. 3 taps to done."
      >
        <View style={styles.cardContent}>
          <Meta label="Source" value="M-Pesa / Chipper Cash" />
          <Meta label="Steps" value="3 (Phone → Amount → PIN → Success)" />
          <Button label="Launch" hierarchy="primary" size="sm" onPress={() => onLaunch("mpesa")} />
        </View>
      </ComponentCard>
    </View>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <FoldText type="body-sm" style={styles.metaLabel}>{label}</FoldText>
      <FoldText type="body-sm" style={styles.metaValue}>{value}</FoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  cardContent: {
    width: "100%",
    gap: spacing["300"],
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaLabel: {
    color: colorMaps.face.tertiary,
  },
  metaValue: {
    color: colorMaps.face.primary,
    flex: 1,
    textAlign: "right",
  },
});
