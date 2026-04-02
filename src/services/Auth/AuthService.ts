import { API_ENDPOINTS } from "../../config/api";
import { apiClient } from "../http/apiClient";

export type LoginResponse = {
  success: boolean;
  accessToken: string;
  csrfToken?: string;
  userData?: Record<string, unknown>;
  message?: string;
  url?: string;
};

export const AuthService = {
  login: async (email: string, password: string) => {
    console.log("[AuthService][Login] request:", { email });
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });
    console.log("[AuthService][Login] status:", response.status);
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, {
      username,
      email,
      password,
      // Backend register currently requires this field.
      mobile: "0000000000",
    });
    return response.data;
  },
  verifyOTP: async (email: string, otp: string) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, {
      email,
      otp,
    });
    return response.data;
  },
  resendOTP: async (email: string) => {
    const response = await apiClient.post(API_ENDPOINTS.RESEND_OTP, { email });
    return response.data;
  },
  forgotPassword: async (email: string) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },
  forgotPasswordOtp: async (email: string) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD_OTP, { email });
    return response.data;
  },
  verifyForgotOtp: async (email: string, otp: string) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_FORGOT_OTP, {
      email,
      otp,
    });
    return response.data;
  },
  resetPasswordByOtp: async (email: string, otp: string, password: string) => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD_OTP, {
      email,
      otp,
      password,
    });
    return response.data;
  },
  verifyResetToken: async (token: string) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_RESET_TOKEN, { token });
    return response.data;
  },
  resetPassword: async (token: string, password: string) => {
    const response = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
      token,
      password,
    });
    return response.data;
  },
  refreshSession: async () => {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.REFRESH_TOKEN, {});
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.get(API_ENDPOINTS.LOGOUT);
    return response.data;
  },
};
