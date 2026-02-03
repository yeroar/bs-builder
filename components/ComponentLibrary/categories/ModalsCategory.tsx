import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import MiniModal from "../../modals/MiniModal";
import ModalFooter from "../../modals/ModalFooter";
import Button from "../../Primitives/Buttons/Button/Button";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing } from "../../tokens";

export default function ModalsCategory() {
  // MiniModal state
  const [modalVariant, setModalVariant] = useState<"default" | "keyboard">("default");
  const [showHeader, setShowHeader] = useState(true);

  return (
    <View style={styles.container}>
      {/* MiniModal */}
      <ComponentCard
        title="MiniModal"
        description="Bottom sheet modal with optional header"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Variant"
              value={modalVariant}
              onChange={setModalVariant}
              options={[
                { label: "default", value: "default" },
                { label: "keyboard", value: "keyboard" },
              ]}
            />
            <PropControl
              type="toggle"
              label="Show Header"
              value={showHeader}
              onChange={setShowHeader}
            />
          </View>
        }
      >
        <View style={styles.modalPreview}>
          <MiniModal
            variant={modalVariant}
            showHeader={showHeader}
            title="Modal Title"
            onClose={() => { }}
          >
            <View style={styles.modalContent}>
              <FoldText type="body-md" style={{ color: colorMaps.face.primary }}>
                Modal content goes here. This is a preview of the MiniModal component.
              </FoldText>
            </View>
          </MiniModal>
        </View>
      </ComponentCard>

      {/* ModalFooter */}
      <ComponentCard
        title="ModalFooter"
        description="Footer component with buttons and disclaimer"
      >
        <View style={styles.footerPreview}>
          <ModalFooter
            disclaimer={
              <FoldText type="body-sm" style={{ color: colorMaps.face.tertiary, textAlign: "center" }}>
                By continuing, you agree to our Terms of Service
              </FoldText>
            }
            primaryButton={
              <Button
                label="Continue"
                hierarchy="primary"
                onPress={() => { }}
              />
            }
            secondaryButton={
              <Button
                label="Cancel"
                hierarchy="tertiary"
                onPress={() => { }}
              />
            }
          />
        </View>
      </ComponentCard>

      {/* MiniModal with Footer */}
      <ComponentCard
        title="MiniModal with Footer"
        description="Complete modal with content and footer"
      >
        <View style={styles.modalPreview}>
          <MiniModal
            variant="default"
            showHeader={true}
            title="Confirm Action"
            onClose={() => { }}
            footer={
              <ModalFooter
                primaryButton={
                  <Button
                    label="Confirm"
                    hierarchy="primary"
                    onPress={() => { }}
                  />
                }
              />
            }
          >
            <View style={styles.modalContent}>
              <FoldText type="body-md" style={{ color: colorMaps.face.primary }}>
                Are you sure you want to proceed with this action?
              </FoldText>
            </View>
          </MiniModal>
        </View>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  controlsColumn: {
    gap: spacing["100"],
  },
  modalPreview: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    overflow: "hidden",
  },
  modalContent: {
    padding: spacing["400"],
  },
  footerPreview: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colorMaps.special.offWhite,
    borderRadius: 8,
  },
});
