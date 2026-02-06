import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import TagHomeSlot, { GiftCardData } from "../../Slots/MainTabs/TagHomeSlot";
import { RedeemGiftCardFlow } from "../flows";
import GiftCardPurchaseFlow, { SelectedCard } from "../flows/GiftCard/GiftCardPurchaseFlow";
import IconContainer from "../../../components/Primitives/IconContainer/IconContainer";
import ValidationGroup from "../../../components/Primitives/ValidationItems/ValidationGroup";
import Validation from "../../../components/Primitives/ValidationItems/Validation";
import { RocketIcon } from "../../../components/Icons/RocketIcon";
import { GlobeIcon } from "../../../components/Icons/GlobeIcon";

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
    setSelectedCard({
      brand: card.brand,
      title: card.title,
      logo: <IconContainer brand={card.brand} size="lg" />,
      offer: (
        <ValidationGroup>
          <Validation
            label={card.cashback}
            type="success"
            leadingIcon={<RocketIcon width={16} height={16} color={colorMaps.face.accentBold} />}
            labelColor={colorMaps.face.accentBold}
          />
          <Validation
            label={card.availability}
            type="success"
            leadingIcon={<GlobeIcon width={16} height={16} color={colorMaps.face.primary} />}
          />
        </ValidationGroup>
      ),
    });
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
