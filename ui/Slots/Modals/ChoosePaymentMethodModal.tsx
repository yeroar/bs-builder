import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import AddPaymentSlot from "../Shared/PaymentMethods/AddPaymentSlot";
import ChooseBankAccountSlot from "../Shared/PaymentMethods/ChooseBankAccountSlot";
import ChooseDebitCardSlot from "../Shared/PaymentMethods/ChooseDebitCardSlot";
import ChoosePaymentMethodFoldSlot, { FoldPaymentOption } from "../Shared/PaymentMethods/ChoosePaymentMethodFoldSlot";
import { PmSelectorVariant } from "../../../components/Inputs/CurrencyInput/PmSelector";

export type PaymentMethodModalType = "bankAccount" | "debitCard" | "multiStep" | "foldPayment";

export interface PaymentMethodSelection {
  variant: PmSelectorVariant;
  brand?: string;
  label?: string;
}

export interface ChoosePaymentMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (selection: PaymentMethodSelection) => void;
  type: PaymentMethodModalType;
}

type MultiStepPhase = "initial" | "bankAccount" | "debitCard";

export default function ChoosePaymentMethodModal({
  visible,
  onClose,
  onSelect,
  type,
}: ChoosePaymentMethodModalProps) {
  // Multi-step phase (only used when type="multiStep")
  const [multiStepPhase, setMultiStepPhase] = useState<MultiStepPhase>("initial");

  // Temp selection state
  const [tempBankId, setTempBankId] = useState<string | undefined>();
  const [tempBankBrand, setTempBankBrand] = useState<string | undefined>();
  const [tempBankLabel, setTempBankLabel] = useState<string | undefined>();
  const [tempCardId, setTempCardId] = useState<string | undefined>();
  const [tempCardBrand, setTempCardBrand] = useState<string | undefined>();
  const [tempCardLabel, setTempCardLabel] = useState<string | undefined>();
  const [tempFoldOption, setTempFoldOption] = useState<FoldPaymentOption | undefined>();

  // Reset all temp state when modal opens
  useEffect(() => {
    if (visible) {
      setMultiStepPhase("initial");
      setTempBankId(undefined);
      setTempBankBrand(undefined);
      setTempBankLabel(undefined);
      setTempCardId(undefined);
      setTempCardBrand(undefined);
      setTempCardLabel(undefined);
      setTempFoldOption(undefined);
    }
  }, [visible]);

  const handleConfirm = () => {
    if (type === "bankAccount" || (type === "multiStep" && multiStepPhase === "bankAccount")) {
      if (tempBankId) {
        onSelect({ variant: "bankAccount", brand: tempBankBrand, label: tempBankLabel });
      }
    } else if (type === "debitCard" || (type === "multiStep" && multiStepPhase === "debitCard")) {
      if (tempCardId) {
        onSelect({ variant: "cardAccount", brand: tempCardBrand, label: tempCardLabel });
      }
    } else if (type === "foldPayment") {
      if (tempFoldOption === "cashBalance") {
        onSelect({ variant: "foldAccount" });
      } else if (tempFoldOption === "creditCard") {
        onSelect({ variant: "cardAccount" });
      }
    }
  };

  const hasSelection = () => {
    if (type === "bankAccount" || (type === "multiStep" && multiStepPhase === "bankAccount")) {
      return !!tempBankId;
    }
    if (type === "debitCard" || (type === "multiStep" && multiStepPhase === "debitCard")) {
      return !!tempCardId;
    }
    if (type === "foldPayment") {
      return !!tempFoldOption;
    }
    return false;
  };

  const renderContent = () => {
    if (type === "multiStep" && multiStepPhase === "initial") {
      return (
        <AddPaymentSlot
          onBankAccountPress={() => setMultiStepPhase("bankAccount")}
          onDebitCardPress={() => setMultiStepPhase("debitCard")}
        />
      );
    }

    if (type === "bankAccount" || (type === "multiStep" && multiStepPhase === "bankAccount")) {
      return (
        <ChooseBankAccountSlot
          selectedAccountId={tempBankId}
          onSelectAccount={(account) => {
            setTempBankId(account.id);
            setTempBankBrand(account.brand);
            setTempBankLabel(`${account.name} •••• ${account.lastFour}`);
          }}
          onAddBankAccount={onClose}
        />
      );
    }

    if (type === "debitCard" || (type === "multiStep" && multiStepPhase === "debitCard")) {
      return (
        <ChooseDebitCardSlot
          selectedCardId={tempCardId}
          onSelectCard={(card) => {
            setTempCardId(card.id);
            setTempCardBrand(card.brand);
            setTempCardLabel(`${card.name} •••• ${card.lastFour}`);
          }}
          onAddDebitCard={onClose}
        />
      );
    }

    if (type === "foldPayment") {
      return (
        <ChoosePaymentMethodFoldSlot
          selectedOption={tempFoldOption}
          onSelectOption={setTempFoldOption}
        />
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (type === "multiStep" && multiStepPhase === "initial") {
      return <ModalFooter type="clean" />;
    }

    return (
      <ModalFooter
        type="default"
        primaryButton={
          <Button
            label="Continue"
            hierarchy="primary"
            size="md"
            disabled={!hasSelection()}
            onPress={handleConfirm}
          />
        }
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <MiniModal
        variant="default"
        onClose={onClose}
        showHeader={false}
        footer={renderFooter()}
      >
        {renderContent()}
      </MiniModal>
    </Modal>
  );
}
