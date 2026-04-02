import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Entrance fill>
            <View style={authSharedStyles.formCard}>
              <ImageBackground
                source={require("../../assets/auth/login-hero.png")}
                style={styles.heroImage}
                imageStyle={styles.heroImageRounded}
              >
                <View style={authSharedStyles.heroOverlay}>
                  <Text style={authSharedStyles.heroTitle}>Quên mật khẩu?</Text>
                  <Text style={authSharedStyles.heroSubtitle}>
                    Chúng tôi sẽ giúp bạn khôi phục mật khẩu
                  </Text>
                </View>
              </ImageBackground>
              <View style={authSharedStyles.formBody}>
                <Text style={authSharedStyles.pawIcon}>🐾</Text>
                <Text style={authSharedStyles.title}>Khôi phục mật khẩu</Text>
                <Text style={authSharedStyles.description}>
                  Nhập email để nhận hướng dẫn đặt lại mật khẩu
                </Text>
                <TextInput
                  style={authSharedStyles.input}
                  placeholder="Email"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Pressable
                  style={[authSharedStyles.button, loading ? styles.buttonDisabled : null]}
                  onPress={onSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={authSharedStyles.buttonText}>Gửi yêu cầu</Text>
                  )}
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={authSharedStyles.helperText}>Quay lại đăng nhập</Text>
                </Pressable>
              </View>
            </View>
          </Entrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1 },
  heroImage: { height: 250, justifyContent: "flex-end" },
  heroImageRounded: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonDisabled: { opacity: 0.7 },
});
