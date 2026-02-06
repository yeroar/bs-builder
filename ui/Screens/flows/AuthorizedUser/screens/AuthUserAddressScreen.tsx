import React from "react";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import AuthUserAddressSlot, { AuthUserAddressFormData } from "../../../../Slots/AuthorizedUser/AuthUserAddressSlot";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";

interface AuthUserAddressScreenProps {
  formData: AuthUserAddressFormData;
  onChangeField: (field: keyof AuthUserAddressFormData, value: string | boolean) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function AuthUserAddressScreen({ formData, onChangeField, onContinue, onBack }: AuthUserAddressScreenProps) {
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
      footer={
        <ModalFooter
          type="default"
          primaryButton={
            <Button label="Continue" hierarchy="primary" size="md" disabled={!isValid} onPress={onContinue} />
          }
        />
      }
    >
      <AuthUserAddressSlot formData={formData} onChangeField={onChangeField} />
    </FullscreenTemplate>
  );
}
