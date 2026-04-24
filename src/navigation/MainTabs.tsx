import { useMemo, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert, Animated, Pressable, Switch, Text, View } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { ProductsScreen } from "../screens/ProductsScreen";
import { ServicesScreen } from "../screens/ServicesScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { colors } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setBiometricLockEnabled,
  setLanguage,
  setNotificationsEnabled,
  setThemeMode,
} from "../store/slices/settingsSlice";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  const dispatch = useAppDispatch();
  const { themeMode, language, notificationsEnabled, biometricLockEnabled } = useAppSelector(
    (state) => state.settings,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerTranslateX = useRef(new Animated.Value(-320)).current;
  const isDark = themeMode === "dark";

  const t = useMemo(
    () =>
      language === "vi"
        ? {
            home: "Trang chủ",
            products: "Sản phẩm",
            services: "Dịch vụ",
            profile: "Tài khoản",
            settings: "Cài đặt",
            notifications: "Thông báo",
            language: "Ngôn ngữ",
            darkMode: "Chế độ tối",
            pushNoti: "Thông báo đẩy",
            biometricLock: "Khóa sinh trắc học",
            appPreferences: "Tùy chọn ứng dụng",
            security: "Bảo mật",
            support: "Trợ giúp & Hỗ trợ",
            about: "Về ứng dụng",
            clearCache: "Xóa bộ nhớ tạm",
          }
        : {
            home: "Home",
            products: "Products",
            services: "Services",
            profile: "Profile",
            settings: "Settings",
            notifications: "Notifications",
            language: "Language",
            darkMode: "Dark mode",
            pushNoti: "Push notifications",
            biometricLock: "Biometric lock",
            appPreferences: "App preferences",
            security: "Security",
            support: "Help & Support",
            about: "About app",
            clearCache: "Clear cache",
          },
    [language],
  );

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.timing(drawerTranslateX, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerTranslateX, {
      toValue: -320,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: isDark ? "#0f172a" : "#fff7ed" },
          headerTitleStyle: { color: isDark ? "#f8fafc" : colors.foreground, fontWeight: "700" },
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t.settings}
                style={{ padding: 4 }}
                onPress={openDrawer}
              >
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={22}
                  color={isDark ? "#f8fafc" : colors.foreground}
                />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t.notifications}
                style={{ padding: 4 }}
                onPress={() => Alert.alert(t.notifications, "Tính năng sắp ra mắt.")}
              >
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={22}
                  color={isDark ? "#f8fafc" : colors.foreground}
                />
              </Pressable>
            </View>
          ),
          tabBarActiveTintColor: colors.brand600,
          tabBarInactiveTintColor: "#94a3b8",
          tabBarStyle: {
            borderTopColor: isDark ? "#334155" : "#fed7aa",
            backgroundColor: isDark ? "#0b1220" : "#fff",
          },
          sceneStyle: { backgroundColor: isDark ? "#0b1220" : "#fff" },
          tabBarIcon: ({ color, size }) => {
            const iconNameMap: Record<
              keyof MainTabParamList,
              "home-outline" | "package-variant-closed" | "briefcase-outline" | "account-outline"
            > = {
              Home: "home-outline",
              Products: "package-variant-closed",
              Services: "briefcase-outline",
              Profile: "account-outline",
            };
            return (
              <MaterialCommunityIcons name={iconNameMap[route.name]} size={size} color={color} />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: t.home }} />
        <Tab.Screen name="Products" component={ProductsScreen} options={{ title: t.products }} />
        <Tab.Screen name="Services" component={ServicesScreen} options={{ title: t.services }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t.profile }} />
      </Tab.Navigator>

      {isDrawerOpen ? (
        <>
          <Pressable
            onPress={closeDrawer}
            className="absolute inset-0 bg-black/35"
            accessibilityRole="button"
            accessibilityLabel="Đóng cài đặt"
          />
          <Animated.View
            className={`absolute left-0 top-0 h-full w-[320px] border-r ${
              isDark ? "border-slate-700 bg-slate-900" : "border-orange-100 bg-white"
            } p-4`}
            style={{ transform: [{ translateX: drawerTranslateX }] }}
          >
            <View className="mb-2 flex-row items-center justify-between">
              <Text className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                {t.settings}
              </Text>
              <Pressable onPress={closeDrawer}>
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color={isDark ? "#f8fafc" : "#0f172a"}
                />
              </Pressable>
            </View>

            <View className="mt-3 gap-2">
              <Text className={`text-xs uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {t.appPreferences}
              </Text>

              <View className="flex-row items-center justify-between rounded-xl bg-orange-50 px-3 py-3">
                <Text className="font-medium text-slate-800">{t.darkMode}</Text>
                <Switch
                  value={isDark}
                  onValueChange={(value) => {
                    dispatch(setThemeMode(value ? "dark" : "light"));
                  }}
                />
              </View>

              <View className="rounded-xl bg-orange-50 px-3 py-3">
                <Text className="mb-2 font-medium text-slate-800">{t.language}</Text>
                <View className="flex-row gap-2">
                  <Pressable
                    className={`rounded-full px-3 py-1.5 ${language === "vi" ? "bg-orange-500" : "bg-white"}`}
                    onPress={() => dispatch(setLanguage("vi"))}
                  >
                    <Text
                      className={
                        language === "vi" ? "font-semibold text-white" : "font-semibold text-slate-700"
                      }
                    >
                      Tiếng Việt
                    </Text>
                  </Pressable>
                  <Pressable
                    className={`rounded-full px-3 py-1.5 ${language === "en" ? "bg-orange-500" : "bg-white"}`}
                    onPress={() => dispatch(setLanguage("en"))}
                  >
                    <Text
                      className={
                        language === "en" ? "font-semibold text-white" : "font-semibold text-slate-700"
                      }
                    >
                      English
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="flex-row items-center justify-between rounded-xl bg-orange-50 px-3 py-3">
                <Text className="font-medium text-slate-800">{t.pushNoti}</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={(value) => {
                    dispatch(setNotificationsEnabled(value));
                  }}
                />
              </View>
            </View>

            <View className="mt-5 gap-2">
              <Text className={`text-xs uppercase ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {t.security}
              </Text>
              <View className="flex-row items-center justify-between rounded-xl bg-orange-50 px-3 py-3">
                <Text className="font-medium text-slate-800">{t.biometricLock}</Text>
                <Switch
                  value={biometricLockEnabled}
                  onValueChange={(value) => {
                    dispatch(setBiometricLockEnabled(value));
                  }}
                />
              </View>
              <Pressable
                className="rounded-xl bg-orange-50 px-3 py-3"
                onPress={() => Alert.alert(t.clearCache, "Đã xóa bộ nhớ tạm (mô phỏng).")}
              >
                <Text className="font-medium text-slate-800">{t.clearCache}</Text>
              </Pressable>
              <Pressable
                className="rounded-xl bg-orange-50 px-3 py-3"
                onPress={() => Alert.alert(t.support, "Liên hệ: support@petstore.app")}
              >
                <Text className="font-medium text-slate-800">{t.support}</Text>
              </Pressable>
              <Pressable
                className="rounded-xl bg-orange-50 px-3 py-3"
                onPress={() => Alert.alert(t.about, "PetStore Mobile v1.0.0")}
              >
                <Text className="font-medium text-slate-800">{t.about}</Text>
              </Pressable>
            </View>
          </Animated.View>
        </>
      ) : null}
    </View>
  );
};
