import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../constants/theme";

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Entrance>
          <View style={styles.hero}>
          <Text style={styles.badge}>Pet Shop hien dai</Text>
          <Text style={styles.title}>Noi thu cung tro thanh thanh vien gia dinh</Text>
          <Text style={styles.subtitle}>
            Kham pha bo suu tap thu cung va phu kien cao cap theo phong cach cua
            frontend web.
          </Text>
          </View>
        </Entrance>

        <Entrance delay={90}>
          <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vi sao chon chung toi</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thu cung duoc cham soc ky</Text>
            <Text style={styles.cardText}>
              Tu van giong loai, suc khoe va che do cham soc phu hop cho tung gia
              dinh.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Phu kien chat luong</Text>
            <Text style={styles.cardText}>
              Danh muc phu kien duoc chon loc, de dang tim kiem va dat hang.
            </Text>
          </View>
          </View>
        </Entrance>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 24,
    gap: 14,
  },
  hero: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#0f172a",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(249, 115, 22, 0.22)",
    color: "#fdba74",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 10,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "800",
    color: "#fff",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#e2e8f0",
  },
  section: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    color: colors.foreground,
    fontSize: 19,
    fontWeight: "700",
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#fdba74",
    padding: 12,
  },
  cardTitle: {
    color: "#9a3412",
    fontWeight: "700",
    marginBottom: 4,
  },
  cardText: {
    color: "#7c2d12",
    fontSize: 13,
    lineHeight: 19,
  },
});
