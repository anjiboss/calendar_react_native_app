import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ActivityIndicator,
} from "react-native";
import { GlobalContext } from "../types/context";
import { colors } from "../Constants/color";
import * as SecureStore from "expo-secure-store";
import Register from "../Components/UserScreen/Register";
import Login from "../Components/UserScreen/Login";
import Card from "../Components/Card";
import CButton from "../Components/CButton";

const Homescreen: React.FC = () => {
  const globalContext = useContext(GlobalContext);
  const [logged, setLogged] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsername = async () => {
      const result = await SecureStore.getItemAsync("username");
      if (result) {
        setLoading(false);
        setLogged(true);
        globalContext.setUsername(result);
      } else {
        setLoading(false);
        setLogged(false);
      }
    };
    getUsername();
  }, []);

  const handleLoggout = () => {
    setLoading(true);
    SecureStore.deleteItemAsync("username");
    setLoading(false);
    setLogged(false);
    globalContext.setUsername("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          {logged ? (
            <Card style={styles.userCard} onPress={() => {}}>
              <Text>Hi! {globalContext.username}</Text>
              <View>
                <CButton onPress={handleLoggout}>Loggout</CButton>
              </View>
            </Card>
          ) : register ? (
            <Register toggleMode={() => setRegister(!register)} />
          ) : (
            <Login toggleMode={() => setRegister(!register)} />
          )}
        </View>
      )}
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
  userCard: {
    marginTop: 50,
    width: 250,
    height: 300,
  },
});
