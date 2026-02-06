import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import Divider from "../../../components/Primitives/Divider/Divider";
import { FoldText } from "../../../components/Primitives/FoldText";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import { CreditCardRefreshIcon } from "../../../components/Icons/CreditCardRefreshIcon";
import { RocketIcon } from "../../../components/Icons/RocketIcon";
import { ChevronRightIcon } from "../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export default function AuthUserIntroSlot() {
  return (
    <>
      <PrimaryHeader
        header="Add an authorized user"
        body="Share your account with up to 3 others. As the primary cardholder, you are responsible for all balances."
      />

      <View style={styles.featureList}>
        <ListItem
          variant="feature"
          title="Simple sign-up"
          secondaryText="No credit check required"
          leadingSlot={
            <IconContainer variant="default-fill" size="lg" icon={<ClockIcon />} />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
        />
        <ListItem
          variant="feature"
          title="Personal cards"
          secondaryText="Authorized users receive a debit card"
          leadingSlot={
            <IconContainer variant="default-fill" size="lg" icon={<CreditCardRefreshIcon />} />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
        />
        <ListItem
          variant="feature"
          title="Stack card benefits"
          secondaryText="Earn rewards on authorized user purchases"
          leadingSlot={
            <IconContainer variant="default-fill" size="lg" icon={<RocketIcon />} />
          }
          trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
        />
      </View>

      <Divider />

      <View style={styles.detailsSection}>
        <FoldText type="body-sm" style={styles.detailsText}>
          Before you start, gather the information you'll need. We require your authorized user's:
        </FoldText>
        <FoldText type="body-sm" style={styles.detailsText}>
          {"\u2022"} Legal name{"\n"}
          {"\u2022"} Date of birth (must be at least 18 years old){"\n"}
          {"\u2022"} SSN{"\n"}
          {"\u2022"} Mailing address{"\n"}
          {"\u2022"} Email
        </FoldText>
      </View>

      <View style={styles.legalSection}>
        <FoldText type="body-sm" style={styles.legalText}>
          The Fold Card is issued by Sutton Bank, Member FDIC, pursuant to a license from Visa U.S.A.
          Inc. See{" "}
          <FoldText type="body-sm-bold" style={styles.legalLink}>
            Terms and Conditions
          </FoldText>
          {" "}for details.
        </FoldText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  featureList: {
    paddingHorizontal: spacing["500"],
  },
  detailsSection: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["600"],
    gap: spacing["200"],
  },
  detailsText: {
    color: colorMaps.face.tertiary,
  },
  legalSection: {
    backgroundColor: colorMaps.layer.primary,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["800"],
    paddingBottom: spacing["1600"],
  },
  legalText: {
    color: colorMaps.face.tertiary,
  },
  legalLink: {
    color: colorMaps.face.primary,
    textDecorationLine: "underline",
  },
});
