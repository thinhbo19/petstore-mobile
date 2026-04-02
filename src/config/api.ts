import { ENV } from "./env";

const domain = `${ENV.API_BASE_URL}/api`;

export const API_DOMAIN = {
  AUTH_DOMAIN: `${domain}/user`,
  PET_DOMAIN: `${domain}/pets`,
  PRODUCT_DOMAIN: `${domain}/product`,
  ORDER_DOMAIN: `${domain}/order`,
};

export const API_ENDPOINTS = {
  LOGIN: `${API_DOMAIN.AUTH_DOMAIN}/login`,
  REGISTER: `${API_DOMAIN.AUTH_DOMAIN}/register`,
  VERIFY_OTP: `${API_DOMAIN.AUTH_DOMAIN}/verify-otp`,
  RESEND_OTP: `${API_DOMAIN.AUTH_DOMAIN}/resend-otp`,
  FORGOT_PASSWORD: `${API_DOMAIN.AUTH_DOMAIN}/forgotpassword`,
  FORGOT_PASSWORD_OTP: `${API_DOMAIN.AUTH_DOMAIN}/forgotpassword-otp`,
  VERIFY_FORGOT_OTP: `${API_DOMAIN.AUTH_DOMAIN}/verify-forgot-otp`,
  RESET_PASSWORD_OTP: `${API_DOMAIN.AUTH_DOMAIN}/resetpassword-otp`,
  RESET_PASSWORD: `${API_DOMAIN.AUTH_DOMAIN}/resetpassword`,
  VERIFY_RESET_TOKEN: `${API_DOMAIN.AUTH_DOMAIN}/verify-reset-token`,
  REFRESH_TOKEN: `${API_DOMAIN.AUTH_DOMAIN}/refreshtoken`,
  GET_CURRENT_USER: `${API_DOMAIN.AUTH_DOMAIN}/current`,
  LOGOUT: `${API_DOMAIN.AUTH_DOMAIN}/logout`,
  ALL_PETS_BY_SPECIES: `${API_DOMAIN.PET_DOMAIN}/getPetBySpecies`,
};
