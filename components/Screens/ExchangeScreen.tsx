import React from "react";
import { View, Text } from "react-native";
import RootTemplate from "../Templates/RootTemplate";
import { BellIcon } from "../icons/BellIcon";
import { ClockIcon } from "../icons/ClockIcon";
import FoldPressable from "../Primitives/FoldPressable";

interface ExchangeScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history") => void;
  onHistoryPress: () => void;
}

export default function ExchangeScreen({ onTabPress, onHistoryPress }: ExchangeScreenProps) {
  return (
    <RootTemplate
      activeTab="center"
      onTabPress={onTabPress}
      rightComponents={[
        <FoldPressable key="bell" onPress={() => onTabPress("notifications")}>
          <BellIcon />
        </FoldPressable>,
        <FoldPressable key="clock" onPress={onHistoryPress}>
          <ClockIcon />
        </FoldPressable>
      ]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ fontSize: 18, textAlign: "center", color: "#383323" }}>
          Exchange Screen
        </Text>
      </View>
    </RootTemplate>
  );
}
