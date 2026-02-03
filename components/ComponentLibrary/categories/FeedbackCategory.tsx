import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import Validation, { ValidationType } from "../../Primitives/ValidationItems/Validation";
import ValidationGroup from "../../Primitives/ValidationItems/ValidationGroup";
import Toast, { ToastType } from "../../Feedback/Toast/Toast";
import Message, { MessageVariant } from "../../Feedback/Message/Message";
import ProgressIndicator from "../../dataViz/ProgressIndicator";
import Button from "../../Primitives/Buttons/Button/Button";
import { colorMaps, spacing } from "../../tokens";

interface FeedbackCategoryProps {
  onShowToast?: (message: string, type: ToastType) => void;
}

export default function FeedbackCategory({ onShowToast }: FeedbackCategoryProps) {
  // Validation state
  const [validationType, setValidationType] = useState<ValidationType>("success");

  // Toast state
  const [toastType, setToastType] = useState<ToastType>("info");

  // Message state
  const [messageVariant, setMessageVariant] = useState<MessageVariant>("information");

  // ProgressIndicator state
  const [progressStep, setProgressStep] = useState<"01" | "02" | "03" | "04">("02");

  return (
    <View style={styles.container}>
      {/* Validation */}
      <ComponentCard
        title="Validation"
        description="Single validation item with status indicator"
        controls={
          <PropControl
            type="select"
            label="Type"
            value={validationType}
            onChange={setValidationType}
            options={[
              { label: "success", value: "success" },
              { label: "danger", value: "danger" },
            ]}
          />
        }
      >
        <View style={styles.validationPreview}>
          <Validation
            label="At least 8 characters"
            type={validationType}
          />
        </View>
      </ComponentCard>

      {/* ValidationGroup */}
      <ComponentCard
        title="ValidationGroup"
        description="Group of validation rules"
      >
        <View style={styles.validationPreview}>
          <ValidationGroup>
            <Validation label="At least 8 characters" type="success" />
            <Validation label="Contains uppercase letter" type="success" />
            <Validation label="Contains number" type="success" />
            <Validation label="Contains special character" type="danger" />
          </ValidationGroup>
        </View>
      </ComponentCard>

      {/* Toast */}
      <ComponentCard
        title="Toast"
        description="Temporary notification message"
        controls={
          <View style={styles.toastControls}>
            <PropControl
              type="select"
              label="Type"
              value={toastType}
              onChange={setToastType}
              options={[
                { label: "info", value: "info" },
                { label: "success", value: "success" },
                { label: "error", value: "error" },
              ]}
            />
            <Button
              label="Show Toast"
              hierarchy="primary"
              size="sm"
              onPress={() => {
                const message =
                  toastType === "success"
                    ? "Transaction completed successfully"
                    : toastType === "error"
                    ? "Something went wrong"
                    : "Your request is being processed";
                onShowToast?.(message, toastType);
              }}
            />
          </View>
        }
      >
        <View style={styles.toastPreview}>
          <Toast
            message={
              toastType === "success"
                ? "Transaction completed successfully"
                : toastType === "error"
                ? "Something went wrong"
                : "Your request is being processed"
            }
            type={toastType}
            animated={false}
          />
        </View>
      </ComponentCard>

      {/* Message */}
      <ComponentCard
        title="Message"
        description="Contextual message banner"
        controls={
          <PropControl
            type="select"
            label="Variant"
            value={messageVariant}
            onChange={setMessageVariant}
            options={[
              { label: "information", value: "information" },
              { label: "warning", value: "warning" },
              { label: "error", value: "error" },
            ]}
          />
        }
      >
        <View style={styles.messagePreview}>
          <Message
            title="Important Notice"
            message="This is a message that provides context or alerts users."
            variant={messageVariant}
          />
        </View>
      </ComponentCard>

      {/* ProgressIndicator */}
      <ComponentCard
        title="ProgressIndicator"
        description="Step progress indicator"
        controls={
          <PropControl
            type="select"
            label="Step"
            value={progressStep}
            onChange={setProgressStep}
            options={[
              { label: "01", value: "01" },
              { label: "02", value: "02" },
              { label: "03", value: "03" },
              { label: "04", value: "04" },
            ]}
          />
        }
      >
        <View style={styles.progressIndicatorPreview}>
          <ProgressIndicator variant={progressStep} />
        </View>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  validationPreview: {
    width: "100%",
    maxWidth: 300,
    paddingHorizontal: spacing["200"],
  },
  toastPreview: {
    width: "100%",
    maxWidth: 350,
  },
  toastControls: {
    gap: spacing["300"],
  },
  messagePreview: {
    width: "100%",
    maxWidth: 350,
  },
  progressIndicatorPreview: {
    width: "100%",
    maxWidth: 200,
    alignItems: "center",
  },
});
