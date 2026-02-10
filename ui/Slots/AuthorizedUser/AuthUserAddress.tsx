import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import Checklist from "../../../components/Selectors/Checklist/Checklist";
import { SearchMdIcon } from "../../../components/Icons/SearchMdIcon";
import { spacing } from "../../../components/tokens";

export interface AuthUserAddressFormData {
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  useDefaultAddress: boolean;
}

interface AuthUserAddressProps {
  formData: AuthUserAddressFormData;
  onChangeField: (field: keyof AuthUserAddressFormData, value: string | boolean) => void;
}

export default function AuthUserAddress({
  formData,
  onChangeField,
}: AuthUserAddressProps) {
  return (
    <>
      <PrimaryHeader
        header="Where do they live?"
        body="We'll ship the authorized user's card here."
        validationChildren={
          <Checklist
            label="Default"
            isSelected={formData.useDefaultAddress}
            hasDiv={false}
            onPress={() => onChangeField("useDefaultAddress", !formData.useDefaultAddress)}
          />
        }
      />

      <View style={styles.form}>
        <TextField
          label="Home address"
          placeholder="Type to search"
          value={formData.address}
          onChangeText={(text) => onChangeField("address", text)}
          trailingSlot={<SearchMdIcon />}
        />
        <TextField
          label="Apartment, unit, etc."
          isOptional
          placeholder="Apartment, unit, etc."
          value={formData.apt}
          onChangeText={(text) => onChangeField("apt", text)}
        />
        <TextField
          label="City"
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => onChangeField("city", text)}
        />
        <View style={styles.row}>
          <View style={styles.halfField}>
            <TextField
              label="State"
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => onChangeField("state", text)}
            />
          </View>
          <View style={styles.halfField}>
            <TextField
              label="ZIP code"
              placeholder="Zip code"
              value={formData.zip}
              onChangeText={(text) => onChangeField("zip", text)}
              keyboardType="number-pad"
            />
          </View>
        </View>
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
  row: {
    flexDirection: "row",
    gap: spacing["400"],
  },
  halfField: {
    flex: 1,
  },
});
