import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import IconLibrary from './components/IconLibrary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootTemplate from './components/Templates/RootTemplate';
import FullscreenTemplate from './components/Templates/FullscreenTemplate';
import { BellIcon } from './components/icons/BellIcon';
import { ClockIcon } from './components/icons/ClockIcon';
import FoldPressable from './components/Primitives/FoldPressable';

import BankScreen from './components/Screens/BankScreen';
import ExchangeScreen from './components/Screens/ExchangeScreen';
import TagScreen from './components/Screens/TagScreen';
import KeyboardTestScreen from './components/Screens/KeyboardTestScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'history'>('left');
  const [previousTab, setPreviousTab] = useState<'left' | 'center' | 'right' | 'notifications'>('left');

  const goToHistory = () => {
    setPreviousTab(activeTab as any);
    setActiveTab('history');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'left':
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} />;
      case 'center':
        return <ExchangeScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} />;
      case 'right':
        return <TagScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} />;
      case 'notifications':
        return (
          <FullscreenTemplate
            title="Notifications"
            onLeftPress={() => setActiveTab('center')}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
              <Text style={{ fontSize: 18, textAlign: "center", color: '#383323' }}>
                This is the Notifications screen using FullscreenTemplate
              </Text>
              <Text style={{ marginTop: 20, color: '#89803a' }}>
                Tap the X to go back
              </Text>
            </View>
          </FullscreenTemplate>
        );
      case 'history':
        return <KeyboardTestScreen onBack={() => setActiveTab(previousTab)} />;
      default:
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} />;
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <IconLibrary />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

