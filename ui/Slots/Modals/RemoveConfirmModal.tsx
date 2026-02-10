import React from "react";
import { Modal } from "react-native";
import MiniModal from "../../../components/Modals/MiniModal";
import ModalFooter from "../../../components/Modals/ModalFooter";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import RemoveModalSlot from "./RemoveModalSlot";

export interface RemoveConfirmModalProps {
  visible: boolean;
  icon?: React.ReactNode;
  title: string;
  body: string;
  removeLabel?: string;
  dismissLabel?: string;
  onRemove: () => void;
  onDismiss: () => void;
}

export default function RemoveConfirmModal({
  visible,
  icon,
  title,
  body,
  removeLabel = "Remove",
  dismissLabel = "Dismiss",
  onRemove,
  onDismiss,
}: RemoveConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
    >
      <MiniModal
        variant="destructive"
        onClose={onDismiss}
        showHeader={false}
        footer={
          <ModalFooter
            variant="sideBySide"
            primaryButton={
              <Button
                label={removeLabel}
                hierarchy="destructive"
                size="md"
                onPress={onRemove}
              />
            }
            secondaryButton={
              <Button
                label={dismissLabel}
                hierarchy="secondary"
                size="md"
                onPress={onDismiss}
              />
            }
          />
        }
      >
        <RemoveModalSlot icon={icon} title={title} body={body} />
      </MiniModal>
    </Modal>
  );
}
