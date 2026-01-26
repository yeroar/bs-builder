import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colorMaps } from './tokens/colorMaps';
import NavTab from './NavTab/NavTab';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 3;

interface NavTabBarProps {
  activeTab?: 'left' | 'center' | 'right' | 'notifications';
  onTabPress?: (tab: 'left' | 'center' | 'right' | 'notifications') => void;
}

const NavTabBar = ({ activeTab: controlledActiveTab, onTabPress }: NavTabBarProps) => {
  const [internalActiveTab, setInternalActiveTab] = useState<'left' | 'center' | 'right' | 'notifications'>('left');
  
  const activeTab = controlledActiveTab || internalActiveTab;
  const setActiveTab = (tab: 'left' | 'center' | 'right' | 'notifications') => {
    if (onTabPress) {
      onTabPress(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  return (
    <View style={styles.tabBar}>
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
  tabLeft: {
    width: TAB_WIDTH,
    alignItems: 'flex-end',
    paddingRight: 46,
  },
  tabCenter: {
    width: TAB_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  tabRight: {
    width: TAB_WIDTH,
    alignItems: 'flex-start',
    paddingLeft: 46,
  },
});

export default NavTabBar;
