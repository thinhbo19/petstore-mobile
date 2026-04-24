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
import { ScreenContainer } from "../components/ScreenContainer";
import { Entrance } from "../components/Entrance";
import type { RootStackParamList } from "../navigation/types";
import { AuthService } from "../services/Auth/AuthService";
import { getApiErrorMessage } from "../lib/apiError";

type Props = NativeStackScreenProps<RootStackParamList, "ResetPassword">;

export const ResetPasswordScreen = ({ route, navigation }: Props) => {
  const emailFromRoute = route.params?.email || "";
  const otpFromRoute = route.params?.otp || "";
  const tokenFromRoute = route.params?.token || "";
  const isForgotOtpFlow = Boolean(emailFromRoute && otpFromRoute);
  const [token, setToken] = useState(tokenFromRoute);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập mật khẩu mới.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Mật khẩu yếu", "Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Không khớp", "Mật khẩu xác nhận không khớp.");
      return;
    }
    try {
      setLoading(true);
      if (isForgotOtpFlow) {
        await AuthService.resetPasswordByOtp(emailFromRoute, otpFromRoute, password);
      } else {
        if (!token) {
          Alert.alert("Thiếu token", "Vui lòng nhập token hợp lệ.");
          return;
        }
        await AuthService.verifyResetToken(token);
        await AuthService.resetPassword(token, password);
      }
      Alert.alert("Thành công", "Đặt lại mật khẩu thành công.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
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
        <ScrollView contentContainerClassName="flex-grow justify-center" keyboardShouldPersistTaps="handled">
          <Entrance>
            <View className="rounded-[20px] bg-white p-5">
              <MaterialCommunityIcons
                name="paw"
                size={30}
                color="#ea580c"
                style={{ marginBottom: 8, alignSelf: "center" }}
              />
              <Text className="text-center text-[26px] font-bold text-[#252020]">Đặt lại mật khẩu</Text>
              <Text className="mb-[14px] mt-1.5 text-center text-xs font-medium leading-5 text-[#8a6f61]">
                Nhập token từ email và mật khẩu mới của bạn
              </Text>
              {!isForgotOtpFlow ? (
                <TextInput
                  className="mb-2.5 rounded-xl border border-orange-500 bg-white px-3 py-[11px]"
                  placeholder="Token"
                  placeholderTextColor="#94a3b8"
                  value={token}
                  onChangeText={setToken}
                  autoCapitalize="none"
                />
              ) : (
                <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                  Email: <Text className="font-bold text-orange-600">{emailFromRoute}</Text>{"\n"}
                  OTP: <Text className="font-bold text-orange-600">{otpFromRoute}</Text>
                </Text>
              )}
              <View className="relative mb-2.5">
                <TextInput
                  className="rounded-xl border border-orange-500 bg-white px-3 py-[11px] pr-12"
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  className="absolute right-2.5 top-2.5 p-1"
                  onPress={() => setShowPassword((v) => !v)}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color="#ea580c"
                  />
                </Pressable>
              </View>
              <View className="relative mb-2.5">
                <TextInput
                  className="rounded-xl border border-orange-500 bg-white px-3 py-[11px] pr-12"
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#94a3b8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <Pressable
                  className="absolute right-2.5 top-2.5 p-1"
                  onPress={() => setShowConfirmPassword((v) => !v)}
                  accessibilityRole="button"
                  accessibilityLabel={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <MaterialCommunityIcons
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color="#ea580c"
                  />
                </Pressable>
              </View>
              <Pressable
                className={`mt-2 items-center rounded-xl bg-orange-500 py-[13px] ${loading ? "opacity-70" : ""}`}
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="font-semibold text-white">Đặt lại mật khẩu</Text>
                )}
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
