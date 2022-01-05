import React, { useCallback, useState } from "react";
import { View } from "react-native";
import Layout from "../Components/Layout";
import NavigationBar from "../Components/NavigationBar";
import { RouterContext } from "./RouteContext";

interface RouterProps {
  HomeScreen: React.FC<any>;
  LeftScreen: React.FC<any>;
  RightScreen: React.FC<any>;
}

const Router: React.FC<RouterProps> = ({
  HomeScreen,
  LeftScreen,
  RightScreen,
}) => {
  const [route, setRoute] = useState<Route>("HomeScreen");
  const changeRoute = useCallback((route: Route) => {
    setRoute(route);
  }, []);
  return (
    <RouterContext.Provider value={{ changeRoute, currentRoute: route }}>
      <View style={{ flex: 1 }}>
        <Layout>
          {route === "RightScreen" ? (
            <RightScreen />
          ) : route === "LeftScreen" ? (
            <LeftScreen />
          ) : (
            <HomeScreen />
          )}
        </Layout>
        <NavigationBar />
      </View>
    </RouterContext.Provider>
  );
};
export default Router;
