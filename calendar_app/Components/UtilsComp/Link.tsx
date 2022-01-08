import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Link: React.FC<Props> = ({ children, style, onPress }) => {
  return (
    <TouchableWithoutFeedback>
      <Text style={[styles.link, style]} onPress={onPress}>
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: "bold",
    color: "#ff9100",
  },
});

export default Link;
