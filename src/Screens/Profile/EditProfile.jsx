import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomInput, CustomPasswordInput } from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";
import { colors } from "../../theme/theme";
import { useUser } from "../../constants/context";
import axios from "axios";
import { BASE_URL } from "../../constants/config";

const { fontScale } = Dimensions.get("window");

const EditProfile = () => {
  const navigation = useNavigation();

  const { userData } = useUser();

  const [firstName, setfirstName] = useState(userData?.firstName);
  const [lastName, setlastName] = useState(userData?.lastName);
  const [email, setEmail] = useState(userData?.email);
  const [age, setage] = useState(userData?.age);
  const [mobile, setmobile] = useState(userData?.mobile);

  const [loading, setloading] = useState(false);

  const UpdateUser = async () => {
    console.log("Updating User");

    await axios
      .post(`${BASE_URL}/api/user/updateUser`, {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        age: age,
        userId: userData?.id,
      })
      .then((res) => {
        console.log(res.data, "Token added");
      })
      .catch((error) => {
        console.log(error.response.data.message, "Token not added");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Spinner visible={loading} />
      <ScrollView
        keyboardDismissMode="interactive"
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color={colors.textColor} />
          </TouchableOpacity>
          <Text style={styles.titleText}>Edit Profile</Text>
        </View>

        <View style={styles.inputContainer}>
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
        <View style={{ margin: 20 }}>
          <CustomBtn text="update" primary={true} onPress={UpdateUser} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: "10%",
  },
  inputContainer: { marginTop: 10, marginHorizontal: 20, marginTop: "10%" },
  titleText: {
    fontSize: 24 / fontScale,
    color: colors.textColor,
    fontWeight: "700",
  },
  avatarContainer: {
    marginVertical: 20,
    height: 102.5,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { width: 100, height: 100, borderRadius: 360 },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "60%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#EEFBF7",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 75,
  },
  btnText: {
    color: colors.textColor,
    fontSize: 14 / fontScale,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
