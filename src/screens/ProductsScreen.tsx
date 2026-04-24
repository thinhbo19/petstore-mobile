import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";

export const ProductsScreen = () => {
  const featuredProducts = [
    { name: "Poodle Tiny", subtitle: "2 - 3 tháng tuổi", price: "12.900.000đ", icon: "dog" as const },
    {
      name: "Mèo Anh Lông Ngắn",
      subtitle: "Đã tiêm phòng cơ bản",
      price: "8.600.000đ",
      icon: "cat" as const,
    },
    {
      name: "Combo phụ kiện cơ bản",
      subtitle: "Bát ăn, dây dắt, đệm nằm",
      price: "690.000đ",
      icon: "package-variant-closed" as const,
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" contentContainerClassName="gap-3.5 pb-6 pt-3">
        <Entrance>
          <View className="rounded-[20px] bg-slate-900 p-[18px]">
            <Text className="self-start rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-200">
              Danh mục nổi bật
            </Text>
            <Text className="mt-2 text-[26px] font-extrabold text-white">Sản phẩm</Text>
            <Text className="mt-1 text-sm leading-5 text-slate-200">
              Khám phá thú cưng, phụ kiện và combo chăm sóc đang được yêu thích.
            </Text>
          </View>
        </Entrance>

        <Entrance delay={70}>
          <View className="gap-2 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            {featuredProducts.map((item) => (
              <Pressable
                key={item.name}
                className="flex-row items-center gap-3 rounded-xl bg-white px-3 py-3"
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-orange-100">
                  <MaterialCommunityIcons name={item.icon} size={22} color="#ea580c" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-[#252020]">{item.name}</Text>
                  <Text className="text-xs text-[#8a6f61]">{item.subtitle}</Text>
                </View>
                <Text className="text-sm font-bold text-orange-700">{item.price}</Text>
              </Pressable>
            ))}
          </View>
        </Entrance>

        <Entrance delay={120}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Gợi ý cho bạn</Text>
            <Text className="mt-1 text-sm leading-5 text-[#8a6f61]">
              Hệ thống sẽ hiển thị danh sách phù hợp theo giống loài, độ tuổi và ngân sách bạn
              quan tâm.
            </Text>
            <Pressable className="mt-3 flex-row items-center justify-center gap-2 rounded-xl bg-orange-500 py-3">
              <MaterialCommunityIcons name="filter-variant" size={18} color="#fff" />
              <Text className="font-semibold text-white">Mở bộ lọc sản phẩm</Text>
            </Pressable>
          </View>
        </Entrance>
      </ScrollView>
    </ScreenContainer>
  );
};
