import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

type Props = {
  children: ReactNode;
};

export const ScreenContainer = ({ children }: Props) => {
  return (
    <LinearGradient colors={[colors.bgStart, colors.bgMid, colors.bgEnd]} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-4">{children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};
