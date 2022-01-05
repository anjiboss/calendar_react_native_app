import React, { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { colors } from "../Constants/color";
import { RouterContext } from "../Router/RouteContext";

const NavigationBar: React.FC = () => {
  const router = useContext(RouterContext);
  return (
    <View style={styles.naBar}>
      <View style={styles.btn}>
        <Button
          color={colors.accent}
          title="Left Screen"
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "LeftScreen") {
              router.changeRoute("LeftScreen");
            }
          }}
        />
      </View>
      <View style={styles.btn}>
        <Button
          color={colors.accent}
          title="Home Screen"
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "HomeScreen") {
              router.changeRoute("HomeScreen");
            }
          }}
        />
      </View>
      <View style={styles.btn}>
        <Button
          color={colors.accent}
          title="Right Screen"
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "RightScreen") {
              router.changeRoute("RightScreen");
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {},
  naBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default NavigationBar;
