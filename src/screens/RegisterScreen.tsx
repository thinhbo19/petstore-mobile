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

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export const RegisterScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAndSubmit = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ các trường bắt buộc.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Email không hợp lệ", "Vui lòng nhập đúng định dạng email.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Mật khẩu yếu", "Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu không khớp", "Vui lòng nhập lại mật khẩu xác nhận.");
      return;
    }

    try {
      setLoading(true);
      const data = await AuthService.register(fullName, email, password);
      // console.log("[Auth][Register] response:", data);
      const message =
        (data as { message?: string })?.message ||
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.";
      Alert.alert("Đăng ký thành công", message, [
        { text: "OK", onPress: () => navigation.navigate("VerifyOtp", { email }) },
      ]);
    } catch (error) {
      // console.log("[Auth][Register] error:", error);
      Alert.alert("Đăng ký thất bại", getApiErrorMessage(error));
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
        <ScrollView
          contentContainerClassName="flex-grow"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Entrance fill>
            <View className="flex-1 overflow-hidden bg-[#fff8f2]">
            <ImageBackground
              source={require("../../assets/auth/register-hero.jpg")}
              className="h-[230px] justify-end"
              imageClassName="rounded-t-[20px]"
            >
              <View className="h-full items-center justify-end bg-[rgba(117,117,117,0.45)] px-4 py-[14px]">
                <Text className="text-center text-[32px] font-extrabold text-white">Tham gia cùng chúng tôi</Text>
                <Text className="mt-1.5 text-center text-base leading-5 text-orange-100">
                  Khám phá thế giới thú cưng đáng yêu và những người bạn đồng hành
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
              <Text className="text-center text-[26px] font-bold text-[#252020]">Đăng ký tài khoản</Text>
              <Text className="mb-[14px] mt-1.5 text-center text-xs font-medium leading-5 text-[#8a6f61]">
                Tham gia cộng đồng yêu thú cưng của chúng tôi
              </Text>

              <TextInput
                className="mb-2.5 rounded-xl border border-orange-500 bg-white px-3 py-[11px]"
                placeholder="Họ và tên"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                className="mb-2.5 rounded-xl border border-orange-500 bg-white px-3 py-[11px]"
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View className="relative mb-2.5">
                <TextInput
                  className="rounded-xl border border-orange-500 bg-white px-3 py-[11px] pr-12"
                  placeholder="Mật khẩu"
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
                onPress={validateAndSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="font-semibold text-white">Đăng ký</Text>
                )}
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                  Đã có tài khoản?{" "}
                  <Text className="font-bold text-orange-600">Đăng nhập</Text>
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
