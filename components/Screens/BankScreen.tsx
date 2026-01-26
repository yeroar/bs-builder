import React from "react";
import { View, Text } from "react-native";
import RootTemplate from "../Templates/RootTemplate";
import IconLibrary from "../IconLibrary";

import { BellIcon } from "../icons/BellIcon";
import { ClockIcon } from "../icons/ClockIcon";
import FoldPressable from "../Primitives/FoldPressable";

interface BankScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history") => void;
  onHistoryPress: () => void;
}

export default function BankScreen({ onTabPress, onHistoryPress }: BankScreenProps) {
  return (
    <RootTemplate
      activeTab="left"
      onTabPress={onTabPress}
      scrollable={true}
      rightComponents={[
        <FoldPressable key="bell" onPress={() => onTabPress("notifications")}>
          <BellIcon />
        </FoldPressable>,
        <FoldPressable key="clock" onPress={onHistoryPress}>
          <ClockIcon />
        </FoldPressable>
      ]}
    >
      <IconLibrary />
    </RootTemplate>
  );
}
