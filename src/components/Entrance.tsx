import { PropsWithChildren, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type Props = PropsWithChildren<{
  delay?: number;
  offsetY?: number;
  fill?: boolean;
}>;

export const Entrance = ({
  children,
  delay = 0,
  offsetY = 16,
  fill = false,
}: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(offsetY)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 340,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 380,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View
      style={[
        { opacity, transform: [{ translateY }] },
        fill ? { flex: 1 } : null,
      ]}
    >
      {children}
    </Animated.View>
  );
};
