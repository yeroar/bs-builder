/**
 * Shared recipient input step for approach testing.
 * Bitcoin: wallet address field + recent address
 * Cash: phone or email field + contact book access + recent contact
 */
import React, { useState } from "react";
import { View, StyleSheet, Clipboard, Pressable } from "react-native";
import FullscreenTemplate from "../../../../Templates/FullscreenTemplate";
import TextField from "../../../../../components/Inputs/TextContainer/TextField";
import ListItem from "../../../../../components/DataDisplay/ListItem/ListItem";
import IconContainer from "../../../../../components/Primitives/IconContainer/IconContainer";
import ModalFooter from "../../../../../components/Modals/ModalFooter";
import Button from "../../../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../../../components/Primitives/FoldText";
import { ScanIcon } from "../../../../../components/Icons/ScanIcon";
import { XCloseIcon } from "../../../../../components/Icons/XCloseIcon";
import { BitcoinStrokeIcon } from "../../../../../components/Icons/BitcoinStrokeIcon";
import { UserIcon } from "../../../../../components/Icons/UserIcon";
import { ChevronRightIcon } from "../../../../../components/Icons/ChevronRightIcon";
import { colorMaps, spacing } from "../../../../../components/tokens";
import { AssetType, getAssetConfig } from "./assetConfig";

export interface RecipientStepProps {
  assetType: AssetType;
  onContinue: (recipient: string) => void;
  onClose: () => void;
  navVariant?: "start" | "step";
}

export default function RecipientStep({ assetType, onContinue, onClose, navVariant = "start" }: RecipientStepProps) {
  const config = getAssetConfig(assetType);
  const [value, setValue] = useState("");

  const isEmpty = value.trim().length === 0;

  const handleClear = () => setValue("");

  const handlePaste = async () => {
    try {
      const text = await Clipboard.getString();
      if (text) setValue(text);
    } catch {}
  };

  if (assetType === "bitcoin") {
    return (
      <FullscreenTemplate
        title={config.title}
        onLeftPress={onClose}
        scrollable={false}
        navVariant={navVariant}
        keyboardAware
        footer={
          <ModalFooter
            modalVariant="keyboard"
            primaryButton={
              <Button
                label="Continue"
                hierarchy="primary"
                size="md"
                disabled={isEmpty}
                onPress={() => onContinue(value)}
              />
            }
          />
        }
      >
        <View style={styles.container}>
          <TextField
            placeholder="Enter BTC address"
            value={value}
            onChangeText={setValue}
            trailingSlot={
              isEmpty ? (
                <ScanIcon width={20} height={20} color={colorMaps.face.secondary} />
              ) : (
                <Pressable onPress={handleClear}>
                  <XCloseIcon width={16} height={16} color={colorMaps.face.secondary} />
                </Pressable>
              )
            }
            autoFocus
          />
          {isEmpty && (
            <Button
              label="Paste from clipboard"
              hierarchy="tertiary"
              size="sm"
              onPress={handlePaste}
            />
          )}

          {isEmpty && (
            <View style={styles.recentSection}>
              <FoldText type="body-sm" style={styles.recentLabel}>Recent</FoldText>
              <ListItem
                title="bc1q...0wlh"
                secondaryText="Last used 2 days ago"
                leadingSlot={
                  <IconContainer
                    size="sm"
                    icon={<BitcoinStrokeIcon width={20} height={20} color={colorMaps.face.primary} />}
                  />
                }
                trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
                onPress={() => onContinue("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
              />
            </View>
          )}
        </View>
      </FullscreenTemplate>
    );
  }

  // Cash: phone or email
  return (
    <FullscreenTemplate
      title={config.title}
      onLeftPress={onClose}
      scrollable={false}
      navVariant={navVariant}
      keyboardAware
      footer={
        <ModalFooter
          modalVariant="keyboard"
          primaryButton={
            <Button
              label="Continue"
              hierarchy="primary"
              size="md"
              disabled={isEmpty}
              onPress={() => onContinue(value)}
            />
          }
        />
      }
    >
      <View style={styles.container}>
        <TextField
          placeholder="Phone number or email"
          value={value}
          onChangeText={setValue}
          trailingSlot={
            !isEmpty ? (
              <Pressable onPress={handleClear}>
                <XCloseIcon width={16} height={16} color={colorMaps.face.secondary} />
              </Pressable>
            ) : undefined
          }
          autoFocus
        />

        {isEmpty && (
          <View style={styles.recentSection}>
            <FoldText type="body-sm" style={styles.recentLabel}>Recent</FoldText>
            <ListItem
              title="Alex Johnson"
              secondaryText="+1 (555) 012-3456"
              leadingSlot={
                <IconContainer
                  size="sm"
                  icon={<UserIcon width={20} height={20} color={colorMaps.face.primary} />}
                />
              }
              trailingSlot={<ChevronRightIcon width={20} height={20} color={colorMaps.face.tertiary} />}
              onPress={() => onContinue("+15550123456")}
            />
          </View>
        )}
      </View>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["400"],
    gap: spacing["300"],
    alignItems: "flex-start",
  },
  recentSection: {
    width: "100%",
    marginTop: spacing["300"],
    gap: spacing["100"],
  },
  recentLabel: {
    color: colorMaps.face.tertiary,
  },
});
