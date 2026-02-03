import React from "react";
import RootTemplate from "../Templates/RootTemplate";
import { BellIcon } from "../icons/BellIcon";
import { ClockIcon } from "../icons/ClockIcon";
import FoldPressable from "../Primitives/FoldPressable";
import { colorMaps } from "../tokens";
import TagHomeSlot from "../Slots/TagHomeSlot";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
  onSearchGiftCards?: () => void;
}

export default function TagScreen({ onTabPress, onHistoryPress, onMenuPress, onSearchGiftCards }: TagScreenProps) {
  return (
    <RootTemplate
      variant="root"
      activeTab="right"
      onTabPress={onTabPress}
      onLeftPress={onMenuPress}
      scrollable={true}
      rightComponents={[
        <FoldPressable key="clock" onPress={onHistoryPress}>
          <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
        </FoldPressable>,
        <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
          <BellIcon width={24} height={24} color={colorMaps.face.primary} />
        </FoldPressable>,
      ]}
    >
      <TagHomeSlot
        onRedeemPress={() => console.log("Redeem Bitcoin Gift Card")}
        onSearchGiftCards={onSearchGiftCards}
        onGiftCardPress={(id) => console.log("Gift card pressed:", id)}
      />
    </RootTemplate>
  );
}
