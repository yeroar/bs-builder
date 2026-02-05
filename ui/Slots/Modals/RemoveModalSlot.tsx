import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import InfoCircleIcon from "../../../components/Icons/InfoCircleIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface RemoveModalSlotProps {
  /** Icon element. Defaults to InfoCircleIcon */
  icon?: React.ReactNode;
  /** Title text */
  title: string;
  /** Body/description text */
  body: string;
}

export default function RemoveModalSlot({
  icon = <InfoCircleIcon />,
  title,
  body,
}: RemoveModalSlotProps) {
  return (
    <View style={styles.container}>
      <IconContainer variant="default-fill" size="lg" icon={icon} />
      <View style={styles.copy}>
        <FoldText type="header-md" style={styles.title}>
          {title}
        </FoldText>
        <FoldText type="body-lg" style={styles.body}>
          {body}
        </FoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["500"],
  },
  copy: {
    gap: spacing["300"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  body: {
    color: colorMaps.face.secondary,
  },
});
