import React, { useState, useMemo } from "react";
import { View, StyleSheet, Clipboard } from "react-native";
import TextField from "../../../components/Inputs/TextContainer/TextField";
import ListItem from "../../../components/DataDisplay/ListItem/ListItem";
import { IconContainer } from "../../../components/Primitives/IconContainer";
import Button from "../../../components/Primitives/Buttons/Button/Button";
import { FoldText } from "../../../components/Primitives/FoldText";
import { ScanIcon } from "../../../components/Icons/ScanIcon";
import { ClockIcon } from "../../../components/Icons/ClockIcon";
import SparkleIcon from "../../../components/Icons/SparkleIcon";
import { GlobeIcon } from "../../../components/Icons/GlobeIcon";
import { colorMaps, spacing } from "../../../components/tokens";

export interface RecipientEntry {
  address: string;
  label?: string;
  avatar?: React.ReactNode;
  transactionCount: number;
}

export interface SelectRecipientProps {
  onSelect: (recipient: { address: string; label?: string }) => void;
  onClose: () => void;
  onScanQR: () => void;
  recents?: RecipientEntry[];
  suggested?: RecipientEntry[];
  addressBook?: RecipientEntry[];
}

function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}····${address.slice(-4)}`;
}

function transactionText(count: number): string {
  if (count === 0) return "No Previous Transactions";
  return `${count} Previous Transaction${count > 1 ? "s" : ""}`;
}

export default function SelectRecipient({
  onSelect,
  onClose,
  onScanQR,
  recents = [
    { address: "0xStashAddress", label: "Stash", transactionCount: 1 },
  ],
  suggested = [
    { address: "0xb249abcd12349768", transactionCount: 1 },
  ],
  addressBook = [
    { address: "0xd8dA6BF26964aF9D65e", label: "vitalik.eth", transactionCount: 0 },
  ],
}: SelectRecipientProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  const query = inputValue.toLowerCase();

  const filteredRecents = useMemo(
    () =>
      recents.filter(
        (r) =>
          !query ||
          r.label?.toLowerCase().includes(query) ||
          r.address.toLowerCase().includes(query)
      ),
    [recents, query]
  );

  const filteredSuggested = useMemo(
    () =>
      suggested.filter(
        (r) =>
          !query ||
          r.label?.toLowerCase().includes(query) ||
          r.address.toLowerCase().includes(query)
      ),
    [suggested, query]
  );

  const filteredAddressBook = useMemo(
    () =>
      addressBook.filter(
        (r) =>
          !query ||
          r.label?.toLowerCase().includes(query) ||
          r.address.toLowerCase().includes(query)
      ),
    [addressBook, query]
  );

  const hasResults =
    filteredRecents.length > 0 ||
    filteredSuggested.length > 0 ||
    filteredAddressBook.length > 0;

  const handlePaste = async () => {
    try {
      const text = await Clipboard.getString();
      setInputValue(text);
      setError(undefined);
    } catch {
      // clipboard unavailable
    }
  };

  const handleSelect = (entry: RecipientEntry) => {
    onSelect({ address: entry.address, label: entry.label });
  };

  const renderEntry = (entry: RecipientEntry, index: number) => (
    <ListItem
      key={`${entry.address}-${index}`}
      leadingSlot={
        entry.avatar || (
          <IconContainer
            variant="default-fill"
            size="sm"
          />
        )
      }
      title={entry.label || truncateAddress(entry.address)}
      secondaryText={transactionText(entry.transactionCount)}
      onPress={() => handleSelect(entry)}
    />
  );

  return (
    <View style={styles.container}>
      <TextField
        placeholder="ENS or Address"
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);
          setError(undefined);
        }}
        state={error ? "error" : undefined}
        footer={error}
        footerType="error"
        leadingSlot={
          <FoldText type="body-md" style={{ color: colorMaps.face.secondary }}>
            To
          </FoldText>
        }
        trailingSlot={
          <Button
            hierarchy="secondary"
            size="xs"
            label="Paste"
            onPress={handlePaste}
          />
        }
      />

      <ListItem
        leadingSlot={
          <IconContainer
            variant="default-stroke"
            size="md"
            icon={
              <ScanIcon
                width={20}
                height={20}
                color={colorMaps.face.primary}
              />
            }
          />
        }
        title="Scan QR Code"
        secondaryText="Tap to scan an address"
        onPress={onScanQR}
      />

      {!hasResults && query.length > 0 && (
        <View style={styles.emptyState}>
          <FoldText type="body-md" style={{ color: colorMaps.face.tertiary }}>
            No results found
          </FoldText>
        </View>
      )}

      {filteredRecents.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ClockIcon
              width={14}
              height={14}
              color={colorMaps.face.tertiary}
            />
            <FoldText type="body-sm" style={styles.sectionLabel}>
              Recents
            </FoldText>
          </View>
          {filteredRecents.map(renderEntry)}
        </View>
      )}

      {filteredSuggested.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <SparkleIcon
              width={14}
              height={14}
              color={colorMaps.face.tertiary}
            />
            <FoldText type="body-sm" style={styles.sectionLabel}>
              Suggested
            </FoldText>
          </View>
          {filteredSuggested.map(renderEntry)}
        </View>
      )}

      {filteredAddressBook.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <GlobeIcon
              width={14}
              height={14}
              color={colorMaps.face.tertiary}
            />
            <FoldText type="body-sm" style={styles.sectionLabel}>
              Address Book
            </FoldText>
          </View>
          {filteredAddressBook.map(renderEntry)}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing["400"],
  },
  section: {
    gap: spacing["100"],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["200"],
  },
  sectionLabel: {
    color: colorMaps.face.tertiary,
  },
  emptyState: {
    paddingVertical: spacing["800"],
    alignItems: "center",
  },
});
