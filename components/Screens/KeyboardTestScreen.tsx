import React from "react";
import { View, StyleSheet } from "react-native";
import FullscreenTemplate from "../Templates/FullscreenTemplate";
import { FoldText } from "../Primitives/FoldText";
import TextContainer from "../Input/TextContainer/TextContainer";
import { spacing, colorMaps } from "../tokens";
import ProgressIndicator from "../dataViz/ProgressIndicator";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import Chip from "../Chip/Chip";

interface KeyboardTestScreenProps {
  onBack: () => void;
}

export default function KeyboardTestScreen({ onBack }: KeyboardTestScreenProps) {
  return (
    <FullscreenTemplate
      onLeftPress={onBack}
      variant="progressive"
      leftIcon="back"
      step={<ProgressIndicator variant="01" />}
    >
      <View style={styles.container}>
        <FoldText type="header-lg" style={styles.title}>
          Keyboard test
        </FoldText>

        <TextContainer
          placeholder="Placeholder"
          leadingSlot={<Chip label="Chip" type="primary" />}
          trailingSlot={<ChevronDownIcon width={16} height={16} color={colorMaps.face.disabled} />}
        />
      </View>
    </FullscreenTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing["400"],
    paddingTop: spacing["800"],
    gap: spacing["600"],
  },
  title: {
    color: "#383323",
  },
});
