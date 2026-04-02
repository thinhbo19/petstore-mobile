import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScreenContainer } from "../components/ScreenContainer";
import { Entrance } from "../components/Entrance";
import { authSharedStyles } from "../styles/authShared";
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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Entrance>
            <View style={styles.card}>
              <Text style={authSharedStyles.pawIcon}>🐾</Text>
              <Text style={authSharedStyles.title}>Đặt lại mật khẩu</Text>
              <Text style={authSharedStyles.description}>
                Nhập token từ email và mật khẩu mới của bạn
              </Text>
              {!isForgotOtpFlow ? (
                <TextInput
                  style={authSharedStyles.input}
                  placeholder="Token"
                  placeholderTextColor="#94a3b8"
                  value={token}
                  onChangeText={setToken}
                  autoCapitalize="none"
                />
              ) : (
                <Text style={authSharedStyles.helperText}>
                  Email: <Text style={styles.emphasis}>{emailFromRoute}</Text>{"\n"}
                  OTP: <Text style={styles.emphasis}>{otpFromRoute}</Text>
                </Text>
              )}
              <View style={authSharedStyles.inputWrapper}>
                <TextInput
                  style={authSharedStyles.inputWithToggle}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  style={authSharedStyles.toggleButton}
                  onPress={() => setShowPassword((v) => !v)}
                >
                  <Text style={authSharedStyles.toggleText}>
                    {showPassword ? "Ẩn" : "Hiện"}
                  </Text>
                </Pressable>
              </View>
              <View style={authSharedStyles.inputWrapper}>
                <TextInput
                  style={authSharedStyles.inputWithToggle}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#94a3b8"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <Pressable
                  style={authSharedStyles.toggleButton}
                  onPress={() => setShowConfirmPassword((v) => !v)}
                >
                  <Text style={authSharedStyles.toggleText}>
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={[authSharedStyles.button, loading ? styles.buttonDisabled : null]}
                onPress={onSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={authSharedStyles.buttonText}>Đặt lại mật khẩu</Text>
                )}
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={authSharedStyles.helperText}>Quay lại đăng nhập</Text>
              </Pressable>
            </View>
          </Entrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center" },
  card: {
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 20,
  },
  buttonDisabled: { opacity: 0.7 },
  emphasis: {
    color: "#ea580c",
    fontWeight: "700",
  },
});
