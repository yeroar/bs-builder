import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../../../components/CurrencyInput";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import { spacing } from "../../../../../components/tokens";

export interface BtcSendSuccessProps {
  satsAmount?: number;
  usdEquivalent?: string;
  onDone?: () => void;
  onViewDetails?: () => void;
  testID?: string;
}

export default function BtcSendSuccess({
  satsAmount = 10000000,
  usdEquivalent = "~$10,250.00",
  onDone,
  onViewDetails,
  testID,
}: BtcSendSuccessProps) {
  const formatSats = (sats: number): string => {
    return `${sats.toLocaleString()} sats`;
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <CurrencyInput
          value={formatSats(satsAmount)}
          topContextSlot={<TopContext variant="btc" value={usdEquivalent} />}
          bottomContextSlot={
            <BottomContext variant="maxButton">
              <Button
                label="View details"
                hierarchy="secondary"
                size="xs"
                onPress={onViewDetails}
              />
            </BottomContext>
          }
        />
      </View>

      <ModalFooter
        type="inverse"
        primaryButton={
          <Button
            label="Done"
            hierarchy="inverse"
            size="md"
            onPress={onDone}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
