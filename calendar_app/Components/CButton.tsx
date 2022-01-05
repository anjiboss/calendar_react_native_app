import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from "react-native";

interface Props {
  onPress?: () => void;
  customContainerStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
}

const CButton: React.FC<Props> = ({
  children,
  onPress,
  customContainerStyle,
  customTextStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, customContainerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, customTextStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default CButton;
