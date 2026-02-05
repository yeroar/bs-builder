import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import TagHomeSlot from "../../Slots/MainTabs/TagHomeSlot";
import { RedeemGiftCardFlow } from "../flows";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
  onSearchGiftCards?: () => void;
}

export default function TagScreen({ onTabPress, onHistoryPress, onMenuPress, onSearchGiftCards }: TagScreenProps) {
  const [showRedeemFlow, setShowRedeemFlow] = useState(false);

  const handleOpenRedeemFlow = () => setShowRedeemFlow(true);
  const handleCloseRedeemFlow = () => setShowRedeemFlow(false);

  return (
    <>
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
          onRedeemPress={handleOpenRedeemFlow}
          onSearchGiftCards={onSearchGiftCards}
          onGiftCardPress={(id) => console.log("Gift card pressed:", id)}
        />
      </RootTemplate>

      {showRedeemFlow && (
        <RedeemGiftCardFlow
          onComplete={handleCloseRedeemFlow}
          onClose={handleCloseRedeemFlow}
        />
      )}
    </>
  );
}
