import React from "react";
import { useContext } from "react";
import Modal from "react-native-modal";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../types/context";
import Card from "./Card";

interface AddIconToDayProps {
  visible: boolean;
  handleCloseModal: () => void;
  handleAddIconToDay: (icon: string) => void;
}

const AddIconToDay: React.FC<AddIconToDayProps> = ({
  visible,
  handleCloseModal,
  handleAddIconToDay,
}) => {
  const globalContext = useContext(GlobalContext);

  return (
    <Modal
      style={{ margin: 0 }}
      isVisible={visible}
      onBackButtonPress={handleCloseModal}
      hasBackdrop
      backdropOpacity={0}
      onBackdropPress={handleCloseModal}
      useNativeDriver
    >
      <View style={styles.scrollView}>
        <ScrollView>
          <View style={styles.container}>
            {globalContext.icons.map((icon, i) => {
              return (
                <Card
                  key={i}
                  onPress={() => handleAddIconToDay(icon.icon)}
                  style={{
                    width: 140,
                    backgroundColor: "#F2E6E6",
                    height: 70,
                    margin: 10,
                  }}
                >
                  <Text>{icon.icon}</Text>
                  <Text>{icon.description}</Text>
                </Card>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
export default AddIconToDay;
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    height: 300,
    marginTop: Dimensions.get("window").height - 300,
    paddingVertical: 20,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5,
  },
});
