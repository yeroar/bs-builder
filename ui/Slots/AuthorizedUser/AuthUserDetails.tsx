import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import Footnote from "../../../components/Inputs/footnote/Footnote";
import { EyeIcon } from "../../../components/Icons/EyeIcon";
import { ShieldIcon } from "../../../components/Icons/ShieldIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface AuthUserDetailsFormData {
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  ssn: string;
  email: string;
}

interface AuthUserDetailsProps {
  formData: AuthUserDetailsFormData;
  onChangeField: (field: keyof AuthUserDetailsFormData, value: string) => void;
}

export default function AuthUserDetails({
  formData,
  onChangeField,
}: AuthUserDetailsProps) {
  const [showSSN, setShowSSN] = useState(false);

  return (
    <>
      <PrimaryHeader
        header="We need a little more"
        body="This information is used to verify and communicate with the authorized user."
      />

      <View style={styles.form}>
        <View style={styles.dobRow}>
          <View style={styles.dobMonth}>
            <TextField
              label="Date of birth"
              placeholder="Mon"
              value={formData.dobMonth}
              onChangeText={(text) => onChangeField("dobMonth", text)}
            />
          </View>
          <View style={styles.dobSmall}>
            <TextField
              label=" "
              placeholder="DD"
              value={formData.dobDay}
              onChangeText={(text) => onChangeField("dobDay", text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.dobSmall}>
            <TextField
              label=" "
              placeholder="YYYY"
              value={formData.dobYear}
              onChangeText={(text) => onChangeField("dobYear", text)}
              keyboardType="number-pad"
            />
          </View>
        </View>

        <TextField
          label="SSN"
          placeholder="Social security number"
          value={formData.ssn}
          onChangeText={(text) => onChangeField("ssn", text)}
          secureTextEntry={!showSSN}
          keyboardType="number-pad"
          trailingSlot={
            <Pressable onPress={() => setShowSSN(!showSSN)}>
              <EyeIcon color={colorMaps.face.secondary} />
            </Pressable>
          }
          footer={
            <Footnote
              type="info"
              message="Information is secured with 128-bit encryption"
              leadingSlot={<ShieldIcon width={12} height={12} color={colorMaps.face.tertiary} />}
            />
          }
        />

        <TextField
          label="Email"
          placeholder="Email address"
          value={formData.email}
          onChangeText={(text) => onChangeField("email", text)}
          keyboardType="email-address"
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
  dobRow: {
    flexDirection: "row",
    gap: spacing["400"],
  },
  dobMonth: {
    flex: 2,
  },
  dobSmall: {
    flex: 1,
  },
});
