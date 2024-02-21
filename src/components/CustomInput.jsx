import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

export const CustomInput = ({
  value,
  setValue,
  placeholder,
  Icon,
  iconName,
  margin,
}) => {
  return (
    <View style={[styles.textInputContainer, { marginTop: margin ? 15 : 0 }]}>
      <Icon name={iconName} size={24} color={colors.primary} />

      <TextInput
        value={value}
        onChangeText={(r) => setValue(r)}
        placeholder={placeholder}
        style={{ width: "85%", marginLeft: 10 }}
      />
    </View>
  );
};

export const CustomPasswordInput = ({ placeholder, value, setValue }) => {
  const [security, setSecurity] = useState(true);

  return (
    <View style={[styles.textInputContainer, { marginTop: 15 }]}>
      <Feather name="lock" size={24} color={colors.primary} />
      <TextInput
        placeholder={placeholder}
        value={value}
        textContentType="username"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={security}
        onChangeText={(r) => setValue(r)}
        style={{ width: "75%", marginLeft: 10 }}
      />
      <TouchableOpacity
        onPress={() => setSecurity(!security)}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#6ABFA5", fontWeight: "400", fontSize: 14 }}>
          Show
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
