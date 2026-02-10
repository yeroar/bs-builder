import React from "react";
import AutomationSuccess from "../../Templates/Success/AutomationSuccess";

export interface RoundUpsSuccessProps {
  multiplier: string;
  isUpdate?: boolean;
}

export default function RoundUpsSuccess({
  multiplier,
  isUpdate = false,
}: RoundUpsSuccessProps) {
  return (
    <AutomationSuccess
      header={isUpdate
        ? `Round ups updated to ${multiplier}`
        : `${multiplier} Round up confirmed`
      }
      body="Bitcoin is purchased every $10 in Round ups; we'll notify you once it's available."
    />
  );
}
