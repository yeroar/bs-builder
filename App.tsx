import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import FullscreenTemplate from './ui/Templates/FullscreenTemplate';

import BankScreen from './ui/Screens/mainTabs/BankScreen';
import ExchangeScreen from './ui/Screens/mainTabs/ExchangeScreen';
import TagScreen from './ui/Screens/mainTabs/TagScreen';
import HistoryScreen from './ui/Screens/HistoryScreen';
import { TransactionCategory } from './ui/Slots/Transactions/TransactionsSlot';
import { ComponentLibraryScreen } from './components/ComponentLibrary';
import GiftCardSearchScreen from './ui/Screens/GiftCardSearchScreen';
import { BtcBuyFlow, BtcSellFlow } from './ui/Screens/flows';

type ExchangeFlow = 'buy' | 'sell' | null;

export default function App() {
  const [activeTab, setActiveTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'componentLibrary'>('center');
  const [previousTab, setPreviousTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'componentLibrary'>('center');
  const [showHistory, setShowHistory] = useState(false);
  const [historyCategory, setHistoryCategory] = useState<TransactionCategory | undefined>();
  const [showSearchGiftCards, setShowSearchGiftCards] = useState(false);
  const [exchangeFlow, setExchangeFlow] = useState<ExchangeFlow>(null);

  const goToHistory = (category?: TransactionCategory) => {
    setHistoryCategory(category);
    setShowHistory(true);
  };

  const goToSearchGiftCards = () => {
    setShowSearchGiftCards(true);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'left':
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} />;
      case 'center':
        return <ExchangeScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onBuyPress={() => setExchangeFlow('buy')} onSellPress={() => setExchangeFlow('sell')} onMenuPress={() => console.log("Menu Pressed")} />;
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
          {showHistory && (
            <HistoryScreen
              onBack={() => setShowHistory(false)}
              defaultCategory={historyCategory}
            />
          )}
          {showSearchGiftCards && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }}>
              <GiftCardSearchScreen
                onBack={() => setShowSearchGiftCards(false)}
              />
            </View>
          )}
          {exchangeFlow === 'buy' && (
            <BtcBuyFlow
              onComplete={() => setExchangeFlow(null)}
              onClose={() => setExchangeFlow(null)}
            />
          )}
          {exchangeFlow === 'sell' && (
            <BtcSellFlow
              onComplete={() => setExchangeFlow(null)}
              onClose={() => setExchangeFlow(null)}
            />
          )}
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

