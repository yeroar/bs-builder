import React from "react";
import { View, StyleSheet } from "react-native";
import ProductSurfacePrimary from "../ProductSurface/ProductSurfacePrimary";
import MarcomProductTile from "../Marcom/MarcomProductTile";
import ListItem from "../ListItem/ListItem";
import Button from "../Buttons/Button/Button";
import { IconContainer } from "../IconContainer";
import { FoldText } from "../Primitives/FoldText";
import ProgressVisualization from "../dataViz/ProgressVisualization";
import Divider from "../Divider/Divider";
import { colorMaps, spacing } from "../tokens";

// Icons
import NavBTCSolidIcon from "../icons/NavBTCSolidIcon";
import SpinIcon from "../icons/SpinIcon";
import DirectToBitcoinIcon from "../icons/DirectToBitcoinIcon";
import { ChevronRightIcon } from "../icons/ChevronRightIcon";
import InfoCircleIcon from "../icons/InfoCircleIcon";
import Chip from "../Chip/Chip";
import ClockIcon from "../icons/ClockIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import { PrimaryHeader, SearchHeader, SecondaryHeader, TransactionHeader } from "../Headers";
import { Validation, ValidationGroup } from "../Feedback";
import { ListItemGiftCard, ListItemPaymentMethod } from "../ListItem";
import BankIcon from "../icons/BankIcon";

export interface BankHomeSlotProps {
  onActivateCard?: () => void;
  onBitcoinPress?: () => void;
  onCashPress?: () => void;
  onCreditPress?: () => void;
  onBuyPress?: () => void;
  onSellPress?: () => void;
  onDepositPress?: () => void;
}

export default function BankHomeSlot({
  onActivateCard,
  onBitcoinPress,
  onCashPress,
  onCreditPress,
  onBuyPress,
  onSellPress,
  onDepositPress,
}: BankHomeSlotProps) {
  return (
    <View style={styles.container}>
      {/* Total Section */}
      <ProductSurfacePrimary
        variant="condensed"
        label="Total"
        amount="$10,000"
        hasLabelIcon={false}
        swapCurrency={false}
        primaryButton={
          <Button label="Deposit" hierarchy="primary" size="sm" onPress={onDepositPress} />
        }
        secondaryButton={
          <Button label="Buy bitcoin" hierarchy="primary" size="sm" onPress={onBuyPress} />
        }
        tertiaryButton={
          <Button label="Sell bitcoin" hierarchy="primary" size="sm" onPress={onSellPress} />
        }
      />
      <Divider />
      {/* Bitcoin Section */}
      <ProductSurfacePrimary
        variant="condensed"
        label="Bitcoin"
        amount="0.05 BTC"
        secondaryAmount="$5,000"
        hasLabelIcon={true}
        swapCurrency={true}
        onLabelPress={onBitcoinPress}
      />
      <Divider />

      {/* Cash Section */}
      <ProductSurfacePrimary
        variant="condensed"
        label="Cash"
        amount="$4,900"
        hasLabelIcon={true}
        swapCurrency={false}
        onLabelPress={onCashPress}

        messageSlot={
          <MarcomProductTile
            label="Activate debit card"
            message="Your physical card is here. Activate it to start spending."
            button={
              <Button
                label="Activate card"
                hierarchy="primary"
                size="xs"
                onPress={onActivateCard}
              />
            }
          />
        }
      />

      <Divider />


      {/* Credit Section */}
      <ProductSurfacePrimary
        variant="condensed"
        label="Credit"
        amount="$10,000"
        hasLabelIcon={true}
        swapCurrency={false}
        progressViz={
          <ProgressVisualization
            progress={1.0}
            leftText="$10,000.00 available"
            leadingSlot={<InfoCircleIcon width={12} height={12} color={colorMaps.face.tertiary} />}
          />
        }

        onLabelPress={onCreditPress}
      />
      <Divider />

      {/* More ways to earn Section */}
      <View style={styles.moreWaysSection}>
        <FoldText type="header-sm" style={styles.sectionTitle}>
          Explore
        </FoldText>

        <View style={styles.listContainer}>
          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<NavBTCSolidIcon color={colorMaps.face.inversePrimary} width={20} height={20} />}
                variant="default-fill"
                size="lg"
                style={{ backgroundColor: "#E56910" }}
              />
            }
            title="Redeem Bitcoin Gift Card"
            secondaryText="Add sats to your balance"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={() => { }}
          />

          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<SpinIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="active"
                size="lg"
              />
            }
            title="Daily spin available"
            secondaryText="Spin to earn sats"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={() => { }}
          />

          <ListItem
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<DirectToBitcoinIcon width={20} height={20} color={colorMaps.face.primary} />}
                variant="default-fill"
                size="lg"
              />
            }
            title="Direct to bitcoin"
            secondaryText="Fee free direct deposits into BTC"
            trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
            onPress={() => { }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["none"],
  },
  moreWaysSection: {
    gap: spacing["300"],
    paddingVertical: spacing["800"],
  },
  sectionTitle: {
    color: colorMaps.face.primary,
    paddingHorizontal: spacing["500"],
  },
  listContainer: {
    gap: spacing["100"],
    paddingHorizontal: spacing["500"],
  },
});
