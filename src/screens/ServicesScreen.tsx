import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";

export const ServicesScreen = () => {
  const services = [
    {
      title: "Spa & Grooming",
      desc: "Tắm, cắt tỉa, vệ sinh tai móng theo liệu trình.",
      icon: "shower" as const,
    },
    {
      title: "Khám sức khỏe định kỳ",
      desc: "Theo dõi cân nặng, tiêm phòng và tư vấn dinh dưỡng.",
      icon: "stethoscope" as const,
    },
    {
      title: "Lưu trú thú cưng",
      desc: "Dịch vụ giữ thú cưng an toàn khi bạn đi công tác.",
      icon: "home-heart" as const,
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView className="flex-1" contentContainerClassName="gap-3.5 pb-6 pt-3">
        <Entrance>
          <View className="rounded-[20px] bg-slate-900 p-[18px]">
            <Text className="self-start rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-200">
              Dịch vụ chăm sóc
            </Text>
            <Text className="mt-2 text-[26px] font-extrabold text-white">Dịch vụ</Text>
            <Text className="mt-1 text-sm leading-5 text-slate-200">
              Từ chăm sóc cơ bản đến theo dõi sức khỏe toàn diện cho thú cưng.
            </Text>
          </View>
        </Entrance>

        <Entrance delay={70}>
          <View className="gap-2 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            {services.map((service) => (
              <Pressable
                key={service.title}
                className="rounded-xl border border-orange-100 bg-white px-3 py-3"
              >
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons name={service.icon} size={20} color="#ea580c" />
                  <Text className="font-semibold text-[#252020]">{service.title}</Text>
                </View>
                <Text className="mt-1 text-sm leading-5 text-[#8a6f61]">{service.desc}</Text>
              </Pressable>
            ))}
          </View>
        </Entrance>

        <Entrance delay={120}>
          <View className="rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Đặt lịch nhanh</Text>
            <Text className="mt-1 text-sm leading-5 text-[#8a6f61]">
              Chọn khung giờ phù hợp, nhân viên sẽ xác nhận lịch trong thời gian sớm nhất.
            </Text>
            <Pressable className="mt-3 flex-row items-center justify-center gap-2 rounded-xl bg-orange-500 py-3">
              <MaterialCommunityIcons name="calendar-clock-outline" size={18} color="#fff" />
              <Text className="font-semibold text-white">Đặt lịch dịch vụ</Text>
            </Pressable>
          </View>
        </Entrance>
      </ScrollView>
    </ScreenContainer>
  );
};
