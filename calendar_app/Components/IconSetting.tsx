import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Modal from "react-native-modal";
import { GlobalContext } from "../types/context";
import AddNewIcon from "./AddNewIcon";
import Card from "./Card";

interface IconSettingProps {
  visible: boolean;
  handleClose: () => void;
}

const IconSetting: React.FC<IconSettingProps> = ({ visible, handleClose }) => {
  const globalContext = useContext(GlobalContext);
  const [addMode, setAddMode] = useState(false);
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={handleClose}
      hasBackdrop
      onBackdropPress={handleClose}
      swipeThreshold={100}
      onSwipeComplete={handleClose}
    >
      <View style={styles.container}>
        {addMode ? (
          <AddNewIcon />
        ) : (
          <View style={styles.cardContainer}>
            <ScrollView>
              <View style={styles.scrollview}>
                {globalContext.icons.map((icon, i) => {
                  return (
                    <Card
                      key={i}
                      onPress={() => {}}
                      style={{
                        backgroundColor: "#F2E6E6",
                        height: 70,
                        margin: 10,
                      }}
                    >
                      <Text
                        style={{
                          width: "100%",
                        }}
                      >
                        {icon.icon} {":   "} {icon.description}
                      </Text>
                    </Card>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        )}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setAddMode(!addMode)}>
            {addMode ? <Icon name="close" /> : <Icon name="add" />}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default IconSetting;

const styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: "white",
  },
  cardContainer: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    flexGrow: 1,
  },
  iconContainer: {
    paddingBottom: 15,
  },
});
