import React from "react";
import AutomationSuccess from "../../Templates/Success/AutomationSuccess";

export interface DirectToBitcoinSuccessProps {
  percentage: number;
  isUpdate?: boolean;
}

export default function DirectToBitcoinSuccess({
  percentage,
  isUpdate = false,
}: DirectToBitcoinSuccessProps) {
  return (
    <AutomationSuccess
      header={isUpdate
        ? `Direct to bitcoin updated to ${percentage}%`
        : `You're investing ${percentage}% of direct deposits in bitcoin`
      }
      body="Funds will be made available in your bitcoin balance."
    />
  );
}
