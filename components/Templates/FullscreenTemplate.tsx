import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colorMaps } from "../tokens/colorMaps";
import FoldPageViewHeader from "../TopNav/FoldPageViewHeader";

interface FullscreenTemplateProps {
  children?: React.ReactNode;
  title?: string;
  subTitle?: string;
  leftIcon?: string | "back" | "menu" | "x";
  onLeftPress?: () => void;
  rightIcon?: string | "x";
  onRightPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  rightComponents?: React.ReactNode[];
  onTabPress?: (tab: "left" | "center" | "right" | "notifications") => void;
  scrollable?: boolean;
  variant?: "fullscreen" | "progressive";
  step?: React.ReactNode;
}

export default function FullscreenTemplate({
  children,
  title,
  subTitle,
  leftIcon = "x",
  onLeftPress,
  rightIcon,
  onRightPress,
  leftComponent,
  rightComponent,
  rightComponents = [],
  scrollable = true,
  variant = "fullscreen",
  step,
}: FullscreenTemplateProps) {
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
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        rightComponents={rightComponents}
        variant={variant}
        marginBottom={0}
        step={step}
      />

      {/* Content Slot */}
      <ContentWrapper 
        style={styles.content} 
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ContentWrapper>
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
});
