import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import { FoldText } from "../../Primitives/FoldText";
import FoldPressable from "../../Primitives/FoldPressable";
import { colorMaps, spacing } from "../../tokens";

// Icons
import { BellIcon } from "../../icons/BellIcon";
import { ClockIcon } from "../../icons/ClockIcon";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { ChevronRightIcon } from "../../icons/ChevronRightIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { MenuIcon } from "../../icons/MenuIcon";
import InfoCircleIcon from "../../icons/InfoCircleIcon";
import { AlertCircleIcon } from "../../icons/AlertCircleIcon";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { XCircleIcon } from "../../icons/XCircleIcon";
import { XCloseIcon } from "../../icons/XCloseIcon";
import { SwapIcon } from "../../icons/SwapIcon";
import { BankIcon } from "../../icons/BankIcon";
import { ArrowNarrowLeftIcon } from "../../icons/ArrowNarrowLeftIcon";
import { ArrowNarrowRightIcon } from "../../icons/ArrowNarrowRightIcon";
import NavBankSolidIcon from "../../icons/NavBankSolidIcon";
import NavExchangeSolidIcon from "../../icons/NavExchangeSolidIcon";
import NavTagSolidIcon from "../../icons/NavTagSolidIcon";
import NavBTCSolidIcon from "../../icons/NavBTCSolidIcon";
import SpinIcon from "../../icons/SpinIcon";
import DirectToBitcoinIcon from "../../icons/DirectToBitcoinIcon";

const ICON_LIST = [
  { name: "BellIcon", component: BellIcon },
  { name: "ClockIcon", component: ClockIcon },
  { name: "ChevronLeftIcon", component: ChevronLeftIcon },
  { name: "ChevronRightIcon", component: ChevronRightIcon },
  { name: "ChevronDownIcon", component: ChevronDownIcon },
  { name: "MenuIcon", component: MenuIcon },
  { name: "InfoCircleIcon", component: InfoCircleIcon },
  { name: "AlertCircleIcon", component: AlertCircleIcon },
  { name: "CheckCircleIcon", component: CheckCircleIcon },
  { name: "XCircleIcon", component: XCircleIcon },
  { name: "XCloseIcon", component: XCloseIcon },
  { name: "SwapIcon", component: SwapIcon },
  { name: "BankIcon", component: BankIcon },
  { name: "ArrowNarrowLeftIcon", component: ArrowNarrowLeftIcon },
  { name: "ArrowNarrowRightIcon", component: ArrowNarrowRightIcon },
  { name: "NavBankSolidIcon", component: NavBankSolidIcon },
  { name: "NavExchangeSolidIcon", component: NavExchangeSolidIcon },
  { name: "NavTagSolidIcon", component: NavTagSolidIcon },
  { name: "NavBTCSolidIcon", component: NavBTCSolidIcon },
  { name: "SpinIcon", component: SpinIcon },
  { name: "DirectToBitcoinIcon", component: DirectToBitcoinIcon },
];

export default function FoundationCategory() {
  const [iconSize, setIconSize] = useState(24);
  const [textType, setTextType] = useState<"header-lg" | "header-md" | "header-sm" | "body-md" | "body-sm">("body-md");

  return (
    <View style={styles.container}>
      {/* Icons */}
      <ComponentCard
        title="Icons"
        description="SVG icons for UI elements"
        controls={
          <PropControl
            type="select"
            label="Size"
            value={iconSize}
            onChange={(v) => setIconSize(Number(v))}
            options={[
              { label: "16", value: "16" },
              { label: "24", value: "24" },
              { label: "32", value: "32" },
            ]}
          />
        }
      >
        <View style={styles.iconGrid}>
          {ICON_LIST.map(({ name, component: Icon }) => (
            <View key={name} style={styles.iconItem}>
              <Icon width={iconSize} height={iconSize} color={colorMaps.face.primary} />
              <FoldText type="body-sm" style={styles.iconLabel}>{name.replace("Icon", "")}</FoldText>
            </View>
          ))}
        </View>
      </ComponentCard>

      {/* FoldText */}
      <ComponentCard
        title="FoldText"
        description="Typography primitives with semantic variants"
        controls={
          <PropControl
            type="select"
            label="Type"
            value={textType}
            onChange={setTextType}
            options={[
              { label: "header-lg", value: "header-lg" },
              { label: "header-md", value: "header-md" },
              { label: "header-sm", value: "header-sm" },
              { label: "body-md", value: "body-md" },
              { label: "body-sm", value: "body-sm" },
            ]}
          />
        }
      >
        <View style={styles.textPreview}>
          <FoldText type={textType} style={{ color: colorMaps.face.primary }}>
            The quick brown fox
          </FoldText>
        </View>
      </ComponentCard>

      {/* FoldPressable */}
      <ComponentCard
        title="FoldPressable"
        description="Base pressable primitive with press feedback"
      >
        <FoldPressable
          onPress={() => {}}
          style={styles.pressableDemo}
        >
          <FoldText type="body-md" style={{ color: colorMaps.face.primary }}>
            Press me
          </FoldText>
        </FoldPressable>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing["400"],
    justifyContent: "center",
    width: "100%",
  },
  iconItem: {
    alignItems: "center",
    gap: spacing["100"],
    width: 70,
  },
  iconLabel: {
    color: colorMaps.face.tertiary,
    fontSize: 10,
    textAlign: "center",
  },
  textPreview: {
    padding: spacing["200"],
  },
  pressableDemo: {
    padding: spacing["400"],
    backgroundColor: colorMaps.object.tertiary.default,
    borderRadius: 8,
  },
});
