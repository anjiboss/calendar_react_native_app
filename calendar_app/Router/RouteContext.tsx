import { createContext } from "react";

interface IRouterContext {
  currentRoute: Route; // Add New Route to This Type First
  changeRoute: (route: Route) => void;
}
export const RouterContext = createContext<IRouterContext>({
  currentRoute: "HomeScreen", // Initial Route
  changeRoute: () => {}, // Initial Route Change Function
});
