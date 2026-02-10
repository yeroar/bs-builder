import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FoldText } from "../../../components/Primitives/FoldText";
import PillSelector from "../../../components/Selectors/PillSelector/PillSelector";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import { colorMaps, spacing } from "../../../components/tokens";

export type DeliveryMethod = "text" | "email";

export interface SendAsAGiftProps {
  /** Selected delivery method */
  deliveryMethod?: DeliveryMethod;
  /** Callback when delivery method changes */
  onDeliveryMethodChange?: (method: DeliveryMethod) => void;
  /** Sender name value */
  senderName?: string;
  /** Callback when sender name changes */
  onSenderNameChange?: (value: string) => void;
  /** Recipient phone number value */
  recipientPhone?: string;
  /** Callback when recipient phone changes */
  onRecipientPhoneChange?: (value: string) => void;
  /** Recipient name value */
  recipientName?: string;
  /** Callback when recipient name changes */
  onRecipientNameChange?: (value: string) => void;
  /** Gift message value */
  giftMessage?: string;
  /** Callback when gift message changes */
  onGiftMessageChange?: (value: string) => void;
  testID?: string;
}

export default function SendAsAGift({
  deliveryMethod = "text",
  onDeliveryMethodChange,
  senderName = "",
  onSenderNameChange,
  recipientPhone = "",
  onRecipientPhoneChange,
  recipientName = "",
  onRecipientNameChange,
  giftMessage = "",
  onGiftMessageChange,
  testID,
}: SendAsAGiftProps) {
  const [internalMethod, setInternalMethod] = useState<DeliveryMethod>(deliveryMethod);

  const currentMethod = onDeliveryMethodChange ? deliveryMethod : internalMethod;

  const handleMethodChange = (method: DeliveryMethod) => {
    if (onDeliveryMethodChange) {
      onDeliveryMethodChange(method);
    } else {
      setInternalMethod(method);
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <FoldText type="header-md" style={styles.title}>
            Send as a gift
          </FoldText>

          {/* Segment Selector */}
          <View style={styles.segmentSelector}>
            <PillSelector
              label="Text message"
              isActive={currentMethod === "text"}
              variant="onLight"
              size="md"
              onPress={() => handleMethodChange("text")}
            />
            <PillSelector
              label="Email"
              isActive={currentMethod === "email"}
              variant="onLight"
              size="md"
              onPress={() => handleMethodChange("email")}
            />
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Your Name */}
          <TextField
            label="Your name"
            placeholder="Your name"
            value={senderName}
            onChangeText={onSenderNameChange}
          />

          {/* Recipient Phone Number */}
          <TextField
            label="Recipient phone number"
            placeholder="Phone number"
            value={recipientPhone}
            onChangeText={onRecipientPhoneChange}
            keyboardType="phone-pad"
          />

          {/* Recipient Name */}
          <TextField
            label="Recipient name"
            placeholder="Name"
            value={recipientName}
            onChangeText={onRecipientNameChange}
          />


          {/* Message (optional, multiline) */}
          <TextField
            label="Label"
            isOptional
            placeholder="Placeholder"
            value={giftMessage}
            onChangeText={onGiftMessageChange}
            multiline
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorMaps.layer.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colorMaps.layer.background,
    borderBottomWidth: 0.5,
    borderBottomColor: colorMaps.border.tertiary,
    padding: spacing["500"],
    gap: spacing["400"],
  },
  title: {
    color: colorMaps.face.primary,
  },
  segmentSelector: {
    flexDirection: "row",
    gap: spacing["200"],
  },
  form: {
    backgroundColor: colorMaps.layer.background,
    padding: spacing["500"],
    gap: spacing["400"],
  },
});
