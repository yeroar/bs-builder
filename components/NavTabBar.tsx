import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colorMaps, spacing } from './tokens';
import NavTab from './Navigation/NavTab/NavTab';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 3;

interface NavTabBarProps {
  activeTab?: 'left' | 'center' | 'right' | 'notifications';
  onTabPress?: (tab: 'left' | 'center' | 'right' | 'notifications') => void;
  variant?: 'default' | 'brand';
}

const NavTabBar = ({ activeTab: controlledActiveTab, onTabPress, variant = 'default' }: NavTabBarProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState<'left' | 'center' | 'right' | 'notifications'>('left');

  const activeTab = controlledActiveTab || internalActiveTab;
  const setActiveTab = (tab: 'left' | 'center' | 'right' | 'notifications') => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const isBrand = variant === 'brand';

  return (
    <View style={[styles.tabBar, isBrand && styles.tabBarBrand]}>
      <NavTab
        variant="left"
        isActive={activeTab === 'left'}
        onPress={() => setActiveTab('left')}
        style={styles.tabLeft}
      />
      <NavTab
        variant="center"
        isActive={activeTab === 'center'}
        onPress={() => setActiveTab('center')}
        style={styles.tabCenter}
      />
      <NavTab
        variant="right"
        isActive={activeTab === 'right'}
        onPress={() => setActiveTab('right')}
        style={styles.tabRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 88,
    backgroundColor: colorMaps.layer.background,
    borderTopWidth: 1,
    borderTopColor: colorMaps.border.tertiary,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarBrand: {
    backgroundColor: colorMaps.object.primary.bold.default, // Yellow #FD3
    borderTopWidth: 0,
  },
  tabLeft: {
    width: TAB_WIDTH,
    alignItems: 'flex-end',
    paddingRight: 46,
  },
  tabCenter: {
    width: TAB_WIDTH,
    alignItems: 'center',
    paddingHorizontal: spacing["200"],
  },
  tabRight: {
    width: TAB_WIDTH,
    alignItems: 'flex-start',
    paddingLeft: 46,
  },
});

export default NavTabBar;
