import axios from "axios";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../Constants/color";
import { env } from "../Constants/env";
import { GlobalContext } from "../types/context";
import CButton from "./CButton";

const AddNewIcon: React.FC = ({}) => {
  const globalContext = useContext(GlobalContext);
  const [newIcon, setNewIcon] = useState("");
  const [description, setDescription] = useState("");
  const handleSaveNewIcon = () => {
    if (newIcon.length > 1 && description.length > 1) {
      axios({
        url: `${env.API}/icon`,
        method: "POST",
        data: {
          username: globalContext.username,
          icon: newIcon,
          description,
        },
      }).then(({ data }) => {
        if (data.success) {
          globalContext.setIcons((prev) => [...prev, data.icon]);
        }
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <View style={styles.textInputContainer}>
          <Text>New Iccon</Text>
          <TextInput
            style={styles.textInput}
            value={newIcon}
            onChangeText={(e) => {
              setNewIcon(e);
            }}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text>Description</Text>
          <TextInput
            value={description}
            style={styles.textInput}
            onChangeText={(e) => {
              setDescription(e);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CButton
            customContainerStyle={{
              backgroundColor: colors.underline,
            }}
            onPress={handleSaveNewIcon}
          >
            Save
          </CButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 7,
    padding: 40,
  },
  textInput: {
    height: 30,
    borderBottomColor: colors.underline,
    borderBottomWidth: 1,
  },
  textInputContainer: {
    margin: 10,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btn: {
    width: 100,
    height: 50,
    backgroundColor: "#f50057",
  },
});

export default AddNewIcon;
