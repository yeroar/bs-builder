import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserIntro from "../../../../Slots/AuthorizedUser/AuthUserIntro";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";

interface AuthUserIntroScreenProps {
  onContinue: () => void;
  onClose: () => void;
}

export default function AuthUserIntroScreen({ onContinue, onClose }: AuthUserIntroScreenProps) {
  return (
    <FullscreenTemplate
      leftIcon="x"
      onLeftPress={onClose}
      scrollable
      navVariant="step"
      disableAnimation
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button label="Get started" hierarchy="primary" size="md" onPress={onContinue} />
          }
        />
      }
    >
      <AuthUserIntro />
    </FullscreenTemplate>
  );
}
