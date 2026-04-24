import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

type Props = NativeStackScreenProps<RootStackParamList, "VerifyOtp">;

export const VerifyOtpScreen = ({ route, navigation }: Props) => {
  const email = route.params?.email || "";
  const purpose = route.params?.purpose || "activation";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const onVerify = async () => {
    if (!email || otp.length !== 6) {
      Alert.alert("OTP không hợp lệ", "Vui lòng nhập OTP gồm 6 ký tự.");
      return;
    }
    try {
      setLoading(true);
      if (purpose === "forgot") {
        await AuthService.verifyForgotOtp(email, otp);
        Alert.alert("OTP hợp lệ", "Vui lòng đặt lại mật khẩu.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("ResetPassword", { email, otp }),
          },
        ]);
      } else {
        await AuthService.verifyOTP(email, otp);
        Alert.alert("Xác thực thành công", "Bạn có thể đăng nhập ngay bây giờ.", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      }
    } catch (error) {
      Alert.alert("Xác thực thất bại", getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    try {
      setResendLoading(true);
      if (purpose === "forgot") {
        await AuthService.forgotPasswordOtp(email);
      } else {
        await AuthService.resendOTP(email);
      }
      Alert.alert("Đã gửi lại OTP", "Mã OTP mới đã gửi đến email của bạn.");
    } catch (error) {
      Alert.alert("Gửi lại thất bại", getApiErrorMessage(error));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerClassName="flex-grow justify-center" keyboardShouldPersistTaps="handled">
          <Entrance fill>
            <View className="rounded-[20px] bg-white p-5">
              <MaterialCommunityIcons
                name="paw"
                size={30}
                color="#ea580c"
                style={{ marginBottom: 8, alignSelf: "center" }}
              />
              <Text className="text-center text-[26px] font-bold text-[#252020]">Xác thực tài khoản</Text>
              <Text className="mb-[14px] mt-1.5 text-center text-xs font-medium leading-5 text-[#8a6f61]">
                Nhập mã OTP đã gửi đến {"\n"}
                <Text className="font-bold text-orange-600">{email}</Text>
              </Text>
              <TextInput
                className="mb-2.5 rounded-xl border border-orange-500 bg-white px-3 py-[11px] text-center text-2xl tracking-[6px]"
                placeholder="Nhập OTP"
                placeholderTextColor="#94a3b8"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <Pressable
                className={`mt-2 items-center rounded-xl bg-orange-500 py-[13px] ${loading ? "opacity-70" : ""}`}
                onPress={onVerify}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="font-semibold text-white">Xác thực</Text>
                )}
              </Pressable>
              <Pressable onPress={onResend} disabled={resendLoading}>
                <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                  {resendLoading ? "Đang gửi lại..." : "Không nhận được mã? Gửi lại"}
                </Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                  Quay lại đăng nhập
                </Text>
              </Pressable>
            </View>
          </Entrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};
