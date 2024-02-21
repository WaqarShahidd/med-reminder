import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { H1 } from "tamagui";
import { colors } from "../../theme/theme";
import CustomBtn from "../../components/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const { fontScale } = Dimensions.get("window");

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ height: 150, width: 150 }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.titleText1}>
          MED <Text style={{ color: colors.primary }}>REMINDER</Text>
        </Text>

        <View
          style={{
            maxWidth: "90%",
          }}
        >
          <Text style={styles.subtitle}>
            We make pill and medicine reminders easy for you. Try it now.
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <CustomBtn
          text="Login"
          primary
          onPress={() => navigation.navigate("Login")}
          margin
        />
        <CustomBtn
          text="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
          margin
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  logoContainer: {
    paddingTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText1: {
    marginTop: 15,
    fontSize: 28 / fontScale,
    color: "#ccc",
    letterSpacing: 2,
    paddingBottom: 5,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 35,
    fontSize: 16 / fontScale,
    color: colors.textColor,
    textAlign: "center",
    fontWeight: "700",
  },
});
