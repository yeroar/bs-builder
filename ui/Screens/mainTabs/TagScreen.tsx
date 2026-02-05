import React, { useState } from "react";
import RootTemplate from "../../Templates/RootTemplate";
import FullscreenTemplate from "../../Templates/FullscreenTemplate";
import { BellIcon } from "../../../components/Icons/BellIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import FoldPressable from "../../../components/Primitives/FoldPressable";
import { colorMaps } from "../../../components/tokens";
import TagHomeSlot from "../../Slots/MainTabs/TagHomeSlot";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import RedeemBtcGiftCardSlot from "../../Slots/GiftCard/RedeemBtcGiftCardSlot";
import RedeemBtcGiftCardConfirmation from "../../Slots/GiftCard/RedeemBtcGiftCardConfirmation";
import RedeemBtcGiftCardSuccess from "../../Slots/GiftCard/RedeemBtcGiftCardSuccess";

type RedeemStep = "entry" | "confirmation" | "success";

interface TagScreenProps {
  onTabPress: (tab: "left" | "center" | "right" | "notifications" | "history" | "componentLibrary") => void;
  onHistoryPress: () => void;
  onMenuPress: () => void;
  onSearchGiftCards?: () => void;
}

export default function TagScreen({ onTabPress, onHistoryPress, onMenuPress, onSearchGiftCards }: TagScreenProps) {
  const [isRedeemModalVisible, setIsRedeemModalVisible] = useState(false);
  const [redeemStep, setRedeemStep] = useState<RedeemStep>("entry");
  const [redeemCardNumber, setRedeemCardNumber] = useState("");
  const [redeemPin, setRedeemPin] = useState("");

  const handleOpenRedeemModal = () => {
    setRedeemStep("entry");
    setRedeemCardNumber("");
    setRedeemPin("");
    setIsRedeemModalVisible(true);
  };
  const handleCloseRedeemModal = () => setIsRedeemModalVisible(false);
  const handleRedeemContinue = () => setRedeemStep("confirmation");
  const handleRedeemBack = () => setRedeemStep("entry");
  const handleRedeemConfirm = () => setRedeemStep("success");
  const handleRedeemDone = () => {
    setIsRedeemModalVisible(false);
    setRedeemStep("entry");
  };
  const isRedeemFormValid = redeemCardNumber.length > 0 && redeemPin.length > 0;

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
          onRedeemPress={handleOpenRedeemModal}
          onSearchGiftCards={onSearchGiftCards}
          onGiftCardPress={(id) => console.log("Gift card pressed:", id)}
        />
      </RootTemplate>

      {/* Redeem BTC Gift Card Flow */}
      {isRedeemModalVisible && redeemStep === "entry" && (
        <FullscreenTemplate
          onLeftPress={handleCloseRedeemModal}
          scrollable
          footer={
            <ModalFooter
              type="default"
              disclaimer="Applicable bitcoin exchange fees may apply. Need a Bitcoin Gift Card?"
              primaryButton={
                <Button label="Continue" hierarchy="primary" size="md" disabled={!isRedeemFormValid} onPress={handleRedeemContinue} />
              }
            />
          }
        >
          <RedeemBtcGiftCardSlot
            cardNumber={redeemCardNumber}
            pin={redeemPin}
            onCardNumberChange={setRedeemCardNumber}
            onPinChange={setRedeemPin}
          />
        </FullscreenTemplate>
      )}

      {/* Redeem BTC Gift Card Confirmation */}
      {isRedeemModalVisible && redeemStep === "confirmation" && (
        <FullscreenTemplate
          title="Redeem gift card"
          navVariant="step"
          onLeftPress={handleRedeemBack}
          footer={
            <ModalFooter
              type="default"
              disclaimer="Having trouble redeeming?"
              primaryButton={
                <Button label="Redeem" hierarchy="primary" size="md" onPress={handleRedeemConfirm} />
              }
            />
          }
        >
          <RedeemBtcGiftCardConfirmation />
        </FullscreenTemplate>
      )}

      {/* Redeem BTC Gift Card Success */}
      {isRedeemModalVisible && redeemStep === "success" && (
        <RedeemBtcGiftCardSuccess onDone={handleRedeemDone} />
      )}
    </>
  );
}
