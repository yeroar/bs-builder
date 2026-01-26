import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TextContainer from './TextContainer';
import {
  colorMaps,
  spacing,
  radius,
  typographyStyles,
} from "../../tokens";
import Chip from "../../Chip/Chip";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
export default function TextContainerExample() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('Example text');
  const [hasError, setHasError] = useState(false);

  return (
    <View style={styles.container}>
      {/* Empty state */}
      <TextContainer
        placeholder="Enter text..."
        value={value1}
        onChangeText={setValue1}
        testID="text-input-empty"
      />

      {/* Filled state */}
      <TextContainer
        placeholder="Enter text..."
        value={value2}
        onChangeText={setValue2}
        testID="text-input-filled"
      />

      {/* With chip */}
      <TextContainer
        placeholder="Phone number"
        leadingSlot={<Chip label="+1" type="primary" />}
        testID="text-input-chip"
      />

      {/* Error state */}
      <TextContainer
        placeholder="Required field"
        error={hasError}
        onChangeText={(text) => setHasError(text.length === 0)}
        testID="text-input-error"
      />

      {/* Non-editable (like a button) */}
      <TextContainer
        value="Select option"
        editable={false}
        trailingSlot={<ChevronDownIcon width={16} height={16} color={colorMaps.face.disabled} />}
        onPress={() => console.log('Pressed!')}
        testID="text-input-select"
      />

      {/* Controlled state */}
      <TextContainer
        state="typing"
        value="Forced typing state"
        placeholder="Type here..."
        testID="text-input-controlled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[400],
    gap: spacing[400],
  },
});
