import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import type { RootStackParamList } from "../navigation/types";
import { AuthService } from "../services/Auth/AuthService";
import { getApiErrorMessage } from "../lib/apiError";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập email.");
      return;
    }
    try {
      setLoading(true);
      const data = await AuthService.forgotPasswordOtp(email);
      Alert.alert("Đã gửi OTP", (data as { message?: string })?.message || "Kiểm tra email để lấy OTP.", [
        { text: "OK", onPress: () => navigation.navigate("VerifyOtp", { email, purpose: "forgot" }) },
      ]);
    } catch (error) {
      Alert.alert("Thất bại", getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerClassName="flex-grow" keyboardShouldPersistTaps="handled">
          <Entrance fill>
            <View className="flex-1 overflow-hidden bg-[#fff8f2]">
              <ImageBackground
                source={require("../../assets/auth/login-hero.png")}
                className="h-[250px] justify-end"
                imageClassName="rounded-t-[20px]"
              >
                <View className="h-full items-center justify-end bg-[rgba(117,117,117,0.45)] px-4 py-[14px]">
                  <Text className="text-center text-[32px] font-extrabold text-white">Quên mật khẩu?</Text>
                  <Text className="mt-1.5 text-center text-base leading-5 text-orange-100">
                    Chúng tôi sẽ giúp bạn khôi phục mật khẩu
                  </Text>
                </View>
              </ImageBackground>
              <View className="flex-1 justify-start px-6 pb-6 pt-[22px]">
                <MaterialCommunityIcons
                  name="paw"
                  size={30}
                  color="#ea580c"
                  style={{ marginBottom: 8, alignSelf: "center" }}
                />
                <Text className="text-center text-[26px] font-bold text-[#252020]">Khôi phục mật khẩu</Text>
                <Text className="mb-[14px] mt-1.5 text-center text-xs font-medium leading-5 text-[#8a6f61]">
                  Nhập email để nhận hướng dẫn đặt lại mật khẩu
                </Text>
                <TextInput
                  className="mb-2.5 rounded-xl border border-orange-500 bg-white px-3 py-[11px]"
                  placeholder="Email"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Pressable
                  className={`mt-2 items-center rounded-xl bg-orange-500 py-[13px] ${loading ? "opacity-70" : ""}`}
                  onPress={onSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="font-semibold text-white">Gửi yêu cầu</Text>
                  )}
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                    Quay lại đăng nhập
                  </Text>
                </Pressable>
              </View>
            </View>
          </Entrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
