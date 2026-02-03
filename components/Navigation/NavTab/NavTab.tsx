import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import NavBankSolidIcon from '../../Icons/NavBankSolidIcon';
import NavBankDuoIcon from '../../Icons/NavBankDuoIcon';
import NavExchangeSolidIcon from '../../Icons/NavExchangeSolidIcon';
import NavExchangeDuoIcon from '../../Icons/NavExchangeDuoIcon';
import NavTagSolidIcon from '../../Icons/NavTagSolidIcon';
import NavTagDuoIcon from '../../Icons/NavTagDuoIcon';
import { spacing } from '../../tokens/spacing';

export type NavTabVariant = 'left' | 'center' | 'right';

interface NavTabProps {
  variant: NavTabVariant;
  isActive: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  style?: any;
}

const ICON_SIZE = spacing["600"];

const NavTab = ({ variant, isActive, onPress, icon, style }: NavTabProps) => {
  const renderIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case 'left':
        return isActive ? <NavBankSolidIcon width={ICON_SIZE} height={ICON_SIZE} /> : <NavBankDuoIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 'center':
        return isActive ? <NavExchangeSolidIcon width={ICON_SIZE} height={ICON_SIZE} /> : <NavExchangeDuoIcon width={ICON_SIZE} height={ICON_SIZE} />;
      case 'right':
        return isActive ? <NavTagSolidIcon width={ICON_SIZE} height={ICON_SIZE} /> : <NavTagDuoIcon width={ICON_SIZE} height={ICON_SIZE} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.tab, style]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    height: spacing["2200"],
    paddingTop: spacing["400"],
    justifyContent: 'flex-start',
  },
});

export default NavTab;
