import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../constants/theme";
import { useAppDispatch } from "../store/hooks";
import { clearSession } from "../store/slices/authSlice";

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Entrance>
          <View style={styles.card}>
          <Text style={styles.title}>Tai khoan</Text>
          <Text style={styles.text}>Vai tro hien tai: User (demo)</Text>
          <Text style={styles.text}>Trang thai dong bo voi frontend web.</Text>
          <Pressable style={styles.button} onPress={() => dispatch(clearSession())}>
            <Text style={styles.buttonText}>Dang xuat</Text>
          </Pressable>
          </View>
        </Entrance>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.foreground,
  },
  text: {
    color: colors.muted,
  },
  button: {
    marginTop: 8,
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
