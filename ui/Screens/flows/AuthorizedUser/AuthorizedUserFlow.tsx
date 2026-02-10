import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenStack from "../../../Templates/ScreenStack";
import AuthUserIntroScreen from "./screens/AuthUserIntroScreen";
import AuthUserNameScreen from "./screens/AuthUserNameScreen";
import AuthUserAddressScreen from "./screens/AuthUserAddressScreen";
import AuthUserDetailsScreen from "./screens/AuthUserDetailsScreen";
import AuthUserReviewScreen from "./screens/AuthUserReviewScreen";
import AuthUserSuccessScreen from "./screens/AuthUserSuccessScreen";
import AuthUserManagerScreen from "./screens/AuthUserManagerScreen";
import { AuthorizedUser } from "../../../Slots/AuthorizedUser/AuthUserManager";

type FlowStep = "intro" | "name" | "address" | "details" | "review";

export interface AuthorizedUserFlowProps {
  onComplete: () => void;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  useDefaultAddress: boolean;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  ssn: string;
  email: string;
}

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  useDefaultAddress: false,
  dobMonth: "",
  dobDay: "",
  dobYear: "",
  ssn: "",
  email: "",
};

export default function AuthorizedUserFlow({ onComplete, onClose }: AuthorizedUserFlowProps) {
  const [flowStack, setFlowStack] = useState<FlowStep[]>(["intro"]);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [authorizedUsers, setAuthorizedUsers] = useState<AuthorizedUser[]>([]);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pushStep = (step: FlowStep) => {
    setFlowStack((prev) => [...prev, step]);
  };

  const handleBack = () => {
    setFlowStack((prev) => prev.slice(0, -1));
  };

  const handleConfirm = () => {
    setFlowStack([]);
    setShowSuccess(true);
  };

  const handleFlowEmpty = () => {
    if (!showSuccess) {
      onClose();
    }
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    setAuthorizedUsers((prev) => [
      ...prev,
      { id: String(Date.now()), name: `${formData.firstName} ${formData.lastName}`, status: "Activation required" },
    ]);
    setShowManager(true);
  };

  const renderScreen = (step: string) => {
    switch (step) {
      case "intro":
        return (
          <AuthUserIntroScreen
            onContinue={() => pushStep("name")}
            onClose={() => setFlowStack([])}
          />
        );
      case "name":
        return (
          <AuthUserNameScreen
            formData={formData}
            onChangeField={updateField}
            onContinue={() => pushStep("address")}
            onBack={handleBack}
          />
        );
      case "address":
        return (
          <AuthUserAddressScreen
            formData={formData}
            onChangeField={updateField}
            onContinue={() => pushStep("details")}
            onBack={handleBack}
          />
        );
      case "details":
        return (
          <AuthUserDetailsScreen
            formData={formData}
            onChangeField={updateField}
            onContinue={() => pushStep("review")}
            onBack={handleBack}
          />
        );
      case "review":
        return (
          <AuthUserReviewScreen
            formData={formData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  if (showManager) {
    return (
      <View style={styles.container}>
        <AuthUserManagerScreen
          authorizedUsers={authorizedUsers}
          onAddUser={() => {
            setShowManager(false);
            setFormData(INITIAL_FORM_DATA);
            setFlowStack(["intro"]);
          }}
          onBack={onComplete}
        />
      </View>
    );
  }

  if (showSuccess) {
    return <AuthUserSuccessScreen firstName={formData.firstName} onDone={handleSuccessDone} />;
  }

  return (
    <View style={styles.container}>
      <ScreenStack
        stack={flowStack}
        renderScreen={renderScreen}
        animateInitial
        onEmpty={handleFlowEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
  },
});
