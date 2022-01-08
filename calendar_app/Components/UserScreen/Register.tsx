import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../Constants/color";
import { env } from "../../Constants/env";
import { GlobalContext } from "../../types/context";
import CButton from "../CButton";
import * as SecureStore from "expo-secure-store";
import { RouterContext } from "../../Router/RouteContext";
import Link from "../UtilsComp/Link";

interface Props {
  toggleMode: () => void;
}

const Register: React.FC<Props> = ({ toggleMode }) => {
  const globalContext = useContext(GlobalContext);
  const router = useContext(RouterContext);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (globalContext) {
      globalContext.setTitle("Register");
    }
  }, [globalContext]);

  const handleOnPress = () => {
    setLoading(true);
    axios({
      url: `${env.API}/user`,
      method: "post",
      data: {
        username,
        password,
        firstName,
        lastName,
      },
    })
      .then(({ data }) => {
        setLoading(false);
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
      .catch((e) => {
        console.log("register error", e);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
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
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(e) => setPassword(e)}
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
        <Text style={{ marginBottom: 10, textAlign: "center" }}>
          Had account? <Link onPress={toggleMode}>Login</Link>
        </Text>
        <CButton
          onPress={handleOnPress}
          customContainerStyle={styles.btn}
          customTextStyle={{ color: "#fff" }}
        >
          {loading ? <ActivityIndicator color="#fff" /> : "Register"}
        </CButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Register;
