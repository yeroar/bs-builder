import React from "react";
import { View, Text } from "react-native";
import RootTemplate from "../Templates/RootTemplate";

import { BellIcon } from "../icons/BellIcon";
import { ClockIcon } from "../icons/ClockIcon";
import FoldPressable from "../Primitives/FoldPressable";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history") => void;
  onHistoryPress: () => void;
}

export default function TagScreen({ onTabPress, onHistoryPress }: TagScreenProps) {
  return (
    <RootTemplate
      activeTab="right"
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
          Shop Screen
        </Text>
      </View>
    </RootTemplate>
  );
}
