import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import TagHomeSlot, { GiftCardData } from "../../Slots/MainTabs/TagHomeSlot";
import { RedeemGiftCardFlow } from "../flows";
import GiftCardPurchaseFlow, { SelectedCard } from "../flows/GiftCard/GiftCardPurchaseFlow";
import { buildSelectedCard } from "../flows/GiftCard/buildSelectedCard";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
  onSearchGiftCards?: () => void;
}

export default function TagScreen({ onTabPress, onHistoryPress, onMenuPress, onSearchGiftCards }: TagScreenProps) {
  const [showRedeemFlow, setShowRedeemFlow] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  const handleOpenRedeemFlow = () => setShowRedeemFlow(true);
  const handleCloseRedeemFlow = () => setShowRedeemFlow(false);

  const handleGiftCardPress = (card: GiftCardData) => {
    setSelectedCard(buildSelectedCard(card));
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
        <TagHomeSlot
          onRedeemPress={handleOpenRedeemFlow}
          onSearchGiftCards={onSearchGiftCards}
          onGiftCardPress={handleGiftCardPress}
        />
      </RootTemplate>

      {showRedeemFlow && (
        <RedeemGiftCardFlow
          onComplete={handleCloseRedeemFlow}
          onClose={handleCloseRedeemFlow}
        />
      )}

      {selectedCard && (
        <GiftCardPurchaseFlow
          card={selectedCard}
          onComplete={() => setSelectedCard(null)}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}
