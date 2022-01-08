import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { env } from "../Constants/env";
import { GlobalContext } from "../types/context";
import { daysInMonth } from "../utils/__";
import DaysData from "./DaysData";
import MonthNav from "./MonthNav";

const Calendar: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<Day[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  useEffect(() => {
    setLoading(true);
    if (globalContext.username) {
      axios({
        url: `${env.API}/day/month/${month}?username=${globalContext.username}`,
        method: "GET",
      })
        .then(({ data }) => {
          if (data.success) {
            const _days: Day[] = data.days;
            const tmp = new Array(
              daysInMonth(month + 1, new Date().getFullYear())
            ).fill(undefined);
            const fixedDays = tmp.map((_, i) => {
              const iconToday = _days.find((_d) => _d.day === i + 1);
              if (!iconToday) {
                return {
                  day: i + 1,
                  month: month,
                  icons: [] as string[],
                };
              } else {
                return iconToday;
              }
            });
            setDays(fixedDays);
          } else {
            console.log("43", data.error.message);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          console.log("get day error");
        });
    }
  }, [month, globalContext.username]);

  useEffect(() => {
    if (globalContext.username) {
      if (globalContext.icons.length === 0)
        axios({
          url: `${env.API}/icon/${globalContext.username}`,
          method: "GET",
        })
          .then(({ data }) => {
            if (data.success) {
              globalContext.setIcons(data.icons);
            } else {
              Alert.alert(
                "Error",
                data.error.message,
                [{ text: "Cancel", style: "cancel" }],
                {
                  cancelable: true,
                }
              );
            }
          })
          .catch(() => {
            console.log("error");
          });
    }
  }, [globalContext.icons, globalContext.username]);

  // --------------------------------------------------  Handler
  const hanldeChangeMonth = (newMonth: number) => {
    setMonth(newMonth);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.viewContainer}>
        <View style={styles.monthContainer}>
          {/* --------------------------------------- Change Month and Icon Setting */}
          <MonthNav month={month} handleChangeMonth={hanldeChangeMonth} />
        </View>
        {loading ? (
          <ActivityIndicator color="green" />
        ) : (
          <View style={styles.dayContainer}>
            {/* ---------------------------------------- Days Log */}
            <DaysData days={days} />
          </View>
        )}
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  monthContainer: {
    padding: 5,
    height: 60,
  },
  dayContainer: {
    flex: 9,
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
});
