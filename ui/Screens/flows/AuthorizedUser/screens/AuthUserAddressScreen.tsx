import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserAddress, { AuthUserAddressFormData } from "../../../../Slots/AuthorizedUser/AuthUserAddress";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { useKeyboardVisible } from "../../../../../hooks/useKeyboardVisible";

interface AuthUserAddressScreenProps {
  formData: AuthUserAddressFormData;
  onChangeField: (field: keyof AuthUserAddressFormData, value: string | boolean) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AuthUserAddressScreen({ formData, onChangeField, onContinue, onBack }: AuthUserAddressScreenProps) {
  const keyboardVisible = useKeyboardVisible();
  const isValid =
    formData.address.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.state.trim() !== "" &&
    formData.zip.trim() !== "";

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
      <AuthUserAddress formData={formData} onChangeField={onChangeField} />
    </FullscreenTemplate>
  );
}
