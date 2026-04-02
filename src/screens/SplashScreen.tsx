import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entrance } from "../components/Entrance";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../constants/theme";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 900);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Entrance>
          <View style={styles.surface}>
            <ActivityIndicator size="large" color={colors.brand500} />
            <Text style={styles.text}>PetStore Mobile</Text>
          </View>
        </Entrance>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  surface: {
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
