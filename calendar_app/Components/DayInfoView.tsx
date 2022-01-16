import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReactNativeModal from "react-native-modal";

interface DayInfoViewProps {
  day: Day;
  isVisible: boolean;
  handleCloseModal: () => void;
}

const DayInfoView: React.FC<DayInfoViewProps> = ({
  day,
  isVisible,
  handleCloseModal,
}) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      hasBackdrop
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
    >
      <View style={styles.container}>
        <Text>Ok</Text>
      </View>
    </ReactNativeModal>
  );
};
export default DayInfoView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
