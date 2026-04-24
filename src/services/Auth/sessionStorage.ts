import * as SecureStore from "expo-secure-store";

const SESSION_KEY = "petstore.auth.session";

export type StoredSession = {
  accessToken: string;
  user: Record<string, unknown> | null;
};

export const loadStoredSession = async (): Promise<StoredSession | null> => {
  try {
    const raw = await SecureStore.getItemAsync(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed?.accessToken) return null;
    return {
      accessToken: parsed.accessToken,
      user: parsed.user ?? null,
    };
  } catch {
    return null;
  }
};

export const saveStoredSession = async (session: StoredSession): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
};

export const clearStoredSession = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};
