import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import { useAppSelector } from "../store/hooks";

type Props = {
  children: ReactNode;
};

export const ScreenContainer = ({ children }: Props) => {
  const isDark = useAppSelector((state) => state.settings.themeMode === "dark");
  const gradientColors = isDark
    ? (["#0b1220", "#111827", "#1f2937"] as const)
    : ([colors.bgStart, colors.bgMid, colors.bgEnd] as const);

  return (
    <LinearGradient colors={gradientColors} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};
