import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import FullscreenTemplate from './ui/Templates/FullscreenTemplate';

import BankScreen from './ui/Screens/mainTabs/BankScreen';
import ExchangeScreen from './ui/Screens/mainTabs/ExchangeScreen';
import TagScreen from './ui/Screens/mainTabs/TagScreen';
import HistoryScreen from './ui/Screens/flows/History/HistoryScreen';
import { TransactionCategory } from './ui/Slots/Transactions/Transactions';
import { ComponentLibraryScreen } from './components/ComponentLibrary';
import GiftCardPurchaseFlow from './ui/Screens/flows/GiftCard/GiftCardPurchaseFlow';
import { SelectedCard } from './ui/Screens/flows/GiftCard/GiftCardPurchaseFlow';
import { BtcBuyFlow, BtcSellFlow } from './ui/Screens/flows';
import { useOverlays } from './hooks/useOverlays';

export default function App() {
  const [activeTab, setActiveTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'componentLibrary'>('left');
  const [previousTab, setPreviousTab] = useState<'left' | 'center' | 'right' | 'notifications' | 'componentLibrary'>('left');
  const { overlays, push, close, get } = useOverlays();

  const goToHistory = (category?: TransactionCategory) => {
    push({ type: 'history', category });
  };

  const goToGiftCardFlow = (card?: SelectedCard) => {
    push({ type: 'giftCardFlow', card });
  };

  const handleBuySellFlow = (flow: 'buy' | 'sell', opts?: { initialAmount?: string; onComplete?: () => void }) => {
    if (flow === 'buy') {
      push({ type: 'buyFlow', initialAmount: opts?.initialAmount, onComplete: opts?.onComplete });
    } else {
      push({ type: 'sellFlow', onComplete: opts?.onComplete });
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'left':
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} onBuySellFlow={handleBuySellFlow} />;
      case 'center':
        return <ExchangeScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onBuyPress={() => push({ type: 'buyFlow' })} onSellPress={() => push({ type: 'sellFlow' })} onMenuPress={() => console.log("Menu Pressed")} />;
      case 'right':
        return <TagScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} onGiftCardFlow={goToGiftCardFlow} />;
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
        return <BankScreen onTabPress={setActiveTab} onHistoryPress={goToHistory} onMenuPress={() => console.log("Menu Pressed")} onBuySellFlow={handleBuySellFlow} />;
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          {renderScreen()}
          {overlays.map((overlay) => {
            switch (overlay.type) {
              case 'history':
                return (
                  <HistoryScreen
                    key="history"
                    onBack={() => close('history')}
                    defaultCategory={overlay.category}
                  />
                );
              case 'giftCardFlow':
                return (
                  <GiftCardPurchaseFlow
                    key="giftCardFlow"
                    card={overlay.card}
                    onComplete={() => close('giftCardFlow')}
                    onClose={() => close('giftCardFlow')}
                  />
                );
              case 'buyFlow':
                return (
                  <BtcBuyFlow
                    key="buy"
                    initialAmount={overlay.initialAmount}
                    onComplete={() => {
                      overlay.onComplete?.();
                      close('buyFlow');
                    }}
                    onClose={() => close('buyFlow')}
                  />
                );
              case 'sellFlow':
                return (
                  <BtcSellFlow
                    key="sell"
                    onComplete={() => {
                      overlay.onComplete?.();
                      close('sellFlow');
                    }}
                    onClose={() => close('sellFlow')}
                  />
                );
            }
          })}
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
