import React from "react";
import { FlatList, View } from "react-native";
import Day from "./Day";

interface DaysDataProps {
  days: Day[];
}

const DaysData: React.FC<DaysDataProps> = ({ days }) => {
  return (
    <View
      style={{
        backgroundColor: "#5F9064",
        borderRadius: 10,
      }}
    >
      <FlatList
        data={days}
        renderItem={({ item }) => <Day day={item} />}
        keyExtractor={(_, i) => `${i}`}
      />
    </View>
  );
};
export default DaysData;
