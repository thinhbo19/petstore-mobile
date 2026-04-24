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
import { useAppDispatch } from "../store/hooks";
import { setSession } from "../store/slices/authSlice";
import { AuthService } from "../services/Auth/AuthService";
import { getApiErrorMessage } from "../lib/apiError";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }
    try {
      setLoading(true);
      const data = await AuthService.login(email, password);
      // console.log("[Auth][Login] response:", data);
      if (!data?.accessToken) {
        Alert.alert("Đăng nhập thất bại", data?.message || "Không nhận được access token.");
        return;
      }
      dispatch(
        setSession({
          accessToken: data.accessToken,
          user: data.userData || null,
        }),
      );
    } catch (error) {
      // console.log("[Auth][Login] error:", error);
      Alert.alert("Đăng nhập thất bại", getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        className="flex-1 justify-start"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Entrance fill>
            <View className="flex-1 overflow-hidden bg-[#fff8f2]">
            <ImageBackground
              source={require("../../assets/auth/login-hero.png")}
              className="h-[260px] justify-end"
              imageClassName="rounded-t-[20px]"
            >
              <View className="h-full items-center justify-end bg-[rgba(117,117,117,0.45)] px-4 py-[14px]">
                <Text className="text-center text-[32px] font-extrabold text-white">Chào mừng trở lại!</Text>
                <Text className="mt-1.5 text-center text-base leading-5 text-orange-100">
                  Đăng nhập để khám phá thế giới thú cưng tuyệt vời
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
              <Text className="text-center text-[26px] font-bold text-[#252020]">Đăng nhập</Text>
              <Text className="mb-[14px] mt-1.5 text-center text-xs font-medium leading-5 text-[#8a6f61]">
                Đăng nhập để trải nghiệm dịch vụ của chúng tôi
              </Text>

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

              <Pressable
                className={`mt-2 items-center rounded-xl bg-orange-500 py-[13px] ${loading ? "opacity-70" : ""}`}
                onPress={onLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="font-semibold text-white">Đăng nhập</Text>
                )}
              </Pressable>

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text className="mt-3 text-center font-medium text-orange-500">Quên mật khẩu?</Text>
            </Pressable>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text className="mt-2.5 text-center font-medium leading-[21px] text-[#8a6f61]">
                  Chưa có tài khoản?{"\n"}
                  <Text className="font-bold text-orange-600">Đăng ký ngay</Text>
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
