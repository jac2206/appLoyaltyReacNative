import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ContentState } from "../components/ContentState";
import { ScreenLayout } from "../components/ScreenLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

export function AppNavigator() {
  const { user, loading } = useAuth();
  const { colors, isDark } = useTheme();
  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  if (loading) {
    return (
      <ScreenLayout centered>
        <ContentState
          loading
          title="Preparando tu cuenta"
          message="Estamos restaurando tu sesión."
        />
      </ScreenLayout>
    );
  }

  return (
    <NavigationContainer
      theme={{
        ...baseTheme,
        colors: {
          ...baseTheme.colors,
          primary: colors.primary,
          background: colors.background,
          card: colors.surface,
          text: colors.textDark,
          border: colors.border,
          notification: colors.error,
        },
      }}
    >
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
