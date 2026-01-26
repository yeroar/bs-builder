import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colorMaps } from "../tokens/colorMaps";
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
}: RootTemplateProps) {
  const ContentWrapper = scrollable ? ScrollView : View;

  return (
    <View style={styles.container}>
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
        marginBottom={0}
      />

      {/* Content Slot */}
      <ContentWrapper 
        style={styles.content} 
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ContentWrapper>

      {/* Tab Bar Spacer - since NavTabBar is absolute */}
      <View style={styles.tabBarSpacer} />
      
      {/* Tab Bar */}
      <NavTabBar activeTab={activeTab} onTabPress={onTabPress} />
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
  scrollContent: {
    paddingBottom: 24, // Extra padding at the bottom for scrollable content
  },
  tabBarSpacer: {
    height: 88, // Same height as NavTabBar
  },
});
