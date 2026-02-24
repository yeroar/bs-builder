/**
 * Approach Section Test
 *
 * Composite flow combining 3 benchmark screen patterns:
 * - Family: Select Recipient (dark, ENS address input + contact list)
 * - Coinbase: "Before you send" scam warning (info/warning screen)
 * - bunq: Amount picker (wheel picker amount selection)
 *
 * Flow: Select Recipient → Before You Send → Amount → Success
 */
import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ScreenStack from "../../../../Templates/ScreenStack";
import WheelPicker from "../../../../../components/Inputs/WheelPicker/WheelPicker";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { CheckCircleIcon } from "../../../../../components/Icons/CheckCircleIcon";
import { ShieldIcon } from "../../../../../components/Icons/ShieldIcon";
import { AlertCircleIcon } from "../../../../../components/Icons/AlertCircleIcon";
import { ArrowNarrowRightIcon } from "../../../../../components/Icons/ArrowNarrowRightIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";
import SelectRecipient from "../../../../Slots/Send/SelectRecipient";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface ApproachSectionTestProps {
  assetType?: AssetType;
  onComplete: () => void;
  onClose: () => void;
}

type FlowStep = "selectRecipient" | "beforeYouSend" | "amount" | "success";

const MAX_AMOUNT = 2500;

const WARNING_ITEMS = [
  {
    text: "Only send money to trusted individuals and organizations.",
  },
  {
    text: "Watch out for unrealistic high yields or request for funds, especially for investments or romantic relationships.",
  },
  {
    text: "Sending digital assets out of the platform may be irreversible.",
  },
];

export default function ApproachSectionTest({
  assetType = "cash",
  onComplete,
  onClose,
}: ApproachSectionTestProps) {
  const config = getAssetConfig(assetType);
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["selectRecipient"]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState("0");

  // Wheel picker amounts: $1 .. $2500
  const amounts = useMemo(
    () => Array.from({ length: MAX_AMOUNT }, (_, i) => String(i + 1)),
    []
  );
  const [selectedIndex, setSelectedIndex] = useState(9); // default $10
  const numAmount = selectedIndex + 1;

  const pushStep = (step: FlowStep) =>
    setFlowStack((prev) => [...prev, step]);
  const popStep = () =>
    setFlowStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const handleRecipientSelect = (r: { address: string; label?: string }) => {
    setRecipient(r.label || r.address);
    pushStep("beforeYouSend");
  };

  const handleWarningContinue = () => {
    pushStep("amount");
  };

  const handleAmountConfirm = () => {
    setConfirmedAmount(String(numAmount));
    setShowSuccess(true);
  };

  const handleDone = () => {
    onComplete();
  };

  // ── Success ───────────────────────────────────────────────
  if (showSuccess) {
    const numConfirmed = parseFloat(confirmedAmount) || 0;
    return (
      <FullscreenTemplate
        title="Sent"
        leftIcon="x"
        onLeftPress={handleDone}
        scrollable={false}
        variant="yellow"
        enterAnimation="fill"
        footer={
          <ModalFooter
            type="inverse"
            primaryButton={
              <Button
                label="View details"
                hierarchy="inverse"
                size="md"
                onPress={() => console.log("View details")}
              />
            }
            secondaryButton={
              <Button label="Done" hierarchy="secondary" size="md" onPress={handleDone} />
            }
          />
        }
      >
        <View style={styles.successContent}>
          <CheckCircleIcon width={56} height={56} color={colorMaps.face.primary} />
          <FoldText type="header-lg" style={styles.successAmount}>
            {config.formatAmount(numConfirmed)}
          </FoldText>
          <FoldText type="body-md" style={styles.successSubtext}>
            Sent to {recipient}
          </FoldText>
        </View>
      </FullscreenTemplate>
    );
  }

  // ── Flow Stack ────────────────────────────────────────────
  return (
    <ScreenStack
      stack={flowStack}
      onBack={popStep}
      renderScreen={(key) => {
        switch (key) {
          // ── Step 1: Select Recipient (Family-style) ──────
          case "selectRecipient":
            return (
              <FullscreenTemplate
                title="Send"
                leftIcon="x"
                onLeftPress={onClose}
                scrollable
              >
                <View style={styles.slotPadding}>
                  <SelectRecipient
                    onSelect={handleRecipientSelect}
                    onClose={onClose}
                    onScanQR={() => console.log("Scan QR")}
                  />
                </View>
              </FullscreenTemplate>
            );

          // ── Step 2: Before You Send (Coinbase-style) ─────
          case "beforeYouSend":
            return (
              <FullscreenTemplate
                title="Before you send"
                onLeftPress={popStep}
                scrollable={false}
                navVariant="step"
                footer={
                  <ModalFooter
                    type="default"
                    primaryButton={
                      <Button
                        label="Continue"
                        hierarchy="primary"
                        size="md"
                        onPress={handleWarningContinue}
                      />
                    }
                    secondaryButton={
                      <Button
                        label="Learn more"
                        hierarchy="secondary"
                        size="md"
                        onPress={() => console.log("Learn more")}
                      />
                    }
                  />
                }
              >
                <View style={styles.warningContent}>
                  <FoldText type="header-md" style={styles.warningHeading}>
                    Avoid scams and fraud, learn how to protect yourself
                  </FoldText>

                  <View style={styles.warningList}>
                    {WARNING_ITEMS.map((item, index) => (
                      <View key={index} style={styles.warningItem}>
                        <View style={styles.warningIconContainer}>
                          {index === 0 && (
                            <ShieldIcon
                              width={20}
                              height={20}
                              color={colorMaps.face.secondary}
                            />
                          )}
                          {index === 1 && (
                            <AlertCircleIcon
                              width={20}
                              height={20}
                              color={colorMaps.face.secondary}
                            />
                          )}
                          {index === 2 && (
                            <ArrowNarrowRightIcon
                              width={20}
                              height={20}
                              color={colorMaps.face.secondary}
                            />
                          )}
                        </View>
                        <FoldText type="body-md" style={styles.warningText}>
                          {item.text}
                        </FoldText>
                      </View>
                    ))}
                  </View>
                </View>
              </FullscreenTemplate>
            );

          // ── Step 3: Amount Picker (bunq-style) ───────────
          case "amount":
            return (
              <FullscreenTemplate
                title={`Send to ${recipient}`}
                onLeftPress={popStep}
                scrollable={false}
                navVariant="step"
                footer={
                  <ModalFooter
                    type="default"
                    primaryButton={
                      <Button
                        label={`Send · ${config.formatAmount(numAmount)}`}
                        hierarchy="primary"
                        size="md"
                        onPress={handleAmountConfirm}
                      />
                    }
                  />
                }
              >
                <View style={styles.wheelContent}>
                  <WheelPicker
                    items={amounts}
                    selectedIndex={selectedIndex}
                    onIndexChange={setSelectedIndex}
                    formatLabel={(val) => config.formatAmount(Number(val))}
                  />
                </View>
              </FullscreenTemplate>
            );

          default:
            return null;
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  // Slot padding
  slotPadding: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
  },

  // Warning screen (Coinbase-style)
  warningContent: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    gap: spacing["600"],
  },
  warningHeading: {
    color: colorMaps.face.primary,
  },
  warningList: {
    gap: spacing["500"],
  },
  warningItem: {
    flexDirection: "row",
    gap: spacing["400"],
    alignItems: "flex-start",
  },
  warningIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  warningText: {
    flex: 1,
    color: colorMaps.face.secondary,
  },

  // Wheel picker (bunq-style)
  wheelContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing["500"],
  },

  // Success
  successContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["400"],
    paddingHorizontal: spacing["500"],
  },
  successAmount: {
    color: colorMaps.face.primary,
  },
  successSubtext: {
    color: colorMaps.face.secondary,
  },
});
