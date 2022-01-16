import axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";
import ReactNativeModal from "react-native-modal";
import { env } from "../Constants/env";
import { GlobalContext } from "../types/context";
import Card from "./Card";

interface DayInfoViewProps {
  day: Day;
  icons: string[];
  isVisible: boolean;
  handleCloseModal: () => void;
  updateDay: (newIcon: string[]) => void;
}

const DayInfoView: React.FC<DayInfoViewProps> = ({
  day,
  icons,
  isVisible,
  handleCloseModal,
  updateDay,
}) => {
  const { icons: gIcons, username } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const dayIcon = useMemo(() => {
    // return gIcons.filter((i) => dIcons.includes(i.icon));
    const tmp = [];
    for (let i = 0; i < icons.length; i++) {
      const _icon = gIcons.find((_i) => _i.icon === icons[i]);
      if (_icon) {
        tmp.push(_icon);
      }
    }
    return tmp;
  }, [day, icons, gIcons]);

  const handleClearIcon = (icon: Icon) => {
    setLoading(true);
    axios({
      url: `${env.API}/day/${day.day}`,
      method: "DELETE",
      data: {
        month: day.month,
        username,
        icon: icon.icon,
      },
    })
      .then(({ data }) => {
        if (data.success) {
          console.log("del success");
          setLoading(false);
          updateDay(data.day.icons);
        }
      })
      .catch(() => {
        console.trace("Error while deleting icon in day");
      });
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      hasBackdrop
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
    >
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 10, fontStyle: "italic" }}>
              Hold Press the icon to delete it from this day
            </Text>
            {dayIcon.length > 0 &&
              dayIcon.map((icon, i) => {
                return (
                  <Card
                    loading={loading}
                    key={i}
                    onLongPress={() => {
                      console.log(icon);
                      handleClearIcon(icon);
                    }}
                    delayLongPress={200}
                    style={{
                      width: Dimensions.get("screen").width - 100,
                      backgroundColor: "#F2E6E6",
                      height: 70,
                      margin: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Text>{icon.icon} : </Text>
                    <Text>{icon.description}</Text>
                  </Card>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};
export default DayInfoView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 0.8,
    paddingTop: 50,
  },
});
