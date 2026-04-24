import { ScrollView, Text, View } from "react-native";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerClassName="pt-3 pb-6 gap-3.5">
        <Entrance>
          <View className="rounded-[18px] bg-slate-900 p-[18px]">
            <Text className="self-start overflow-hidden rounded-full bg-[rgba(249,115,22,0.22)] px-2.5 py-[5px] text-[11px] font-bold uppercase text-amber-300">
              Pet Shop hiện đại
            </Text>
            <Text className="mt-2.5 text-[26px] font-extrabold leading-[34px] text-white">
              Nơi thú cưng trở thành thành viên gia đình
            </Text>
            <Text className="mt-2 text-sm leading-[21px] text-slate-200">
              Khám phá bộ sưu tập thú cưng và phụ kiện cao cấp theo phong cách của
              frontend web.
            </Text>
          </View>
        </Entrance>

        <Entrance delay={90}>
          <View className="gap-2.5 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-[19px] font-bold text-[#252020]">Vì sao chọn chúng tôi</Text>
            <View className="rounded-xl border border-amber-300 bg-orange-50 p-3">
              <Text className="mb-1 font-bold text-orange-900">Thú cưng được chăm sóc kỹ</Text>
              <Text className="text-[13px] leading-[19px] text-orange-950">
                Tư vấn giống loài, sức khỏe và chế độ chăm sóc phù hợp cho từng gia
                đình.
              </Text>
            </View>
            <View className="rounded-xl border border-amber-300 bg-orange-50 p-3">
              <Text className="mb-1 font-bold text-orange-900">Phụ kiện chất lượng</Text>
              <Text className="text-[13px] leading-[19px] text-orange-950">
                Danh mục phụ kiện được chọn lọc, dễ dàng tìm kiếm và đặt hàng.
              </Text>
            </View>
          </View>
        </Entrance>
      </ScrollView>
    </ScreenContainer>
  );
};
