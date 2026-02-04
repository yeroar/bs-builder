import React from "react";
import { View, StyleSheet } from "react-native";
import { PrimaryHeader } from "../../components/DataDisplay/Headers";
import { colorMaps, spacing } from "../../components/tokens";

export interface IntroTemplateProps {
  /** Header title */
  header: string;
  /** Body text */
  body?: string;
  /** Disclaimer text */
  disclaimer?: string;
  /** Children - typically ListItem components */
  children?: React.ReactNode;
}

export default function IntroTemplate({
  header,
  body,
  disclaimer,
  children,
}: IntroTemplateProps) {
  return (
    <View style={styles.container}>
      <PrimaryHeader
        header={header}
        body={body}
        disclaimer={disclaimer}
      />
      <View style={styles.table}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorMaps.layer.background,
  },
  table: {
    paddingHorizontal: spacing["500"],
  },
});
