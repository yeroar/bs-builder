import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import PrimaryHeader from "../../DataDisplay/Headers/PrimaryHeader";
import SecondaryHeader from "../../DataDisplay/Headers/SecondaryHeader";
import SearchHeader from "../../DataDisplay/Headers/SearchHeader";
import TransactionHeader from "../../DataDisplay/Headers/TransactionHeader";
import Validation from "../../Primitives/ValidationItems/Validation";
import ValidationGroup from "../../Primitives/ValidationItems/ValidationGroup";
import Button from "../../Primitives/Buttons/Button/Button";
import { colorMaps, spacing } from "../../tokens";

export default function HeadersCategory() {
  // PrimaryHeader state
  const [primaryHasBody, setPrimaryHasBody] = useState(true);
  const [primaryHasDisclaimer, setPrimaryHasDisclaimer] = useState(true);
  const [primaryHasValidation, setPrimaryHasValidation] = useState(false);
  const [primaryHasButtons, setPrimaryHasButtons] = useState(false);

  // SecondaryHeader state
  const [secondaryHasBody, setSecondaryHasBody] = useState(true);
  const [secondaryHasDisclaimer, setSecondaryHasDisclaimer] = useState(false);

  // SearchHeader state
  const [searchHasAction, setSearchHasAction] = useState(true);

  // TransactionHeader state
  const [transactionHasSubheader, setTransactionHasSubheader] = useState(true);
  const [transactionHasFootnote, setTransactionHasFootnote] = useState(true);

  return (
    <View style={styles.container}>
      {/* PrimaryHeader */}
      <ComponentCard
        title="PrimaryHeader"
        description="Main header for primary screens"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Has Body"
              value={primaryHasBody}
              onChange={setPrimaryHasBody}
            />
            <PropControl
              type="toggle"
              label="Has Disclaimer"
              value={primaryHasDisclaimer}
              onChange={setPrimaryHasDisclaimer}
            />
            <PropControl
              type="toggle"
              label="Has Validation"
              value={primaryHasValidation}
              onChange={setPrimaryHasValidation}
            />
            <PropControl
              type="toggle"
              label="Has Buttons"
              value={primaryHasButtons}
              onChange={setPrimaryHasButtons}
            />
          </View>
        }
      >
        <View style={styles.headerPreview}>
          <PrimaryHeader
            header="Welcome Back"
            body={primaryHasBody ? "This is the body text that provides additional context." : undefined}
            hasBodyText={primaryHasBody}
            disclaimer={primaryHasDisclaimer ? "Terms and conditions apply." : undefined}
            hasDisclaimer={primaryHasDisclaimer}
            validationChildren={
              primaryHasValidation ? (
                <ValidationGroup>
                  <Validation label="At least 8 characters" type="success" />
                  <Validation label="Contains uppercase" type="success" />
                  <Validation label="Contains number" type="danger" />
                </ValidationGroup>
              ) : undefined
            }
            leadingSlot={primaryHasButtons ? <Button label="Cancel" hierarchy="secondary" size="sm" /> : undefined}
            trailingSlot={primaryHasButtons ? <Button label="Continue" hierarchy="primary" size="sm" /> : undefined}
          />
        </View>
      </ComponentCard>

      {/* SecondaryHeader */}
      <ComponentCard
        title="SecondaryHeader"
        description="Secondary header for sub-sections"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Has Body"
              value={secondaryHasBody}
              onChange={setSecondaryHasBody}
            />
            <PropControl
              type="toggle"
              label="Has Disclaimer"
              value={secondaryHasDisclaimer}
              onChange={setSecondaryHasDisclaimer}
            />
          </View>
        }
      >
        <View style={styles.headerPreview}>
          <SecondaryHeader
            title="Section Title"
            body={secondaryHasBody ? "Additional context for this section." : undefined}
            disclaimer={secondaryHasDisclaimer ? "Some disclaimer text here." : undefined}
          />
        </View>
      </ComponentCard>

      {/* SearchHeader */}
      <ComponentCard
        title="SearchHeader"
        description="Header with search results title and action"
        controls={
          <PropControl
            type="toggle"
            label="Has Action"
            value={searchHasAction}
            onChange={setSearchHasAction}
          />
        }
      >
        <View style={styles.headerPreview}>
          <SearchHeader
            title="Search Results"
            actionLabel={searchHasAction ? "See All" : undefined}
            onActionPress={() => {}}
          />
        </View>
      </ComponentCard>

      {/* TransactionHeader */}
      <ComponentCard
        title="TransactionHeader"
        description="Header for transaction details"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Has Subheader"
              value={transactionHasSubheader}
              onChange={setTransactionHasSubheader}
            />
            <PropControl
              type="toggle"
              label="Has Footnote"
              value={transactionHasFootnote}
              onChange={setTransactionHasFootnote}
            />
          </View>
        }
      >
        <View style={styles.headerPreview}>
          <TransactionHeader
            title="$125.00"
            subheader={transactionHasSubheader ? "0.00234 BTC" : undefined}
            hasSubheader={transactionHasSubheader}
            footnote={transactionHasFootnote ? "Jan 15, 2024 at 3:45 PM" : undefined}
            hasFootnote={transactionHasFootnote}
          />
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
  headerPreview: {
    width: "100%",
    backgroundColor: colorMaps.layer.background,
    overflow: "hidden",
    borderRadius: 8,
  },
});
