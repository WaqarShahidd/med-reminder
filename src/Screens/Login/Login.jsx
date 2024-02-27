import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../theme/theme";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../constants/context";
import Spinner from "react-native-loading-spinner-overlay";

const { fontScale } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignIn, loading } = useUser();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <Spinner visible={loading} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ height: 100, width: 100 }}
          />

          <Text style={styles.headerText}>Login</Text>

          <Text style={styles.subtitle}>
            Login with your account information below,
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            value={email}
            setValue={setEmail}
            placeholder="Email"
            Icon={MaterialCommunityIcons}
            iconName="mail"
            margin
          />
          <CustomPasswordInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginVertical: 20,
            marginHorizontal: 20,
          }}
        >
          <CustomBtn
            text="Login"
            primary
            margin
            onPress={() => {
              if (email === "" && password === "") {
                alert("Please fill the fields");
              } else {
                SignIn(email, password);
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
    marginTop: 25,
  },
  subtitle: {
    marginTop: 15,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 14 / fontScale,
    color: "#97B6BD",
    maxWidth: "75%",
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
