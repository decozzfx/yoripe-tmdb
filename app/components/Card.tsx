import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../themes/useTheme";
import { spacing } from "../themes/theme";
import { CardPropsType } from "../types/components";

const Card = ({ children, style }: CardPropsType) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg }, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: spacing.layoutPaddingH,
    paddingVertical: spacing.layoutPaddingH,
    borderRadius: spacing.borderRadius,
  },
});
