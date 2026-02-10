import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { spacing } from "../../../components/tokens";
import { formatSats } from "../../../components/utils/formatWithCommas";

export interface BtcSendSuccessProps {
  satsAmount?: number;
  usdEquivalent?: string;
  onViewDetails?: () => void;
  testID?: string;
}

export default function BtcSendSuccess({
  satsAmount = 10000000,
  usdEquivalent = "~$10,250.00",
  onViewDetails,
  testID,
}: BtcSendSuccessProps) {
  return (
    <View style={styles.content} testID={testID}>
      <CurrencyInput
        value={formatSats(satsAmount, { approximate: false })}
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
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: spacing["400"],
  },
});
