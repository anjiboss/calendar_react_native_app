import React, { useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import { RouterContext } from "../Router/RouteContext";
import { GlobalContext } from "../types/context";
import Calendar from "../Components/Calendar";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const router = useContext(RouterContext);

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Home");
    }
  }, [globalContext]);

  useEffect(() => {
    if (router.currentRoute === "HomeScreen") {
      const getUsername = async () => {
        const result = await SecureStore.getItemAsync("username");
        if (result) {
          setLoading(false);
          globalContext.setUsername(result);
        } else {
          setLoading(false);
          router.changeRoute("LeftScreen");
        }
      };
      getUsername();
    }
  }, [router.currentRoute]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"coral"} />
      ) : (
        <Calendar />
      )}
    </View>
  );
};

export default Homescreen;
