import { API_ENDPOINTS } from "../../config/api";
import { apiClient } from "../http/apiClient";

export type MobileHomeResponse = {
  success: boolean;
  data: {
    heroBanners: Array<{ id: string; title: string; subtitle?: string; image?: string }>;
    quickCategories: {
      productCategories: Array<{ id: string; name: string }>;
      petSpecies: Array<{ id: string; name: string }>;
    };
    featuredProducts: Array<{
      id: string;
      name: string;
      shortTitle?: string;
      price?: number;
      image?: string;
      sold?: boolean;
      category?: string;
    }>;
    featuredPets: Array<{
      id: string;
      name: string;
      species?: string;
      breed?: string;
      price?: number;
      image?: string;
      sold?: boolean;
    }>;
    serviceHighlights: Array<{
      id: string;
      name: string;
      description?: string;
      price?: number;
      type?: string;
    }>;
    promotions: Array<{
      id: string;
      code: string;
      type?: string;
      discount?: number;
      minimumOrder?: number;
      expiry?: string;
    }>;
  };
};

export const HomeService = {
  getMobileHome: async () => {
    const response = await apiClient.get<MobileHomeResponse>(API_ENDPOINTS.MOBILE_HOME);
    return response.data;
  },
};
