import { useState, useEffect } from "react";
import { Keyboard, Platform } from "react-native";

const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

let listenerCount = 0;
let currentValue = false;
const subscribers = new Set<(v: boolean) => void>();

function ensureListeners() {
  if (listenerCount === 0) {
    Keyboard.addListener(showEvent, () => { currentValue = true; subscribers.forEach(fn => fn(true)); });
    Keyboard.addListener(hideEvent, () => { currentValue = false; subscribers.forEach(fn => fn(false)); });
  }
}

ensureListeners();

export function useKeyboardVisible(): boolean {
  const [visible, setVisible] = useState(currentValue);

  useEffect(() => {
    subscribers.add(setVisible);
    return () => { subscribers.delete(setVisible); };
  }, []);

  return visible;
}
