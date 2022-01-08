import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { RouterContext } from "../Router/RouteContext";
import CButton from "./CButton";

const NavigationBar: React.FC = () => {
  const router = useContext(RouterContext);
  return (
    <View style={styles.naBar}>
      <View style={styles.btn}>
        <CButton
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "LeftScreen") {
              router.changeRoute("LeftScreen");
            }
          }}
        >
          <Icon name="account-circle" />
        </CButton>
      </View>
      <View style={styles.btn}>
        <CButton
          onPress={() => {
            if (router.changeRoute && router.currentRoute !== "HomeScreen") {
              router.changeRoute("HomeScreen");
            }
          }}
        >
          <Icon name="home" type="font-awesome" size={26} />
        </CButton>
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
