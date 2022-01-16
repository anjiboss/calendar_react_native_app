import { createContext } from "react";

interface IGlobalContext {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  icons: Icon[];
  setIcons: React.Dispatch<React.SetStateAction<Icon[]>>;
}

const GlobalContext = createContext<IGlobalContext>({
  title: "Home",
  setTitle: () => {},
  username: "",
  setUsername: () => {},
  icons: [],
  setIcons: () => {},
});

export { IGlobalContext, GlobalContext };

export const CalendarContext = createContext<{
  updateDays: (day: Day) => void;
}>({
  updateDays: () => {},
});
