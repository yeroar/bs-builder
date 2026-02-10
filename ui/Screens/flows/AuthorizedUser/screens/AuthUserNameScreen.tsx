import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserName, { AuthUserNameFormData } from "../../../../Slots/AuthorizedUser/AuthUserName";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { useKeyboardVisible } from "../../../../../hooks/useKeyboardVisible";

interface AuthUserNameScreenProps {
  formData: AuthUserNameFormData;
  onChangeField: (field: keyof AuthUserNameFormData, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AuthUserNameScreen({ formData, onChangeField, onContinue, onBack }: AuthUserNameScreenProps) {
  const keyboardVisible = useKeyboardVisible();
  const isValid = formData.firstName.trim() !== "" && formData.lastName.trim() !== "";

  return (
    <FullscreenTemplate
      onLeftPress={onBack}
      scrollable
      navVariant="step"
      disableAnimation
      keyboardAware
      footer={
        <ModalFooter
          type="default"
          modalVariant={keyboardVisible ? "keyboard" : undefined}
          primaryButton={
            <Button label="Continue" hierarchy="primary" size="md" disabled={!isValid} onPress={onContinue} />
          }
        />
      }
    >
      <AuthUserName formData={formData} onChangeField={onChangeField} />
    </FullscreenTemplate>
  );
}
