import { useState, useCallback } from "react";
import { TransactionCategory } from "../ui/Slots/Transactions/Transactions";
import { SelectedCard } from "../ui/Screens/flows/GiftCard/GiftCardPurchaseFlow";

export type OverlayType =
  | { type: "history"; category?: TransactionCategory }
  | { type: "giftCardFlow"; card?: SelectedCard }
  | { type: "buyFlow"; initialAmount?: string; onComplete?: () => void }
  | { type: "sellFlow"; onComplete?: () => void };

export function useOverlays() {
  const [overlays, setOverlays] = useState<OverlayType[]>([]);

  const push = useCallback((o: OverlayType) => {
    setOverlays(prev => [...prev, o]);
  }, []);

  const close = useCallback((type: OverlayType["type"]) => {
    setOverlays(prev => prev.filter(o => o.type !== type));
  }, []);

  const get = useCallback((type: OverlayType["type"]) => {
    return overlays.find(o => o.type === type);
  }, [overlays]);

  return { overlays, push, close, get };
}
