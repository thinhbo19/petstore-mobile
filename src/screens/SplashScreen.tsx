import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 900);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View className="flex-1 items-center justify-center">
        <Entrance>
          <View className="min-w-[230px] items-center gap-3 rounded-[20px] border border-[#f8c6a8] bg-[#fff8f2] px-8 py-6">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-orange-100">
              <MaterialCommunityIcons name="paw" size={30} color="#ea580c" />
            </View>
            <Text className="text-lg font-bold text-[#252020]">PetStore Mobile</Text>
            <Text className="text-center text-sm text-[#8a6f61]">
              Đang tải trải nghiệm mua sắm và chăm sóc thú cưng...
            </Text>
            <ActivityIndicator size="small" color="#ea580c" />
          </View>
        </Entrance>
      </View>
    </ScreenContainer>
  );
};
