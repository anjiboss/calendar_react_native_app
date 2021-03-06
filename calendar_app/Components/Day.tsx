import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../Constants/color";
import { env } from "../Constants/env";
import { GlobalContext } from "../types/context";
import AddIconToDay from "./AddIconToDay";
import DayInfoView from "./DayInfoView";

interface DayProps {
  day: Day;
}

const Day: React.FC<DayProps> = ({ day }) => {
  const [dayIcon, setDayIcon] = useState(day.icons);
  const [visible, setShowAddIcon] = useState(false);
  const globalContext = useContext(GlobalContext);
  const [dayInfo, setDayInfo] = useState(false);

  useEffect(() => {
    setDayIcon(day.icons);
  }, [day.icons]);

  const handleAddIconToDay = (icon: string) => {
    setDayIcon((prev) => [...prev, icon]);
    axios({
      url: `${env.API}/day`,
      method: "POST",
      data: {
        username: globalContext.username,
        day: day.day,
        month: day.month,
        icon: icon,
      },
    }).then(({ data }) => {
      if (!data.success) {
        Alert.alert(
          "Error",
          data.error.message,
          [{ text: "Cancel", style: "cancel" }],
          {
            cancelable: true,
          }
        );
      }
    });
  };
  return (
    <TouchableOpacity
      onPress={() => setShowAddIcon(true)}
      onLongPress={() => setDayInfo(true)}
      delayLongPress={300}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Day: {day.day}
          {"     "}
          {dayIcon.map((icon, i) => (
            <Text key={`${i}`}>
              {icon} {"   "}
            </Text>
          ))}
        </Text>
      </View>
      <AddIconToDay
        visible={visible}
        handleAddIconToDay={handleAddIconToDay}
        handleCloseModal={() => setShowAddIcon(false)}
      />
      <DayInfoView
        isVisible={dayInfo}
        day={day}
        icons={dayIcon}
        handleCloseModal={() => setDayInfo(false)}
        updateDay={(newIcons) => {
          console.log({ newIcons });
          setDayIcon(newIcons);
        }}
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
    color: "#3159A7",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.55)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
});
