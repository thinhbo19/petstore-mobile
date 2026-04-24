import * as SecureStore from "expo-secure-store";
import type { SettingsState } from "../../store/slices/settingsSlice";

const SETTINGS_KEY = "petstore.app.settings";

export const loadStoredSettings = async (): Promise<SettingsState | null> => {
  try {
    const raw = await SecureStore.getItemAsync(SETTINGS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SettingsState>;
    if (!parsed) return null;
    return {
      themeMode: parsed.themeMode === "dark" ? "dark" : "light",
      language: parsed.language === "en" ? "en" : "vi",
      notificationsEnabled: Boolean(parsed.notificationsEnabled),
      biometricLockEnabled: Boolean(parsed.biometricLockEnabled),
    };
  } catch {
    return null;
  }
};

export const saveStoredSettings = async (settings: SettingsState): Promise<void> => {
  await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(settings));
};
