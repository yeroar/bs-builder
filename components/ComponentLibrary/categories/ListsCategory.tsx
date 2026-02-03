import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import ListItem, { ListItemProps } from "../../ListItem/ListItem";
import { IconContainer } from "../../IconContainer";
import Chip from "../../Chip/Chip";
import { colorMaps, spacing } from "../../tokens";

// Icons
import NavBTCSolidIcon from "../../icons/NavBTCSolidIcon";
import { BankIcon } from "../../icons/BankIcon";
import SpinIcon from "../../icons/SpinIcon";

export default function ListsCategory() {
  // ListItem state
  const [listItemVariant, setListItemVariant] = useState<ListItemProps["variant"]>("feature");
  const [showDivider, setShowDivider] = useState(false);

  const renderLeadingSlot = () => {
    switch (listItemVariant) {
      case "giftCard":
      case "transaction":
        return (
          <IconContainer
            icon={<NavBTCSolidIcon width={24} height={24} color={colorMaps.face.inversePrimary} />}
            variant="default-fill"
            style={{ backgroundColor: colorMaps.face.negativeBold }}
          />
        );
      case "paymentMethod":
        return (
          <IconContainer
            icon={<BankIcon width={24} height={24} color={colorMaps.face.primary} />}
            variant="default-fill"
          />
        );
      case "feature":
      case "notifications":
      default:
        return (
          <IconContainer
            icon={<SpinIcon width={24} height={24} color={colorMaps.face.primary} />}
            variant="active"
          />
        );
    }
  };

  const getListItemProps = (): Omit<ListItemProps, "title"> & { title: string } => {
    switch (listItemVariant) {
      case "giftCard":
        return {
          title: "Bitcoin Gift Card",
          secondaryText: "$50.00",
          tertiaryText: "Redeemable for BTC",
        };
      case "paymentMethod":
        return {
          title: "Chase Checking ****4567",
          secondaryText: "Primary account",
        };
      case "transaction":
        return {
          title: "Bitcoin Purchase",
          secondaryText: "Jan 15, 2024",
          rightTitle: "+0.00123 BTC",
          rightSecondaryText: "$50.00",
        };
      case "notifications":
        return {
          title: "Daily spin available",
          secondaryText: "Spin to earn sats today",
        };
      case "feature":
      default:
        return {
          title: "Feature Item",
          secondaryText: "Description text here",
        };
    }
  };

  return (
    <View style={styles.container}>
      {/* ListItem */}
      <ComponentCard
        title="ListItem"
        description="Versatile list item with multiple variants"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Variant"
              value={listItemVariant || "feature"}
              onChange={setListItemVariant}
              options={[
                { label: "feature", value: "feature" },
                { label: "giftCard", value: "giftCard" },
                { label: "paymentMethod", value: "paymentMethod" },
                { label: "transaction", value: "transaction" },
                { label: "notifications", value: "notifications" },
              ]}
            />
            <PropControl
              type="toggle"
              label="Divider"
              value={showDivider}
              onChange={setShowDivider}
            />
          </View>
        }
      >
        <View style={styles.listItemPreview}>
          <ListItem
            variant={listItemVariant}
            leadingSlot={renderLeadingSlot()}
            showDivider={showDivider}
            onPress={() => {}}
            {...getListItemProps()}
          />
        </View>
      </ComponentCard>

      {/* ListItem with Chip */}
      <ComponentCard
        title="ListItem with Chip"
        description="Feature item with status chip"
      >
        <View style={styles.listItemPreview}>
          <ListItem
            title="Rewards Tier"
            secondaryText="Gold member benefits"
            variant="feature"
            leadingSlot={
              <IconContainer
                icon={<SpinIcon width={24} height={24} color={colorMaps.face.primary} />}
                variant="active"
              />
            }
            chip={<Chip label="Active" type="success" />}
            onPress={() => {}}
          />
        </View>
      </ComponentCard>

      {/* Multiple ListItems */}
      <ComponentCard
        title="ListItem List"
        description="Multiple items in a list"
      >
        <View style={styles.listItemPreview}>
          {[
            { title: "Direct Deposit", secondary: "Set up recurring deposits" },
            { title: "Referral Program", secondary: "Earn $10 per referral" },
            { title: "Security Settings", secondary: "Manage 2FA and PIN" },
          ].map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              secondaryText={item.secondary}
              variant="feature"
              leadingSlot={
                <IconContainer
                  icon={<SpinIcon width={24} height={24} color={colorMaps.face.primary} />}
                  variant="default-fill"
                />
              }
              showDivider={index < 2}
              onPress={() => {}}
            />
          ))}
        </View>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  controlsColumn: {
    gap: spacing["100"],
  },
  listItemPreview: {
    width: "100%",
    paddingHorizontal: spacing["200"],
  },
});
