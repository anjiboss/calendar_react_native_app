import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import Modal from "react-native-modal";
import { env } from "../Constants/env";
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
  const [loading, setLoading] = useState(false);
  const handleDelUserIcon = (icon: Icon) => {
    setLoading(true);
    axios({
      url: `${env.API}/icon/${icon.id}`,
      method: "delete",
      data: {
        username: globalContext.username,
      },
    })
      .then(({ data }) => {
        setLoading(false);
        if (data.success) {
          globalContext.setIcons((prev) => {
            return prev.filter((i) => i.id !== data.icon.id);
          });
        } else {
          Alert.alert(
            "Error",
            data.error.message,
            [{ text: "Cancel", style: "cancel" }],
            {
              cancelable: true,
            }
          );
        }
      })
      .catch(() => {
        console.trace("error while deleting user icon");
      });
  };
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
          <AddNewIcon toggleMode={() => setAddMode(!addMode)} />
        ) : (
          <View style={styles.cardContainer}>
            <ScrollView>
              <View style={styles.scrollview}>
                <Text
                  style={{
                    fontSize: 10,
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  Hold Press the icon to delete it from this day
                </Text>
                {globalContext.icons.map((icon, i) => {
                  return (
                    <Card
                      loading={loading}
                      key={i}
                      onPress={() => {}}
                      onLongPress={() => handleDelUserIcon(icon)}
                      delayLongPress={500}
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
