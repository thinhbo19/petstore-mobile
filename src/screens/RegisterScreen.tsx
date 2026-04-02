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
import type { RootStackParamList } from "../navigation/types";
import { authSharedStyles } from "../styles/authShared";
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
      console.log("[Auth][Register] response:", data);
      const message =
        (data as { message?: string })?.message ||
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.";
      Alert.alert("Đăng ký thành công", message, [
        { text: "OK", onPress: () => navigation.navigate("VerifyOtp", { email }) },
      ]);
    } catch (error) {
      console.log("[Auth][Register] error:", error);
      Alert.alert("Đăng ký thất bại", getApiErrorMessage(error));
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
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Entrance fill>
            <View style={[authSharedStyles.formCard, styles.formCard]}>
            <ImageBackground
              source={require("../../assets/auth/register-hero.jpg")}
              style={styles.heroImage}
              imageStyle={styles.heroImageRounded}
            >
              <View style={authSharedStyles.heroOverlay}>
                <Text style={authSharedStyles.heroTitle}>Tham gia cùng chúng tôi</Text>
                <Text style={authSharedStyles.heroSubtitle}>
                  Khám phá thế giới thú cưng đáng yêu và những người bạn đồng hành
                </Text>
              </View>
            </ImageBackground>

            <View style={authSharedStyles.formBody}>
              <Text style={authSharedStyles.pawIcon}>🐾</Text>
              <Text style={authSharedStyles.title}>Đăng ký tài khoản</Text>
              <Text style={authSharedStyles.description}>
                Tham gia cộng đồng yêu thú cưng của chúng tôi
              </Text>

              <TextInput
                style={authSharedStyles.input}
                placeholder="Họ và tên"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                style={authSharedStyles.input}
                placeholder="Email"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={authSharedStyles.inputWrapper}>
                <TextInput
                  style={authSharedStyles.inputWithToggle}
                  placeholder="Mật khẩu"
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
                onPress={validateAndSubmit}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={authSharedStyles.buttonText}>Đăng ký</Text>
                )}
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={authSharedStyles.helperText}>
                  Đã có tài khoản?{" "}
                  <Text style={authSharedStyles.helperHighlight}>Đăng nhập</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: 0,
  },
  formCard: {},
  heroImage: {
    height: 230,
    justifyContent: "flex-end",
  },
  heroImageRounded: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
