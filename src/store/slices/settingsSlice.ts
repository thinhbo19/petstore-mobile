import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";
export type AppLanguage = "vi" | "en";

export type SettingsState = {
  themeMode: ThemeMode;
  language: AppLanguage;
  notificationsEnabled: boolean;
  biometricLockEnabled: boolean;
};

const initialState: SettingsState = {
  themeMode: "light",
  language: "vi",
  notificationsEnabled: true,
  biometricLockEnabled: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    setBiometricLockEnabled: (state, action: PayloadAction<boolean>) => {
      state.biometricLockEnabled = action.payload;
    },
  },
});

export const {
  setThemeMode,
  setLanguage,
  setNotificationsEnabled,
  setBiometricLockEnabled,
} = settingsSlice.actions;

export default settingsSlice.reducer;
