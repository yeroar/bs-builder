import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import { spacing } from "../../../components/tokens";

export interface AuthUserNameFormData {
  firstName: string;
  middleName: string;
  lastName: string;
}

interface AuthUserNameProps {
  formData: AuthUserNameFormData;
  onChangeField: (field: keyof AuthUserNameFormData, value: string) => void;
}

export default function AuthUserName({
  formData,
  onChangeField,
}: AuthUserNameProps) {
  return (
    <>
      <PrimaryHeader
        header="Authorized user's name"
        body="Enter your authorized user's name to add them to this account."
      />

      <View style={styles.form}>
        <TextField
          label="First name"
          placeholder="First name"
          value={formData.firstName}
          onChangeText={(text) => onChangeField("firstName", text)}
        />
        <TextField
          label="Middle name"
          isOptional
          placeholder="Middle name"
          value={formData.middleName}
          onChangeText={(text) => onChangeField("middleName", text)}
        />
        <TextField
          label="Last name"
          placeholder="Last name"
          value={formData.lastName}
          onChangeText={(text) => onChangeField("lastName", text)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: spacing["500"],
    paddingVertical: spacing["200"],
    gap: spacing["400"],
  },
});
