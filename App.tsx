import "react-native-gesture-handler";
import "./global.css";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { store } from "./src/store/store";
import { clearSession, setSession } from "./src/store/slices/authSlice";
import { setBiometricLockEnabled, setLanguage, setNotificationsEnabled, setThemeMode } from "./src/store/slices/settingsSlice";
import { AuthService } from "./src/services/Auth/AuthService";
import {
  clearStoredSession,
  loadStoredSession,
  saveStoredSession,
} from "./src/services/Auth/sessionStorage";
import { loadStoredSettings, saveStoredSettings } from "./src/services/settings/settingsStorage";
import { useAppSelector } from "./src/store/hooks";

const AppContent = () => {
  const themeMode = useAppSelector((state) => state.settings.themeMode);

  return (
    <SafeAreaProvider>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default function App() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const hydrateSessionAndSettings = async () => {
      const savedSettings = await loadStoredSettings();
      if (savedSettings) {
        store.dispatch(setThemeMode(savedSettings.themeMode));
        store.dispatch(setLanguage(savedSettings.language));
        store.dispatch(setNotificationsEnabled(savedSettings.notificationsEnabled));
        store.dispatch(setBiometricLockEnabled(savedSettings.biometricLockEnabled));
      }

      const stored = await loadStoredSession();
      if (stored?.accessToken) {
        store.dispatch(
          setSession({
            accessToken: stored.accessToken,
            user: stored.user,
          }),
        );

        // Try refreshing token on app launch.
        try {
          const refreshed = await AuthService.refreshSession();
          if (refreshed?.accessToken) {
            store.dispatch(
              setSession({
                accessToken: refreshed.accessToken,
                user: refreshed.userData || stored.user || null,
              }),
            );
          }
        } catch (error: unknown) {
          const status = (error as { response?: { status?: number } })?.response?.status;
          if (status === 401 || status === 403) {
            store.dispatch(clearSession());
            await clearStoredSession();
          }
        }
      }
      if (isMounted) {
        setIsHydrated(true);
      }
    };

    hydrateSessionAndSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let prevAccessToken = store.getState().auth.accessToken;
    let prevUser = store.getState().auth.user;

    const unsubscribe = store.subscribe(() => {
      const auth = store.getState().auth;
      if (auth.accessToken === prevAccessToken && auth.user === prevUser) return;

      prevAccessToken = auth.accessToken;
      prevUser = auth.user;

      if (auth.accessToken) {
        void saveStoredSession({
          accessToken: auth.accessToken,
          user: auth.user,
        });
      } else {
        void clearStoredSession();
      }
    });

    return unsubscribe;
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    let prevSettings = store.getState().settings;
    const unsubscribe = store.subscribe(() => {
      const settings = store.getState().settings;
      if (settings === prevSettings) return;
      prevSettings = settings;
      void saveStoredSettings(settings);
    });

    return unsubscribe;
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <SafeAreaProvider>
        <View className="flex-1 items-center justify-center bg-[#fff8f2]">
          <ActivityIndicator size="large" color="#ea580c" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
