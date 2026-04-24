import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { HomeService } from "../services/Home/HomeService";
import { getApiErrorMessage } from "../lib/apiError";

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [homeData, setHomeData] = useState<Awaited<ReturnType<typeof HomeService.getMobileHome>>["data"] | null>(null);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      setErrorText("");
      const response = await HomeService.getMobileHome();
      setHomeData(response.data);
    } catch (error) {
      setErrorText(getApiErrorMessage(error, "Không tải được dữ liệu trang chủ."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const quickCategories = useMemo(() => {
    const petSpecies = homeData?.quickCategories?.petSpecies?.slice(0, 2) || [];
    const productCategories = homeData?.quickCategories?.productCategories?.slice(0, 2) || [];
    const mappedPet = petSpecies.map((item) => ({ title: item.name, icon: "dog" as const }));
    const mappedProduct = productCategories.map((item) => ({
      title: item.name,
      icon: "shopping-outline" as const,
    }));
    return [...mappedPet, ...mappedProduct];
  }, [homeData]);

  const featuredItems = useMemo(
    () => (homeData?.featuredProducts || []).slice(0, 4),
    [homeData],
  );

  const serviceHighlights = useMemo(
    () => (homeData?.serviceHighlights || []).slice(0, 3),
    [homeData],
  );
  const featuredPets = useMemo(() => (homeData?.featuredPets || []).slice(0, 4), [homeData]);

  const promotions = useMemo(() => (homeData?.promotions || []).slice(0, 2), [homeData]);
  const hero = homeData?.heroBanners?.[0];
  const heroVideoSource = require("../../assets/videos/pet-hero.mp4");

  const formatVnd = (value?: number) =>
    typeof value === "number" ? `${value.toLocaleString("vi-VN")}đ` : "Liên hệ";

  return (
    <ScreenContainer>
      <ScrollView contentContainerClassName="pb-6 gap-3.5">
        <Entrance>
          <View className="rounded-[20px] bg-slate-900 p-[18px]">
            <View className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <Video
                source={heroVideoSource}
                style={{ width: "100%", height: 210 }}
                shouldPlay
                isLooping
                isMuted={isVideoMuted}
                resizeMode={ResizeMode.COVER}
                useNativeControls={false}
              />
              <View className="absolute bottom-2 right-2 flex-row gap-2">
                <Pressable
                  className="rounded bg-black/60 px-2 py-1"
                  onPress={() => setIsVideoMuted((prev) => !prev)}
                >
                  <MaterialCommunityIcons
                    name={isVideoMuted ? "volume-off" : "volume-high"}
                    size={15}
                    color="#fff"
                  />
                </Pressable>
              </View>
            </View>

            <View className="mt-4 flex-row gap-2">
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-orange-500 py-3">
                <MaterialCommunityIcons name="magnify" size={18} color="#fff" />
                <Text className="font-semibold text-white">Tìm thú cưng</Text>
              </Pressable>
              <Pressable className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-white/10 py-3">
                <MaterialCommunityIcons name="calendar-clock-outline" size={18} color="#fff" />
                <Text className="font-semibold text-white">Đặt lịch dịch vụ</Text>
              </Pressable>
            </View>
          </View>
        </Entrance>

        <Entrance delay={50}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Tìm nhanh</Text>
            <View className="mt-3 flex-row flex-wrap gap-2">
              {(quickCategories.length ? quickCategories : [
                { title: "Thú cưng", icon: "dog" as const },
                { title: "Phụ kiện", icon: "shopping-outline" as const },
                { title: "Dịch vụ", icon: "briefcase-outline" as const },
                { title: "Ưu đãi", icon: "ticket-percent-outline" as const },
              ]).map((item) => (
                <Pressable
                  key={item.title}
                  className="min-w-[47%] flex-1 flex-row items-center gap-2 rounded-xl bg-white px-3 py-3"
                >
                  <View className="h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                    <MaterialCommunityIcons name={item.icon} size={18} color="#ea580c" />
                  </View>
                  <Text className="font-medium text-[#252020]">{item.title}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Entrance>

        <Entrance delay={90}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#252020]">Sản phẩm nổi bật</Text>
              <Text className="text-sm font-semibold text-orange-600">Xem tất cả</Text>
            </View>
            <View className="mt-1 flex-row flex-wrap justify-between gap-y-3">
              {(featuredItems.length
                ? featuredItems
                : [
                    {
                      id: "fallback-1",
                      name: "Sản phẩm đang cập nhật",
                      shortTitle: "",
                      price: 0,
                      image: "",
                    },
                    {
                      id: "fallback-2",
                      name: "Sản phẩm mới sẽ hiển thị tại đây",
                      shortTitle: "",
                      price: 0,
                      image: "",
                    },
                  ]
              ).map((item) => (
                <Pressable key={item.id} className="w-[48.5%] overflow-hidden rounded-xl bg-white">
                  <View className="h-[118px] w-full items-center justify-center bg-orange-50">
                    {item.image ? (
                      <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />
                    ) : (
                      <MaterialCommunityIcons name="image-outline" size={26} color="#fdba74" />
                    )}
                    <Text className="absolute right-2 top-2 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                      {item.sold ? "Bán chạy" : "Mới"}
                    </Text>
                  </View>
                  <View className="p-2.5">
                    <Text className="font-semibold text-[#252020]" numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text className="mt-1 text-[11px] text-[#8a6f61]" numberOfLines={1}>
                      {item.shortTitle || item.category || "Sản phẩm dành cho thú cưng"}
                    </Text>
                    <Text className="mt-1.5 text-sm font-bold text-orange-700">{formatVnd(item.price)}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </Entrance>

        <Entrance delay={120}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-[#252020]">Thú cưng nổi bật</Text>
              <Text className="text-sm font-semibold text-orange-600">Xem tất cả</Text>
            </View>
            <View className="mt-1 flex-row flex-wrap justify-between gap-y-3">
              {(featuredPets.length
                ? featuredPets
                : [
                    {
                      id: "fallback-pet-1",
                      name: "Thú cưng đang cập nhật",
                      species: "Pet",
                      price: 0,
                      image: "",
                      sold: false,
                    },
                    {
                      id: "fallback-pet-2",
                      name: "Thêm thú cưng mới",
                      species: "Pet",
                      price: 0,
                      image: "",
                      sold: false,
                    },
                  ]
              ).map((pet) => (
                <Pressable key={pet.id} className="w-[48.5%] overflow-hidden rounded-xl bg-white">
                  <View className="h-[118px] w-full items-center justify-center bg-orange-50">
                    {pet.image ? (
                      <Image source={{ uri: pet.image }} className="h-full w-full" resizeMode="cover" />
                    ) : (
                      <MaterialCommunityIcons name="paw-outline" size={26} color="#fdba74" />
                    )}
                    <Text className="absolute right-2 top-2 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                      {pet.sold ? "Đã bán" : "Còn"}
                    </Text>
                  </View>
                  <View className="p-2.5">
                    <Text className="font-semibold text-[#252020]" numberOfLines={2}>
                      {pet.name}
                    </Text>
                    <Text className="mt-1 text-[11px] text-[#8a6f61]" numberOfLines={1}>
                      {pet.species || pet.breed || "Thú cưng"}
                    </Text>
                    <Text className="mt-1.5 text-sm font-bold text-orange-700">{formatVnd(pet.price)}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </Entrance>

        <Entrance delay={150}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Mẹo chăm thú cưng</Text>
            <View className="mt-2 gap-2">
              {[
                {
                  id: "tip-1",
                  icon: "food-apple-outline",
                  name: "Xây lịch ăn khoa học",
                  description: "Chia khẩu phần theo cân nặng và độ tuổi để bé luôn khỏe mạnh.",
                },
                {
                  id: "tip-2",
                  icon: "needle",
                  name: "Đừng quên lịch tiêm phòng",
                  description: "Nhắc lịch định kỳ để phòng bệnh và theo dõi sức khỏe tốt hơn.",
                },
              ].map((item) => (
                <Pressable key={item.id} className="rounded-xl bg-white p-3">
                  <View className="flex-row items-center gap-2">
                    <MaterialCommunityIcons
                      name={item.icon as "food-apple-outline" | "needle"}
                      size={19}
                      color="#ea580c"
                    />
                    <Text className="font-semibold text-[#252020]">{item.name}</Text>
                  </View>
                  <Text className="mt-1 text-sm leading-5 text-[#8a6f61]">
                    {item.description}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Entrance>

        <Entrance delay={160}>
          <View className="gap-2.5 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-[19px] font-bold text-[#252020]">Ưu đãi hôm nay</Text>
            {(promotions.length
              ? promotions
              : [
                  {
                    id: "fallback-promo",
                    code: "WELCOME",
                    type: "Booking",
                    discount: 10,
                    minimumOrder: 0,
                  },
                ]
            ).map((promo) => (
              <View key={promo.id} className="rounded-xl border border-amber-300 bg-orange-50 p-3">
                <Text className="mb-1 font-bold text-orange-900">
                  Mã {promo.code} - giảm {promo.discount || 0}%
                </Text>
                <Text className="text-[13px] leading-[19px] text-orange-950">
                  Áp dụng cho dịch vụ {promo.type || "mua sắm"} với đơn từ{" "}
                  {formatVnd(promo.minimumOrder)}.
                </Text>
              </View>
            ))}
          </View>
        </Entrance>

        {loading ? (
          <View className="items-center py-2">
            <ActivityIndicator color="#ea580c" />
          </View>
        ) : null}
        {errorText ? (
          <Pressable
            onPress={loadHomeData}
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2"
          >
            <Text className="text-center text-sm text-rose-700">
              {errorText} Chạm để tải lại.
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
};
