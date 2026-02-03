import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import FoldPageViewHeader from "../../TopNav/FoldPageViewHeader";
import StackControl from "../../TopNav/StackControl";
import NavTabBar from "../../NavTabBar";
import { BellIcon } from "../../icons/BellIcon";
import { ClockIcon } from "../../icons/ClockIcon";
import { colorMaps, spacing } from "../../tokens";

export default function NavigationCategory() {
  // Header state
  const [headerLeftIcon, setHeaderLeftIcon] = useState<"back" | "menu" | "x">("back");
  const [headerVariant, setHeaderVariant] = useState<"fullscreen" | "progressive">("fullscreen");

  // NavTabBar state
  const [activeTab, setActiveTab] = useState<"left" | "center" | "right" | "notifications">("center");
  const [tabBarVariant, setTabBarVariant] = useState<"default" | "brand">("default");

  // StackControl state
  const [stackVariant, setStackVariant] = useState<"left" | "right">("right");

  return (
    <View style={styles.container}>
      {/* FoldPageViewHeader */}
      <ComponentCard
        title="FoldPageViewHeader"
        description="Top navigation header with title and actions"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Left Icon"
              value={headerLeftIcon}
              onChange={setHeaderLeftIcon}
              options={[
                { label: "back", value: "back" },
                { label: "menu", value: "menu" },
                { label: "x", value: "x" },
              ]}
            />
            <PropControl
              type="select"
              label="Variant"
              value={headerVariant}
              onChange={setHeaderVariant}
              options={[
                { label: "fullscreen", value: "fullscreen" },
                { label: "progressive", value: "progressive" },
              ]}
            />
          </View>
        }
      >
        <View style={styles.headerPreview}>
          <FoldPageViewHeader
            title="Page Title"
            subTitle="Subtitle text"
            leftIcon={headerLeftIcon}
            onLeftPress={() => {}}
            variant={headerVariant}
            marginBottom={0}
          />
        </View>
      </ComponentCard>

      {/* StackControl */}
      <ComponentCard
        title="StackControl"
        description="Navigation control for header icons"
        controls={
          <PropControl
            type="select"
            label="Variant"
            value={stackVariant}
            onChange={setStackVariant}
            options={[
              { label: "left", value: "left" },
              { label: "right", value: "right" },
            ]}
          />
        }
      >
        <View style={styles.stackPreview}>
          <StackControl
            variant={stackVariant}
            leadingSlot={<ClockIcon width={24} height={24} color={colorMaps.face.primary} />}
            trailingSlot={<BellIcon width={24} height={24} color={colorMaps.face.primary} />}
          />
        </View>
      </ComponentCard>

      {/* NavTabBar */}
      <ComponentCard
        title="NavTabBar"
        description="Bottom tab navigation bar"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Active Tab"
              value={activeTab}
              onChange={setActiveTab}
              options={[
                { label: "left", value: "left" },
                { label: "center", value: "center" },
                { label: "right", value: "right" },
              ]}
            />
            <PropControl
              type="select"
              label="Variant"
              value={tabBarVariant}
              onChange={setTabBarVariant}
              options={[
                { label: "default", value: "default" },
                { label: "brand", value: "brand" },
              ]}
            />
          </View>
        }
      >
        <View style={[
          styles.tabBarPreview,
          tabBarVariant === "brand" && styles.tabBarPreviewBrand
        ]}>
          <NavTabBar
            activeTab={activeTab}
            onTabPress={setActiveTab}
            variant={tabBarVariant}
          />
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
  headerPreview: {
    width: "100%",
    backgroundColor: colorMaps.layer.background,
    overflow: "hidden",
    borderRadius: 8,
  },
  stackPreview: {
    alignItems: "center",
    padding: spacing["200"],
  },
  tabBarPreview: {
    width: "100%",
    height: 100,
    backgroundColor: colorMaps.layer.background,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  tabBarPreviewBrand: {
    backgroundColor: colorMaps.object.primary.bold.default,
  },
});
