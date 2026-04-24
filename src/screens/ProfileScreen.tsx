import { Pressable, Text, View } from "react-native";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { useAppDispatch } from "../store/hooks";
import { clearSession } from "../store/slices/authSlice";

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <View className="flex-1 justify-center">
        <Entrance>
          <View className="gap-2 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-[18px]">
            <Text className="text-[26px] font-bold text-[#252020]">Tài khoản</Text>
            <Text className="text-[#8a6f61]">Vai trò hiện tại: User (demo)</Text>
            <Text className="text-[#8a6f61]">Trạng thái đồng bộ với frontend web.</Text>
            <Pressable
              className="mt-2 items-center rounded-xl bg-rose-500 py-2.5"
              onPress={() => dispatch(clearSession())}
            >
              <Text className="font-semibold text-white">Đăng xuất</Text>
            </Pressable>
          </View>
        </Entrance>
      </View>
    </ScreenContainer>
  );
};
