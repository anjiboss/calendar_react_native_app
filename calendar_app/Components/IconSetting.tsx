import React from "react";
import { Text, View, Button } from "react-native";
import Modal from "react-native-modal";

interface IconSettingProps {
  visible: boolean;
  handleClose: () => void;
}

const IconSetting: React.FC<IconSettingProps> = ({ visible, handleClose }) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={handleClose}
      hasBackdrop
      onBackdropPress={handleClose}
      swipeThreshold={100}
      onSwipeComplete={handleClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "skyblue",
        }}
      >
        <Button title="Close" onPress={handleClose} />
      </View>
    </Modal>
  );
};
export default IconSetting;
