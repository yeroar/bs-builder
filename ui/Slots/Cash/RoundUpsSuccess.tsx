import React from "react";
import AutomationSuccess from "../../Templates/Success/AutomationSuccess";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";

export interface RoundUpsSuccessProps {
  multiplier: string;
  isUpdate?: boolean;
  onDone: () => void;
}

export default function RoundUpsSuccess({
  multiplier,
  isUpdate = false,
  onDone,
}: RoundUpsSuccessProps) {
  return (
    <>
      <AutomationSuccess
        header={isUpdate
          ? `Round ups updated to ${multiplier}`
          : `${multiplier} Round up confirmed`
        }
        body="Bitcoin is purchased every $10 in Round ups; we'll notify you once it's available."
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
