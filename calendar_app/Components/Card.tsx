import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress: (any: any) => void;
}
const Card: React.FC<Props> = ({ children, style, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.card, style]}>{children}</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default Card;
