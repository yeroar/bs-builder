import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import TagHome, { GiftCardData } from "../../Slots/MainTabs/TagHome";
import { RedeemGiftCardFlow } from "../flows";
import { SelectedCard } from "../flows/GiftCard/GiftCardPurchaseFlow";
import { buildSelectedCard } from "../flows/GiftCard/buildSelectedCard";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
  onGiftCardFlow?: (card?: SelectedCard) => void;
}

export default function TagScreen({ onTabPress, onHistoryPress, onMenuPress, onGiftCardFlow }: TagScreenProps) {
  const [showRedeemFlow, setShowRedeemFlow] = useState(false);

  const handleOpenRedeemFlow = () => setShowRedeemFlow(true);
  const handleCloseRedeemFlow = () => setShowRedeemFlow(false);

  const handleGiftCardPress = (card: GiftCardData) => {
    onGiftCardFlow?.(buildSelectedCard(card));
  };

  return (
    <>
      <RootTemplate
        variant="root"
        activeTab="right"
        onTabPress={onTabPress}
        onLeftPress={onMenuPress}
        scrollable={true}
        rightComponents={[
          <FoldPressable key="clock" onPress={() => onHistoryPress()}>
            <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>,
          <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
            <BellIcon width={24} height={24} color={colorMaps.face.primary} />
          </FoldPressable>,
        ]}
      >
        <TagHome
          onRedeemPress={handleOpenRedeemFlow}
          onSearchGiftCards={() => onGiftCardFlow?.()}
          onGiftCardPress={handleGiftCardPress}
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
