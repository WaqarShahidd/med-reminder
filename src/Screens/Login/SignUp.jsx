import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import { colors } from "../../theme/theme";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import CustomBtn from "../../components/CustomBtn";
import { useUser } from "../../constants/context";
import Spinner from "react-native-loading-spinner-overlay";

const { fontScale } = Dimensions.get("window");

const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setage] = useState("");
  const [mobile, setmobile] = useState("");

  const { SignUp, error, loading } = useUser();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        keyboardDismissMode="interactive"
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Spinner visible={loading} />

        <View style={styles.subContainer}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{ height: 100, width: 100 }}
          />

          <Text style={styles.headerText}>Sign Up</Text>

          <Text style={styles.subtitle}>Create a new account.</Text>
        </View>

        <View style={styles.inputContainer}>
          {error && (
            <Text
              style={{
                marginBottom: 25,
                color: "red",
              }}
            >
              {error}
            </Text>
          )}

          <CustomInput
            placeholder="First Name"
            value={firstName}
            setValue={setfirstName}
            Icon={Ionicons}
            iconName="person-outline"
          />
          <CustomInput
            placeholder="Last Name"
            value={lastName}
            setValue={setlastName}
            Icon={Ionicons}
            iconName="person-outline"
            margin={true}
          />
          <CustomInput
            placeholder="Email"
            value={email}
            setValue={setEmail}
            Icon={MaterialCommunityIcons}
            iconName="email-outline"
            margin={true}
          />
          <CustomPasswordInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <CustomInput
            placeholder="Age"
            value={age}
            setValue={setage}
            Icon={MaterialCommunityIcons}
            iconName="calendar-month-outline"
            margin={true}
          />
          <CustomInput
            placeholder="Mobile"
            value={mobile}
            setValue={setmobile}
            Icon={MaterialCommunityIcons}
            iconName="cellphone"
            margin={true}
          />
        </View>
        <View
          style={{
            margin: 20,
          }}
        >
          <CustomBtn
            text="Sign Up"
            primary
            margin
            onPress={() => {
              if (email === "" && password === "") {
                alert("Please fill the fields");
              } else {
                SignUp(email, password, firstName, lastName, age, mobile);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
});
