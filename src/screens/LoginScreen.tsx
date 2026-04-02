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
import { colors } from "../constants/theme";
import type { RootStackParamList } from "../navigation/types";
import { authSharedStyles } from "../styles/authShared";
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
      console.log("[Auth][Login] response:", data);
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
      console.log("[Auth][Login] error:", error);
      Alert.alert("Đăng nhập thất bại", getApiErrorMessage(error));
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Entrance fill>
            <View style={[authSharedStyles.formCard, styles.formCard]}>
            <ImageBackground
              source={require("../../assets/auth/login-hero.png")}
              style={styles.heroImage}
              imageStyle={styles.heroImageRounded}
            >
              <View style={authSharedStyles.heroOverlay}>
                <Text style={authSharedStyles.heroTitle}>Chào mừng trở lại!</Text>
                <Text style={authSharedStyles.heroSubtitle}>
                  Đăng nhập để khám phá thế giới thú cưng tuyệt vời
                </Text>
              </View>
            </ImageBackground>

            <View style={authSharedStyles.formBody}>
              <Text style={authSharedStyles.pawIcon}>🐾</Text>
              <Text style={authSharedStyles.title}>Đăng nhập</Text>
              <Text style={authSharedStyles.description}>
                Đăng nhập để trải nghiệm dịch vụ của chúng tôi
              </Text>

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

              <Pressable
                style={[authSharedStyles.button, loading ? styles.buttonDisabled : null]}
                onPress={onLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={authSharedStyles.buttonText}>Đăng nhập</Text>
                )}
              </Pressable>

            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </Pressable>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text style={authSharedStyles.helperText}>
                  Chưa có tài khoản?{"\n"}
                  <Text style={authSharedStyles.helperHighlight}>Đăng ký ngay</Text>
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
    justifyContent: "flex-start",
  },
  formCard: {},
  scroll: {
    flexGrow: 1,
  },
  heroImage: {
    height: 260,
    justifyContent: "flex-end",
  },
  heroImageRounded: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  forgotText: {
    marginTop: 12,
    textAlign: "center",
    color: colors.brand500,
    fontWeight: "500",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
