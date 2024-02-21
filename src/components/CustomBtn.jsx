import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../theme/theme";

const { fontScale } = Dimensions.get("window");

const CustomBtn = ({ text, primary, onPress, margin }) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: primary ? colors.primary : "#dde5e2",
          marginBottom: margin ? 15 : 0,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={{
          color: primary ? "white" : colors.textColor,
          fontSize: 18 / fontScale,
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
