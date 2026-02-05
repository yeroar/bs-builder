import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import { CheckCircleIcon } from "../../../components/Icons/CheckCircleIcon";
import { colorMaps, colorPrimitives } from "../../../components/tokens";

export interface AutomationSuccessSlotProps {
  /** Header text */
  header: string;
  /** Body text */
  body: string;
}

export default function AutomationSuccessSlot({
  header,
  body,
}: AutomationSuccessSlotProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PrimaryHeader
          iconSlot={
            <IconContainer
              variant="success"
              size="lg"
              icon={<CheckCircleIcon color={colorPrimitives.white["000"]} />}
            />
          }
          header={header}
          body={body}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  headerContainer: {
    flex: 1,
  },
});
