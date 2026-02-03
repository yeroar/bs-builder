import { View, StyleSheet } from "react-native";
import RootTemplate from "../Templates/RootTemplate";
import { PriceChartContainer } from "../Exchange/PriceChart/PriceChartContainer";
import ExchangeControl from "../Exchange/ExchangeControl";
import { BellIcon } from "../icons/BellIcon";
import { ClockIcon } from "../icons/ClockIcon";
import FoldPressable from "../Primitives/FoldPressable";
import { colorMaps, spacing } from "../tokens";
import { BtcPrice, PriceChange } from "../Exchange";

export interface ExchangeScreenProps {
  onTabPress?: (tab: any) => void;
  onHistoryPress?: () => void;
  onMenuPress?: () => void;
}

import { ExchangeProvider } from "../Exchange/ExchangeContext";

export default function ExchangeScreen({ onTabPress, onHistoryPress, onMenuPress }: ExchangeScreenProps) {
  return (
    <RootTemplate
      variant="root"
      activeTab="center"
      onTabPress={onTabPress}
      leftIcon="menu"
      onLeftPress={onMenuPress}
      rightComponents={[
        <FoldPressable key="clock" onPress={onHistoryPress}>
          <ClockIcon width={24} height={24} color={colorMaps.face.primary} />
        </FoldPressable>,
        <FoldPressable key="bell" onPress={() => onTabPress("componentLibrary")}>
          <BellIcon width={24} height={24} color={colorMaps.face.primary} />
        </FoldPressable>,
      ]}
      backgroundColor={colorMaps.object.primary.bold.default} // Yellow #FD3
      tabBarVariant="brand"
      scrollable={false}
    >
      <ExchangeProvider onAction={onHistoryPress}>
        <View style={styles.content}>
          <BtcPrice label="Bitcoin" />
          <View style={styles.chartWrapper}>
            <PriceChartContainer />
          </View>
          <ExchangeControl />
        </View>
      </ExchangeProvider>
    </RootTemplate>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: spacing["400"],
  },
  chartWrapper: {
    flex: 1,
    justifyContent: "center",
    minHeight: 300,
  },
});
