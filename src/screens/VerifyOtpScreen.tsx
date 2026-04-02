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
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { authSharedStyles } from "../styles/authShared";
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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Entrance fill>
            <View style={styles.card}>
              <Text style={authSharedStyles.pawIcon}>🐾</Text>
              <Text style={authSharedStyles.title}>Xác thực tài khoản</Text>
              <Text style={authSharedStyles.description}>
                Nhập mã OTP đã gửi đến {"\n"}
                <Text style={styles.email}>{email}</Text>
              </Text>
              <TextInput
                style={styles.otpInput}
                placeholder="Nhập OTP"
                placeholderTextColor="#94a3b8"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <Pressable
                style={[authSharedStyles.button, loading ? styles.buttonDisabled : null]}
                onPress={onVerify}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={authSharedStyles.buttonText}>Xác thực</Text>
                )}
              </Pressable>
              <Pressable onPress={onResend} disabled={resendLoading}>
                <Text style={authSharedStyles.helperText}>
                  {resendLoading ? "Đang gửi lại..." : "Không nhận được mã? Gửi lại"}
                </Text>
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
  otpInput: {
    ...authSharedStyles.input,
    textAlign: "center",
    letterSpacing: 6,
    fontSize: 24,
  },
  email: {
    color: "#ea580c",
    fontWeight: "700",
  },
  buttonDisabled: { opacity: 0.7 },
});
