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

const { fontScale } = Dimensions.get("window");

const Profile = () => {
  const { isAuthenticated, setisAuthenticated } = useUser();
  const logout = () => {
    setisAuthenticated(false);
    AsyncStorage.removeItem("userId");
  };

  const navigation = useNavigation();
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
            fontWeight: "600",
            marginBottom: 20,
          }}
        >
          Edit Profile
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={{ fontSize: 16 / fontScale }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={logout}>
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
