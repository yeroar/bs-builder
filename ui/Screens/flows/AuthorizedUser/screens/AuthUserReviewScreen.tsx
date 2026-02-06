import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserReviewSlot, { AuthUserReviewFormData } from "../../../../Slots/AuthorizedUser/AuthUserReviewSlot";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";

interface AuthUserReviewScreenProps {
  formData: AuthUserReviewFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function AuthUserReviewScreen({ formData, onConfirm, onBack }: AuthUserReviewScreenProps) {
  return (
    <FullscreenTemplate
      onLeftPress={onBack}
      scrollable
      navVariant="step"
      disableAnimation
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button label="Confirm" hierarchy="primary" size="md" onPress={onConfirm} />
          }
        />
      }
    >
      <AuthUserReviewSlot formData={formData} />
    </FullscreenTemplate>
  );
}
