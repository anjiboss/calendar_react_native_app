import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { colors } from "../Constants/color";
import IconSetting from "./IconSetting";

interface MonthNavProps {
  month: number;
  handleChangeMonth: (newMonth: number) => void;
}

const MonthNav: React.FC<MonthNavProps> = ({ month, handleChangeMonth }) => {
  const [iconSetting, setIconSetting] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.month}>
        <Icon
          name="arrow-left"
          type="evilicon"
          size={35}
          color="#FF9090"
          onPress={() => handleChangeMonth(month - 1)}
        />
        <Text style={styles.text}>
          {month + 1}/{new Date().getFullYear()}
        </Text>
        <Icon
          name="arrow-right"
          type="evilicon"
          size={35}
          color="#FF9090"
          onPress={() => handleChangeMonth(month + 1)}
        />
      </View>
      <View style={styles.iconSetting}>
        <TouchableOpacity onPress={() => setIconSetting(true)}>
          <View>
            <Icon name="list" size={45} color="#C825E2" />
          </View>
        </TouchableOpacity>
      </View>
      <IconSetting
        visible={iconSetting}
        handleClose={() => setIconSetting(false)}
      />
    </View>
  );
};
export default MonthNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  month: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: colors.primaryColor,
  },
  iconSetting: {
    flex: 2,
  },
});
