import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { GlobalContext } from "../types/context";
import { TextInput } from "react-native";
import { colors } from "../Constants/color";
import CButton from "../Components/CButton";
import axios from "axios";
import { env } from "../Constants/env";
import { RouterContext } from "../Router/RouteContext";
import * as SecureStore from "expo-secure-store";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const router = useContext(RouterContext);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Register");
    }
  }, [globalContext]);

  const handleOnPress = () => {
    axios({
      url: `${env.API}/user`,
      method: "post",
      data: {
        username,
        firstName,
        lastName,
      },
    })
      .then(({ data }) => {
        if (data.success) {
          SecureStore.setItemAsync("username", data.user.username).then(() => {
            globalContext.setUsername(data.user.username);
            router.changeRoute("HomeScreen");
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
        console.log("error");
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="username"
              onChangeText={(e) => setUsername(e)}
            />
          </View>

          <View>
            <TextInput
              style={styles.textInput}
              placeholder="firstName"
              onChangeText={(e) => setFirstName(e)}
            />
          </View>

          <View>
            <TextInput
              style={styles.textInput}
              placeholder="lastName"
              onChangeText={(e) => setLastName(e)}
            />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <CButton
            onPress={handleOnPress}
            customContainerStyle={styles.btn}
            customTextStyle={{ color: "#fff" }}
          >
            Register
          </CButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: 350,
    flex: 4,
    marginTop: 60,
  },
  textInput: {
    height: 30,
    margin: 20,
    borderBottomColor: colors.underline,
    borderBottomWidth: 1,
  },
  btnContainer: {
    flex: 2,
    width: 250,
    height: 100,
  },
  btn: {
    backgroundColor: colors.primaryColor,
    width: 250,
    height: 50,
    borderRadius: 20,
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 10,
  },
});
