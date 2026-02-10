import React from "react";
import { View, StyleSheet } from "react-native";
import { CurrencyInput, TopContext, BottomContext } from "../../../components/Inputs/CurrencyInput";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import { Frequency } from "./Btc";
import { colorMaps, spacing } from "../../../components/tokens";

export interface BtcAutoStackSuccessProps {
  amount: string;
  frequency: Frequency;
  onDone: () => void;
  onViewDetails?: () => void;
}

export default function BtcAutoStackSuccess({
  amount,
  frequency,
  onDone,
  onViewDetails,
}: BtcAutoStackSuccessProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CurrencyInput
          value={amount}
          topContextSlot={<TopContext variant="frequency" value={frequency} />}
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
        disclaimer={
          <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
            Bitcoin purchases usually settle within a few minutes, but may take up to{" "}
            <FoldText type="body-sm-bold" style={{ color: colorMaps.face.primary }}>
              1 business day
            </FoldText>
            . We will notify you once the transaction is complete and available for withdrawal
          </FoldText>
        }
        secondaryButton={
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
