import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../Constants/color";

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: (any: any) => void;
  onLongPress?: () => void;
  delayLongPress?: number;
  loading?: boolean;
}
const Card: React.FC<Props> = ({
  children,
  style,
  onPress,
  onLongPress,
  delayLongPress,
  loading,
}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={delayLongPress || 100}
      >
        <View style={[styles.card, style]}>
          {loading !== undefined ? (
            loading === true ? (
              <ActivityIndicator color={colors.primaryColor} />
            ) : (
              children
            )
          ) : (
            children
          )}
        </View>
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
