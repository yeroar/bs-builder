import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserDetails, { AuthUserDetailsFormData } from "../../../../Slots/AuthorizedUser/AuthUserDetails";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { useKeyboardVisible } from "../../../../../hooks/useKeyboardVisible";

interface AuthUserDetailsScreenProps {
  formData: AuthUserDetailsFormData;
  onChangeField: (field: keyof AuthUserDetailsFormData, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AuthUserDetailsScreen({ formData, onChangeField, onContinue, onBack }: AuthUserDetailsScreenProps) {
  const keyboardVisible = useKeyboardVisible();
  const isValid =
    formData.dobMonth.trim() !== "" &&
    formData.dobDay.trim() !== "" &&
    formData.dobYear.trim() !== "" &&
    formData.ssn.trim() !== "" &&
    formData.email.trim() !== "";

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
      <AuthUserDetails formData={formData} onChangeField={onChangeField} />
    </FullscreenTemplate>
  );
}
