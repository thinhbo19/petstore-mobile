import { useEffect, useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearSession, setSession } from "../store/slices/authSlice";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
};

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const avatarColors = ["#f97316", "#0ea5e9", "#8b5cf6", "#10b981", "#ef4444"] as const;
  const avatarSamples = [
    "https://i.pravatar.cc/200?img=5",
    "https://i.pravatar.cc/200?img=32",
    "https://i.pravatar.cc/200?img=12",
    "https://i.pravatar.cc/200?img=47",
  ] as const;

  const getUserField = (keys: string[]) => {
    if (!user) return "";
    for (const key of keys) {
      const value = user[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return "";
  };

  const initialForm = useMemo<ProfileForm>(
    () => ({
      fullName: getUserField(["fullName", "fullname", "name", "username"]),
      email: getUserField(["email"]),
      phone: getUserField(["phone", "mobile", "phoneNumber"]),
      gender: getUserField(["gender", "sex"]),
      birthDate: getUserField(["birthDate", "dob", "dateOfBirth"]),
    }),
    [user],
  );

  const [form, setForm] = useState<ProfileForm>(initialForm);
  const [avatarColor, setAvatarColor] = useState(getUserField(["avatarColor"]) || "#f97316");
  const [avatarUri, setAvatarUri] = useState(getUserField(["avatarUri", "avatarUrl"]));
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  useEffect(() => {
    setForm(initialForm);
    setAvatarColor(getUserField(["avatarColor"]) || "#f97316");
    setAvatarUri(getUserField(["avatarUri", "avatarUrl"]));
  }, [initialForm]);

  const hasChanges = useMemo(
    () =>
      JSON.stringify(form) !== JSON.stringify(initialForm) ||
      avatarColor !== (getUserField(["avatarColor"]) || "#f97316") ||
      avatarUri !== getUserField(["avatarUri", "avatarUrl"]),
    [avatarColor, avatarUri, form, initialForm],
  );

  const fullName = form.fullName || "Khách hàng";
  const email = form.email || "Chưa cập nhật email";
  const role = getUserField(["role"]) || "Thành viên";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  const onComingSoon = (feature: string) => {
    Alert.alert("Tính năng sắp ra mắt", `${feature} sẽ được cập nhật ở phiên bản tiếp theo.`);
  };

  const onChangeAvatar = () => {
    setShowAvatarPicker((prev) => !prev);
  };

  const onPickFromLibrary = async () => {
    try {
      setIsPickingImage(true);
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Cần quyền truy cập", "Vui lòng cho phép ứng dụng truy cập thư viện ảnh.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) return;

      const selectedUri = result.assets[0]?.uri || "";
      if (!selectedUri) return;
      setAvatarUri(selectedUri);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể mở thư viện ảnh. Vui lòng thử lại.");
    } finally {
      setIsPickingImage(false);
    }
  };

  const onCancelChanges = () => {
    setForm(initialForm);
    setAvatarColor(getUserField(["avatarColor"]) || "#f97316");
    setAvatarUri(getUserField(["avatarUri", "avatarUrl"]));
    setShowAvatarPicker(false);
  };

  const onConfirmChanges = () => {
    if (!form.fullName.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập họ và tên.");
      return;
    }
    if (!form.email.trim()) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập email.");
      return;
    }

    dispatch(
      setSession({
        accessToken,
        user: {
          ...(user || {}),
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          gender: form.gender.trim(),
          birthDate: form.birthDate.trim(),
          avatarColor,
          avatarUri: avatarUri.trim(),
        },
      }),
    );
    Alert.alert("Thành công", "Thông tin tài khoản đã được cập nhật.");
  };

  return (
    <ScreenContainer>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3.5 pb-6 pt-3"
        showsVerticalScrollIndicator={false}
      >
        <Entrance>
          <View className="rounded-[20px] bg-slate-900 p-[18px]">
            <View className="flex-row items-center gap-3">
              <Pressable onPress={onChangeAvatar} className="relative">
                <View
                  className="h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: avatarColor }}
                >
                  {avatarUri ? (
                    <Image
                      source={{ uri: avatarUri }}
                      className="h-14 w-14 rounded-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-xl font-bold text-white">{initials || "KH"}</Text>
                  )}
                </View>
                <View className="absolute -bottom-1 -right-1 h-6 w-6 items-center justify-center rounded-full bg-white">
                  <MaterialCommunityIcons name="camera-outline" size={14} color="#ea580c" />
                </View>
              </Pressable>
              <View className="flex-1">
                <Text className="text-xl font-bold text-white">{fullName}</Text>
                <Text className="mt-1 text-sm text-slate-200">{email}</Text>
              </View>
            </View>
            <View className="mt-4 flex-row gap-2">
              <View className="rounded-full bg-orange-500/20 px-3 py-1">
                <Text className="text-xs font-semibold text-orange-200">{role}</Text>
              </View>
              <View className="rounded-full bg-emerald-500/20 px-3 py-1">
                <Text className="text-xs font-semibold text-emerald-200">Đã xác thực</Text>
              </View>
            </View>
          </View>
        </Entrance>

        <Entrance delay={60}>
          <View className="gap-2 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Thông tin cá nhân</Text>
            <Pressable
              className="mb-1 flex-row items-center justify-between rounded-xl bg-white px-3 py-3"
              onPress={onChangeAvatar}
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="image-edit-outline" size={20} color="#ea580c" />
                <Text className="font-medium text-[#252020]">Thay đổi ảnh đại diện</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
            </Pressable>
            {showAvatarPicker ? (
              <View className="mb-1 gap-3 rounded-xl bg-white p-3">
                <View>
                  <Text className="mb-2 text-xs font-semibold text-[#8a6f61]">Chọn ảnh mẫu</Text>
                  <View className="flex-row flex-wrap gap-2">
                    <Pressable
                      className="h-12 rounded-full border border-orange-300 px-3 items-center justify-center"
                      onPress={onPickFromLibrary}
                      disabled={isPickingImage}
                    >
                      <Text className="text-xs font-medium text-orange-700">
                        {isPickingImage ? "Dang mo..." : "Thu vien"}
                      </Text>
                    </Pressable>
                    {avatarSamples.map((uri) => {
                      const isSelected = avatarUri === uri;
                      return (
                        <Pressable
                          key={uri}
                          className={`rounded-full border-2 ${isSelected ? "border-orange-500" : "border-transparent"}`}
                          onPress={() => setAvatarUri(uri)}
                        >
                          <Image
                            source={{ uri }}
                            className="h-12 w-12 rounded-full"
                            resizeMode="cover"
                          />
                        </Pressable>
                      );
                    })}
                  </View>
                </View>

                <View>
                  <Text className="mb-2 text-xs font-semibold text-[#8a6f61]">Hoặc chọn màu nền</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {avatarColors.map((color) => {
                      const isSelected = !avatarUri && avatarColor === color;
                      return (
                        <Pressable
                          key={color}
                          onPress={() => {
                            setAvatarUri("");
                            setAvatarColor(color);
                          }}
                          className={`h-9 w-9 items-center justify-center rounded-full border-2 ${isSelected ? "border-orange-500" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                        >
                          {isSelected ? (
                            <MaterialCommunityIcons name="check" size={16} color="#fff" />
                          ) : null}
                        </Pressable>
                      );
                    })}
                    <Pressable
                      className="h-9 rounded-full border border-orange-300 px-3 items-center justify-center"
                      onPress={() => setAvatarUri("")}
                    >
                      <Text className="text-xs font-medium text-orange-700">Mặc định</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : null}

            <View className="gap-2 rounded-xl bg-white p-3">
              <View>
                <Text className="mb-1 text-xs text-[#8a6f61]">Họ và tên</Text>
                <TextInput
                  value={form.fullName}
                  onChangeText={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor="#94a3b8"
                  className="rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-[#252020]"
                />
              </View>

              <View>
                <Text className="mb-1 text-xs text-[#8a6f61]">Email</Text>
                <TextInput
                  value={form.email}
                  onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
                  placeholder="Nhập email"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-[#252020]"
                />
              </View>

              <View>
                <Text className="mb-1 text-xs text-[#8a6f61]">Số điện thoại</Text>
                <TextInput
                  value={form.phone}
                  onChangeText={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                  placeholder="Nhập số điện thoại"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  className="rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-[#252020]"
                />
              </View>

              <View className="flex-row gap-2">
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-[#8a6f61]">Giới tính</Text>
                  <TextInput
                    value={form.gender}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, gender: value }))}
                    placeholder="Nam/Nữ/Khác"
                    placeholderTextColor="#94a3b8"
                    className="rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-[#252020]"
                  />
                </View>
                <View className="flex-1">
                  <Text className="mb-1 text-xs text-[#8a6f61]">Ngày sinh</Text>
                  <TextInput
                    value={form.birthDate}
                    onChangeText={(value) => setForm((prev) => ({ ...prev, birthDate: value }))}
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#94a3b8"
                    className="rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-[#252020]"
                  />
                </View>
              </View>
            </View>

            {hasChanges ? (
              <View className="mt-1 flex-row gap-2">
                <Pressable
                  className="flex-1 items-center rounded-xl border border-orange-300 bg-white py-3"
                  onPress={onCancelChanges}
                >
                  <Text className="font-semibold text-[#9a3412]">Hủy</Text>
                </Pressable>
                <Pressable
                  className="flex-1 items-center rounded-xl bg-orange-500 py-3"
                  onPress={onConfirmChanges}
                >
                  <Text className="font-semibold text-white">Xác nhận</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </Entrance>

        <Entrance delay={120}>
          <View className="gap-2 rounded-[18px] border border-[#f8c6a8] bg-[#fff8f2] p-4">
            <Text className="text-lg font-bold text-[#252020]">Quản lý tài khoản</Text>

            <Pressable
              className="flex-row items-center justify-between rounded-xl bg-white px-3 py-3"
              onPress={() => onComingSoon("Đơn hàng của tôi")}
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="clipboard-list-outline" size={20} color="#ea580c" />
                <Text className="font-medium text-[#252020]">Đơn hàng của tôi</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
            </Pressable>

            <Pressable
              className="flex-row items-center justify-between rounded-xl bg-white px-3 py-3"
              onPress={() => onComingSoon("Sổ địa chỉ")}
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="map-marker-outline" size={20} color="#ea580c" />
                <Text className="font-medium text-[#252020]">Sổ địa chỉ</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
            </Pressable>

            <Pressable
              className="flex-row items-center justify-between rounded-xl bg-white px-3 py-3"
              onPress={() => onComingSoon("Bảo mật tài khoản")}
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="shield-lock-outline" size={20} color="#ea580c" />
                <Text className="font-medium text-[#252020]">Bảo mật tài khoản</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
            </Pressable>

            <Pressable
              className="flex-row items-center justify-between rounded-xl bg-white px-3 py-3"
              onPress={() => onComingSoon("Hỗ trợ khách hàng")}
            >
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons name="help-circle-outline" size={20} color="#ea580c" />
                <Text className="font-medium text-[#252020]">Hỗ trợ khách hàng</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#94a3b8" />
            </Pressable>
          </View>
        </Entrance>

        <Entrance delay={180}>
          <View className="gap-2 rounded-[18px] border border-[#fecaca] bg-[#fff1f2] p-4">
            <Text className="text-lg font-bold text-[#3f1d1d]">Phiên làm việc</Text>
            <Pressable
              className="mt-1 flex-row items-center justify-center gap-2 rounded-xl bg-rose-500 py-3"
              onPress={() => dispatch(clearSession())}
            >
              <MaterialCommunityIcons name="logout" size={18} color="#fff" />
              <Text className="font-semibold text-white">Đăng xuất</Text>
            </Pressable>
            <Text className="text-center text-xs text-[#9f5353]">PetStore Mobile v1.0.0</Text>
          </View>
        </Entrance>
      </ScrollView>
    </ScreenContainer>
  );
};
