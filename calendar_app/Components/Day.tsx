import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Constants/color";
import { env } from "../Constants/env";
import { GlobalContext } from "../types/context";
import AddIconToDay from "./AddIconToDay";

interface DayProps {
  day: Day;
}

const Day: React.FC<DayProps> = ({ day }) => {
  const [visible, setVisible] = useState(false);
  const globalContext = useContext(GlobalContext);

  const handleAddIconToDay = (icon: string) => {
    console.log(icon);
    axios({
      url: `${env.API}/day`,
      method: "POST",
      data: {
        username: "anji",
        day: day.day,
        month: day.month,
        icon: icon,
      },
    }).then((data) => {
      console.log(data.data);
    });
  };
  return (
    <TouchableOpacity onPress={() => setVisible(true)}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Day: {day.day}
          {"     "}
          {day.icons.map((icon, i) => (
            <Text key={`${i}`}>
              {icon} {"   "}
            </Text>
          ))}
        </Text>
      </View>
      <AddIconToDay
        visible={visible}
        handleAddIconToDay={handleAddIconToDay}
        handleCloseModal={() => setVisible(false)}
      />
    </TouchableOpacity>
  );
};
export default Day;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: colors.day,
    height: 70,
    borderRadius: 5,
    shadowColor: "#1C5228",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  text: {
    color: colors.brightText,
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});
