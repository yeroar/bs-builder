import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colorMaps, spacing } from "../tokens";
import FoldPageViewHeader from "../TopNav/FoldPageViewHeader";
import NavTabBar from "../NavTabBar";

interface RootTemplateProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  leftIcon?: string | "back" | "menu" | "x";
  onLeftPress?: () => void;
  rightIcon?: string | "x";
  onRightPress?: () => void;
  rightComponent?: React.ReactNode;
  rightComponents?: React.ReactNode[];
  activeTab?: "left" | "center" | "right" | "notifications";
  onTabPress?: (tab: "left" | "center" | "right" | "notifications") => void;
  scrollable?: boolean;
  variant?: "root" | "fullscreen" | "progressive";
  homeSlot?: React.ReactNode;
  backgroundColor?: string;
  tabBarVariant?: 'default' | 'brand';
}

export default function RootTemplate({
  children,
  title,
  subTitle,
  leftIcon = "menu",
  onLeftPress,
  rightIcon,
  onRightPress,
  rightComponent,
  rightComponents = [],
  activeTab,
  onTabPress,
  scrollable = true,
  variant = "root",
  homeSlot,
  backgroundColor,
  tabBarVariant = 'default',
}: RootTemplateProps) {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <View style={[styles.container, backgroundColor ? { backgroundColor } : null]}>
      {/* Header */}
      <FoldPageViewHeader
        title={title}
        subTitle={subTitle}
        leftIcon={leftIcon}
        onLeftPress={onLeftPress}
        rightIcon={rightIcon}
        onRightPress={onRightPress}
        rightComponent={rightComponent}
        rightComponents={rightComponents}
        variant={variant}
        backgroundColor={backgroundColor}
        marginBottom={0}
      />

      {/* Content Slot */}
      <ContentWrapper
        style={styles.content}
        contentContainerStyle={[
          scrollable ? styles.scrollContent : styles.flexFull,
          { flexGrow: 1 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {homeSlot}
        {children}
      </ContentWrapper>

      {/* Tab Bar Spacer - since NavTabBar is absolute */}
      <View style={styles.tabBarSpacer} />

      {/* Tab Bar */}
      <NavTabBar activeTab={activeTab} onTabPress={onTabPress} variant={tabBarVariant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  content: {
    flex: 1,
  },
  flexFull: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing["600"], // Extra padding at the bottom for scrollable content
  },
  tabBarSpacer: {
    height: 88, // Same height as NavTabBar
  },
});
