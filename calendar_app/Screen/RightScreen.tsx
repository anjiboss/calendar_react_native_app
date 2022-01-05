import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { colors } from "../Constants/color";

const Homescreen: React.FC = () => {
  return (
    <View>
      <Text>This Is Right View</Text>
      <View>
        <Icon
          name="settings-applications"
          type="material"
          size={50}
          color={colors.accent}
        />
        <Icon name="spinner-2" type="evilicon" />
      </View>
    </View>
  );
};

export default Homescreen;
