import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate, { FullscreenTemplateRef } from "../Templates/FullscreenTemplate";
import { FoldText } from "../../components/Primitives/FoldText";
import { IconContainer } from "../../components/IconContainer";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon";
import CurrencyInput from "../../components/CurrencyInput/CurrencyInput";
import Button from "../../components/Buttons/Button/Button";
import ModalFooter from "../../components/modals/ModalFooter";
import { colorMaps, spacing } from "../../components/tokens";

export interface BtcBuySuccessScreenProps {
  /** USD amount purchased (e.g., "$100") */
  amount?: string;
  /** Sats equivalent (e.g., "~100,000 sats") */
  satsEquivalent?: string;
  /** Title text */
  title?: string;
  /** Message text */
  message?: string;
  /** Primary button label */
  actionLabel?: string;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Called when primary button is pressed */
  onActionPress?: () => void;
  /** Called when secondary button is pressed */
  onSecondaryPress?: () => void;
  /** Called when screen is closed */
  onClose?: () => void;
  testID?: string;
}

export default function BtcBuySuccessScreen({
  amount = "$100",
  satsEquivalent = "~100,000 sats",
  title = "Purchase successful",
  message = "Your bitcoin purchase is being processed.",
  actionLabel = "Done",
  secondaryLabel = "View transaction",
  onActionPress,
  onSecondaryPress,
  onClose,
  testID,
}: BtcBuySuccessScreenProps) {
  const templateRef = useRef<FullscreenTemplateRef>(null);

  const handleClose = () => {
    if (templateRef.current) {
      templateRef.current.close();
    } else {
      onClose?.();
    }
  };

  return (
    <FullscreenTemplate
      ref={templateRef}
      variant="yellow"
      navVariant="start"
      leftIcon="x"
      onLeftPress={onClose}
      scrollable={false}
    >
      <View style={styles.container} testID={testID}>
        {/* Success Content */}
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.successHeader}>
            <IconContainer
              style={styles.iconContainer}
              variant="default-fill"
              size="lg"
              icon={
                <CheckCircleIcon
                  width={20}
                  height={20}
                  color={colorMaps.face.inversePrimary}
                />
              }
            />

            {/* Success Copy */}
            <View style={styles.copy}>
              <FoldText type="header-md" style={styles.title}>
                {title}
              </FoldText>
              <FoldText type="body-lg" style={styles.message}>
                {message}
              </FoldText>
            </View>
          </View>

          {/* Amount Display */}
          <CurrencyInput
            value={amount}
            topContextVariant="btc"
            topContextValue={satsEquivalent}
            bottomContextVariant="none"
          />
        </View>

        {/* Footer */}
        <ModalFooter
          type="inverse"
          disclaimer={
            <FoldText type="body-sm" style={styles.disclaimerText}>
              Funds must clear before your bitcoin is available. Your bitcoin may take{" "}
              <FoldText type="body-sm-bold" style={styles.disclaimerBold}>
                up to 14 days
              </FoldText>{" "}
              from purchase to unlock.
            </FoldText>
          }
          primaryButton={
            <Button
              label={actionLabel}
              hierarchy="inverse"
              size="md"
              onPress={onActionPress ?? handleClose}
            />
          }
          secondaryButton={
            onSecondaryPress ? (
              <Button
                label={secondaryLabel}
                hierarchy="tertiary"
                size="md"
                onPress={onSecondaryPress}
              />
            ) : undefined
          }
        />
      </View>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    paddingTop: spacing["600"],
  },
  successHeader: {
    alignItems: "center",
    gap: spacing["400"],
    marginBottom: spacing["200"],
  },
  iconContainer: {
    backgroundColor: colorMaps.object.positive.bold.default,
  },
  copy: {
    gap: spacing["300"],
    alignItems: "center",
  },
  title: {
    color: colorMaps.face.primary,
    textAlign: "center",
  },
  message: {
    color: colorMaps.face.secondary,
    textAlign: "center",
  },
  disclaimerText: {
    color: colorMaps.face.tertiary,
    textAlign: "center",
  },
  disclaimerBold: {
    color: colorMaps.face.primary,
  },
});
