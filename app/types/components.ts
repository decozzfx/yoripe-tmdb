import { ReactNode } from "react";
import { ViewStyle, StyleProp, TextInputProps } from "react-native";

// Layout
export interface LayoutPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Card
export interface CardPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Input
export interface InputPropsType extends TextInputProps {
  testID?: string;
  style?: ViewStyle;
  error?: string;
}
