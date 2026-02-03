import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ComponentCard from "../ComponentCard";
import PropControl from "../PropControl";
import ProductSurfacePrimary from "../../DataDisplay/ProductSurface/ProductSurfacePrimary";
import ProductSurfaceSecondary from "../../DataDisplay/ProductSurface/ProductSurfaceSecondary";
import MarcomSecondaryTile from "../../DataDisplay/Marcom/MarcomSecondaryTile";
import MarcomProductTile from "../../DataDisplay/Marcom/MarcomProductTile";
import ProgressBar from "../../dataViz/ProgressBar";
import ProgressVisualization from "../../dataViz/ProgressVisualization";
import Button from "../../Primitives/Buttons/Button/Button";
import InfoCircleIcon from "../../Icons/InfoCircleIcon";
import { colorMaps, spacing } from "../../tokens";

export default function DataDisplayCategory() {
  // ProductSurface state
  const [productVariant, setProductVariant] = useState<"expanded" | "condensed">("expanded");

  // ProgressBar state
  const [progressValue, setProgressValue] = useState(65);

  return (
    <View style={styles.container}>
      {/* ProductSurfacePrimary */}
      <ComponentCard
        title="ProductSurfacePrimary"
        description="Primary product display surface with balance and actions"
        controls={
          <PropControl
            type="select"
            label="Variant"
            value={productVariant}
            onChange={setProductVariant}
            options={[
              { label: "expanded", value: "expanded" },
              { label: "condensed", value: "condensed" },
            ]}
          />
        }
      >
        <View style={styles.productPreview}>
          <ProductSurfacePrimary
            variant={productVariant}
            label="Bitcoin"
            amount="$5,100.00"
            primaryButton={
              <Button label="Buy" hierarchy="primary" size="sm" onPress={() => { }} />
            }
          />
        </View>
      </ComponentCard>

      {/* ProductSurfaceSecondary */}
      <ComponentCard
        title="ProductSurfaceSecondary"
        description="Secondary product surface with label and progress indicator"
      >
        <View style={styles.productPreview}>
          <ProductSurfaceSecondary
            label="Rewards"
            amount="1,250 sats"
            dataViz={<ProgressBar progress={65} />}
          />
        </View>
      </ComponentCard>

      {/* MarcomSecondaryTile */}
      <ComponentCard
        title="MarcomSecondaryTile"
        description="Secondary marketing tile with chevron"
      >
        <View style={styles.marcomPreview}>
          <MarcomSecondaryTile
            header="Special Offer"
            bodyText="Get 2% back on all purchases"
            onPress={() => { }}
          />
        </View>
      </ComponentCard>

      {/* MarcomProductTile */}
      <ComponentCard
        title="MarcomProductTile"
        description="Product marketing tile with CTA"
      >
        <View style={styles.marcomPreview}>
          <MarcomProductTile
            label="Activate Debit Card"
            message="Your card is ready. Activate to start spending."
            button={
              <Button label="Activate" hierarchy="secondary" size="xs" onPress={() => { }} />
            }
          />
        </View>
      </ComponentCard>

      {/* ProgressBar */}
      <ComponentCard
        title="ProgressBar"
        description="Visual progress indicator"
        controls={
          <PropControl
            type="select"
            label="Progress"
            value={String(progressValue)}
            onChange={(v) => setProgressValue(Number(v))}
            options={[
              { label: "0%", value: "0" },
              { label: "25%", value: "25" },
              { label: "50%", value: "50" },
              { label: "75%", value: "75" },
              { label: "100%", value: "100" },
            ]}
          />
        }
      >
        <View style={styles.progressPreview}>
          <ProgressBar progress={progressValue} />
        </View>
      </ComponentCard>

      {/* ProgressVisualization */}
      <ComponentCard
        title="ProgressVisualization"
        description="Progress bar with contextual labels"
      >
        <View style={styles.progressPreview}>
          <ProgressVisualization
            leftText="$750 spent"
            rightText="$250 remaining"
            leadingSlot={<InfoCircleIcon width={16} height={16} color={colorMaps.face.secondary} />}
          >
            <ProgressBar progress={75} />
          </ProgressVisualization>
        </View>
      </ComponentCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing["400"],
  },
  productPreview: {
    width: "100%",
  },
  marcomPreview: {
    width: "100%",
    maxWidth: 320,
  },
  progressPreview: {
    width: "100%",
    maxWidth: 300,
    paddingHorizontal: spacing["200"],
  },
});
