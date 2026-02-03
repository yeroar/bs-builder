import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  Image,
} from "react-native";
import { FoldText } from "../../Primitives/FoldText";
import { colorMaps, spacing, radius } from "../../tokens";

export interface MarcomHeroCardProps {
  variant?: "generic" | "gift-card";
  title: string;
  subtitle?: string;
  brand?: string;
  percentage?: string;
  button?: React.ReactNode;
  backgroundImage?: ImageSourcePropType;
  style?: ViewStyle;
  testID?: string;
}

export default function MarcomHeroCard({
  variant = "generic",
  title,
  subtitle,
  brand,
  percentage,
  button,
  backgroundImage,
  style,
  testID,
}: MarcomHeroCardProps) {
  const isGeneric = variant === "generic";

  return (
    <View
      style={[
        styles.container,
        isGeneric ? styles.containerGeneric : styles.containerGiftCard,
        style,
      ]}
      testID={testID}
    >
      {/* Image Placeholder */}
      {backgroundImage && (
        <View style={styles.imageContainer}>
          <Image source={backgroundImage} style={styles.image} resizeMode="cover" />
        </View>
      )}

      {/* Content */}
      {isGeneric ? (
        <View style={styles.content}>
          <FoldText type="header-md" style={styles.titleGeneric}>
            {title}
          </FoldText>
          {subtitle && (
            <FoldText type="body-lg" style={styles.subtitleGeneric}>
              {subtitle}
            </FoldText>
          )}
        </View>
      ) : (
        <>
          <FoldText type="header-md" style={styles.titleGiftCard}>
            {title}
          </FoldText>
          {button && <View style={styles.buttonContainer}>{button}</View>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 335,
    borderRadius: 16,
    paddingHorizontal: spacing["500"],
    paddingTop: spacing["500"],
    paddingBottom: spacing["800"],
    gap: spacing["400"],
    shadowColor: "#B6AC90",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  containerGeneric: {
    backgroundColor: colorMaps.object.primary.bold.default,
    height: 402,
  },
  containerGiftCard: {
    backgroundColor: colorMaps.special.offWhite,
  },
  imageContainer: {
    width: 295,
    height: 222,
    backgroundColor: colorMaps.object.accent.bold.selected,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    gap: spacing["150"],
    paddingRight: 40,
  },
  titleGeneric: {
    color: colorMaps.face.primary,
    lineHeight: 28,
  },
  subtitleGeneric: {
    color: colorMaps.face.secondary,
    lineHeight: 24,
  },
  titleGiftCard: {
    color: colorMaps.face.primary,
    lineHeight: 28,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
});
