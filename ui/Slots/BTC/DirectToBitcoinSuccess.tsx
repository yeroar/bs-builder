import React from "react";
import AutomationSuccess from "../../Templates/Success/AutomationSuccess";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";

export interface DirectToBitcoinSuccessProps {
  percentage: number;
  isUpdate?: boolean;
  onDone: () => void;
}

export default function DirectToBitcoinSuccess({
  percentage,
  isUpdate = false,
  onDone,
}: DirectToBitcoinSuccessProps) {
  return (
    <>
      <AutomationSuccess
        header={isUpdate
          ? `Direct to bitcoin updated to ${percentage}%`
          : `You're investing ${percentage}% of direct deposits in bitcoin`
        }
        body="Funds will be made available in your bitcoin balance."
      />
      <ModalFooter
        type="default"
        primaryButton={
          <Button
            label="Done"
            hierarchy="primary"
            size="md"
            onPress={onDone}
          />
        }
      />
    </>
  );
}
