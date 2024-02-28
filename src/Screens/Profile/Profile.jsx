import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useUser } from "../../constants/context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../constants/config";

const { fontScale } = Dimensions.get("window");

const Profile = () => {
  const { isAuthenticated, setisAuthenticated, userData } = useUser();

  const navigation = useNavigation();

  const LogOut = async () => {
    console.log("Logging out");
    setisAuthenticated(false);
    AsyncStorage.removeItem("userId");
    await axios
      .post(`${BASE_URL}/api/user/LogOutUser`, {
        userId: userData?.id,
      })
      .then((res) => {
        console.log(res.data, "Logged out");
      })
      .catch((error) => {
        console.log(error.response.data.message, "Log out failed");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          marginVertical: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ height: 100, width: 100 }}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 22 / fontScale,
            fontWeight: "700",
            marginBottom: 25,
          }}
        >
          Settings
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={{ fontSize: 16 / fontScale }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={LogOut}>
          <Text style={{ fontSize: 16 / fontScale }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#EEFBF7",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
