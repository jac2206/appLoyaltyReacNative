import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  type TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import type { Colors } from "../styles/colors";
import { layout, spacing } from "../styles/tokens";

type Props = { children: ReactNode; centered?: boolean };

const FocusedInputContext = createContext<(input: TextInput | null) => void>(() => {});

export function useFocusedInput() {
  return useContext(FocusedInputContext);
}

export function ScreenLayout({ children, centered = false }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const scrollRef = useRef<ScrollView>(null);
  const focusedInput = useRef<TextInput | null>(null);
  const scrollOffset = useRef(0);
  const keyboardTop = useRef<number | null>(null);
  const frame = useRef<number | null>(null);

  const ensureVisible = useCallback(() => {
    if (Platform.OS === "web") return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const input = focusedInput.current;
      const scroll = scrollRef.current;
      if (!input || !scroll) return;
      scroll
        .getNativeScrollRef()
        ?.measureInWindow((_x, viewportY, _width, viewportHeight) => {
          input.measureInWindow((_inputX, inputY, _inputWidth, inputHeight) => {
            if (focusedInput.current !== input) return;
            const bottom = Math.min(
              viewportY + viewportHeight,
              keyboardTop.current ?? Infinity,
            );
            const below = inputY + inputHeight + spacing.md - bottom;
            const above = inputY - spacing.md - viewportY;
            const adjustment = below > 0 ? below : Math.min(above, 0);
            if (adjustment !== 0) {
              scroll.scrollTo({
                y: Math.max(0, scrollOffset.current + adjustment),
                animated: true,
              });
            }
          });
        });
    });
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (event) => {
      keyboardTop.current = event.endCoordinates.screenY;
      ensureVisible();
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      keyboardTop.current = null;
    });
    return () => {
      show.remove();
      hide.remove();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [ensureVisible]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.current = event.nativeEvent.contentOffset.y;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={[styles.content, centered && styles.centered]}
          onLayout={ensureVisible}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <FocusedInputContext.Provider
            value={(input) => {
              focusedInput.current = input;
              if (input) ensureVisible();
            }}
          >
            {children}
          </FocusedInputContext.Provider>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: Colors) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    keyboard: { flex: 1 },
    content: {
      flexGrow: 1,
      width: "100%",
      maxWidth: layout.contentWidth,
      alignSelf: "center",
      padding: spacing.xl,
      paddingBottom: spacing.xxl,
    },
    centered: { justifyContent: "center" },
  });
}
