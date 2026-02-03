import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import IconLibrary from './components/IconLibrary';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootTemplate from './ui/Templates/RootTemplate';
import FullscreenTemplate from './ui/Templates/FullscreenTemplate';
import { BellIcon } from './components/Icons/BellIcon';
import { ClockIcon } from './components/Icons/ClockIcon';
import FoldPressable from './components/Primitives/FoldPressable';

import BankScreen from './ui/Screens/BankScreen';
import ExchangeScreen from './ui/Screens/ExchangeScreen';
import TagScreen from './ui/Screens/TagScreen';
import HistoryScreen from './ui/Screens/HistoryScreen';
import TransactionDetailScreen from './ui/Screens/TransactionDetailScreen';
import { ComponentLibraryScreen } from './components/ComponentLibrary';
import { TransactionData } from './components/Transactions/TransactionList';
import SearchGCEmptySlot from './ui/Slots/GiftCard/SearchGCEmptySlot';

export default function App() {
  const [activeTab, setActiveTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'history' | 'componentLibrary' | 'transactionDetail'>('center');
  const [previousTab, setPreviousTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'componentLibrary'>('center');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [showSearchGiftCards, setShowSearchGiftCards] = useState(false);

  const goToHistory = () => {
    setPreviousTab(activeTab as any);
    setActiveTab('history');
  };

  const goToTransactionDetail = (transaction: TransactionData) => {
    setSelectedTransaction(transaction);
    setActiveTab('transactionDetail');
  };

  const goToSearchGiftCards = () => {
    setShowSearchGiftCards(true);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'left':
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} />;
      case 'center':
        return <ExchangeScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} />;
      case 'right':
        return <TagScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} onSearchGiftCards={goToSearchGiftCards} />;
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
        return (
          <HistoryScreen
            onBack={() => setActiveTab(previousTab)}
            onTransactionPress={goToTransactionDetail}
          />
        );
      case 'transactionDetail':
        return selectedTransaction ? (
          <TransactionDetailScreen
            transaction={selectedTransaction}
            onBack={() => setActiveTab('history')}
          />
        ) : null;
      case 'componentLibrary':
        return <ComponentLibraryScreen onBack={() => setActiveTab(previousTab)} />;
      default:
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} />;
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          {renderScreen()}
          {showSearchGiftCards && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
              <SearchGCEmptySlot
                onSearchBack={() => setShowSearchGiftCards(false)}
              />
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

