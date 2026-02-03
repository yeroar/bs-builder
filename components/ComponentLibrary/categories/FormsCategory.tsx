import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import Button, { ButtonHierarchy, ButtonSize } from "../../Buttons/Button/Button";
import TextContainer from "../../Input/TextContainer/TextContainer";
import Toggle from "../../Toggle/Toggle";
import Chip, { ChipType } from "../../Chip/Chip";
import SearchBar from "../../Input/SearchBar/SearchBar";
import { colorMaps, spacing } from "../../tokens";

export default function FormsCategory() {
  // Button state
  const [buttonHierarchy, setButtonHierarchy] = useState<ButtonHierarchy>("primary");
  const [buttonSize, setButtonSize] = useState<ButtonSize>("md");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // TextContainer state
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  // SearchBar state
  const [searchValue, setSearchValue] = useState("");
  const [searchAutoFocus, setSearchAutoFocus] = useState(false);
  const [searchForceFilledState, setSearchForceFilledState] = useState(false);

  // Toggle state
  const [toggleValue, setToggleValue] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  // Chip state
  const [chipType, setChipType] = useState<ChipType>("primary");
  const [chipBold, setChipBold] = useState(true);

  return (
    <View style={styles.container}>
      {/* Button */}
      <ComponentCard
        title="Button"
        description="Primary action component with multiple hierarchies and sizes"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Hierarchy"
              value={buttonHierarchy}
              onChange={setButtonHierarchy}
              options={[
                { label: "primary", value: "primary" },
                { label: "secondary", value: "secondary" },
                { label: "tertiary", value: "tertiary" },
                { label: "inverse", value: "inverse" },
                { label: "destructive", value: "destructive" },
              ]}
            />
            <PropControl
              type="select"
              label="Size"
              value={buttonSize}
              onChange={setButtonSize}
              options={[
                { label: "lg", value: "lg" },
                { label: "md", value: "md" },
                { label: "sm", value: "sm" },
                { label: "xs", value: "xs" },
              ]}
            />
            <PropControl
              type="toggle"
              label="Disabled"
              value={buttonDisabled}
              onChange={setButtonDisabled}
            />
          </View>
        }
      >
        <Button
          label="Button Label"
          hierarchy={buttonHierarchy}
          size={buttonSize}
          disabled={buttonDisabled}
          onPress={() => { }}
        />
      </ComponentCard>

      {/* TextContainer / Input */}
      <ComponentCard
        title="TextContainer"
        description="Text input with leading/trailing slots and error states"
        controls={
          <PropControl
            type="toggle"
            label="Error"
            value={inputError}
            onChange={setInputError}
          />
        }
      >
        <View style={styles.inputPreview}>
          <TextContainer
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter text..."
            error={inputError}
          />
        </View>
      </ComponentCard>

      {/* SearchBar */}
      <ComponentCard
        title="SearchBar"
        description="Search input with state transitions, icon management, and keyboard handling"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Auto Focus"
              value={searchAutoFocus}
              onChange={setSearchAutoFocus}
            />
            <PropControl
              type="toggle"
              label="Force Filled State"
              value={searchForceFilledState}
              onChange={setSearchForceFilledState}
            />
          </View>
        }
      >
        <View style={styles.inputPreview}>
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search brands"
            autoFocus={searchAutoFocus}
            forceFilledState={searchForceFilledState}
            onBack={() => console.log("Back pressed")}
          />
        </View>
      </ComponentCard>

      {/* Toggle */}
      <ComponentCard
        title="Toggle"
        description="Binary on/off switch"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="toggle"
              label="Value"
              value={toggleValue}
              onChange={setToggleValue}
            />
            <PropControl
              type="toggle"
              label="Disabled"
              value={toggleDisabled}
              onChange={setToggleDisabled}
            />
          </View>
        }
      >
        <Toggle
          value={toggleValue}
          onValueChange={setToggleValue}
          disabled={toggleDisabled}
        />
      </ComponentCard>

      {/* Chip */}
      <ComponentCard
        title="Chip"
        description="Small label component for status and categories"
        controls={
          <View style={styles.controlsColumn}>
            <PropControl
              type="select"
              label="Type"
              value={chipType}
              onChange={setChipType}
              options={[
                { label: "primary", value: "primary" },
                { label: "accent", value: "accent" },
                { label: "success", value: "success" },
              ]}
            />
            <PropControl
              type="toggle"
              label="Bold"
              value={chipBold}
              onChange={setChipBold}
            />
          </View>
        }
      >
        <Chip
          label="Chip Label"
          type={chipType}
          bold={chipBold}
        />
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
  inputPreview: {
    width: "100%",
    maxWidth: 300,
  },
});
