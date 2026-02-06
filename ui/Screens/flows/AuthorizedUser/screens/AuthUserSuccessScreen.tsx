import React from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { colorMaps, spacing } from "../../../../../components/tokens";

interface AuthUserSuccessScreenProps {
  firstName: string;
  onDone: () => void;
}

export default function AuthUserSuccessScreen({ firstName, onDone }: AuthUserSuccessScreenProps) {
  return (
    <FullscreenTemplate
      leftIcon="x"
      onLeftPress={onDone}
      scrollable
      variant="yellow"
      enterAnimation="fill"
      footer={
        <ModalFooter
          type="inverse"
          primaryButton={
            <Button label="Done" hierarchy="inverse" size="md" onPress={onDone} />
          }
        />
      }
    >
      <View style={styles.content}>
        <FoldText type="header-xl" style={styles.header}>
          {firstName} has been added successfully
        </FoldText>
        <FoldText type="body-md" style={styles.body}>
          Their physical card will be mailed within 3-5 business days. It can be used immediately upon activation.
        </FoldText>
      </View>

      <View style={styles.legalSection}>
        <FoldText type="body-sm" style={styles.legalText}>
          The Fold Card is issued by Sutton Bank, Member FDIC, pursuant to a license from Visa U.S.A.. Inc. Visa is a
          registered trademark of Visa, U.S.A., Inc. All other trademarks and service marks belong to their respective
          owners. Fold is a financial services platform and not a FDIC insured bank. If you have a Fold Card, accounts are
          subject to pass-through FDIC insurance up to $250,000 per ownership category, should Sutton Bank fail. Certain
          conditions must be satisfied for pass-through deposit insurance coverage to apply. Coverage limit is subject to
          aggregation of that accountholder's funds held at Sutton Bank. You can learn more at{" "}
          <FoldText type="body-sm-bold" style={styles.legalLink}>
            Terms and Conditions
          </FoldText>
          .
        </FoldText>
      </View>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    gap: spacing["200"],
  },
  header: {
    color: colorMaps.face.primary,
  },
  body: {
    color: colorMaps.face.secondary,
  },
  legalSection: {
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    paddingBottom: spacing["1600"],
    marginTop: "auto",
  },
  legalText: {
    color: colorMaps.face.tertiary,
  },
  legalLink: {
    color: colorMaps.face.primary,
    textDecorationLine: "underline",
  },
});
