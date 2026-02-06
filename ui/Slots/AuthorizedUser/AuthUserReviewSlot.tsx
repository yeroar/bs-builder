import React from "react";
import { View, StyleSheet } from "react-native";
import PrimaryHeader from "../../../components/DataDisplay/Headers/PrimaryHeader";
import ListItemReceipt from "../../../components/DataDisplay/ListItem/Receipt/ListItemReceipt";
import Divider from "../../../components/Primitives/Divider/Divider";
import { spacing } from "../../../components/tokens";

export interface AuthUserReviewFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  ssn: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  address: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
}

interface AuthUserReviewSlotProps {
  formData: AuthUserReviewFormData;
}

const MONTH_NAMES: Record<string, string> = {
  "01": "January", "02": "February", "03": "March", "04": "April",
  "05": "May", "06": "June", "07": "July", "08": "August",
  "09": "September", "10": "October", "11": "November", "12": "December",
  "1": "January", "2": "February", "3": "March", "4": "April",
  "5": "May", "6": "June", "7": "July", "8": "August",
  "9": "September",
};

function formatLegalName(first: string, middle: string, last: string): string {
  return [first, middle, last].filter(Boolean).join(" ");
}

function formatSSN(ssn: string): string {
  const digits = ssn.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  return `\u2022\u2022\u2022 \u2022\u2022 ${last4}`;
}

function formatDOB(month: string, day: string, year: string): string {
  const monthName = MONTH_NAMES[month] || month;
  return `${monthName} ${day}, ${year}`;
}

function formatAddress(address: string, apt: string, city: string, state: string, zip: string): string {
  const line1 = apt ? `${address} ${apt}` : address;
  return `${line1}\n${city}, ${state} ${zip}`;
}

export default function AuthUserReviewSlot({ formData }: AuthUserReviewSlotProps) {
  return (
    <>
      <PrimaryHeader
        header="Review and confirm"
        body="Please check the details below to ensure everything is correct. The authorized user account creation will fail if the details are incorrect."
      />

      <Divider />

      <View style={styles.receiptList}>
        <ListItemReceipt
          label="Legal name"
          value={formatLegalName(formData.firstName, formData.middleName, formData.lastName)}
        />
        <ListItemReceipt
          label="Email"
          value={formData.email}
        />
        <ListItemReceipt
          label="SSN"
          value={formatSSN(formData.ssn)}
        />
        <ListItemReceipt
          label="Date of birth"
          value={formatDOB(formData.dobMonth, formData.dobDay, formData.dobYear)}
        />
        <ListItemReceipt
          label="Address"
          value={formatAddress(
            formData.address,
            formData.apt,
            formData.city,
            formData.state,
            formData.zip,
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  receiptList: {
    paddingHorizontal: spacing["500"],
  },
});
