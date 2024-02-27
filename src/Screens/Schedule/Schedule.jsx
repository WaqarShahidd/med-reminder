import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Agenda } from "react-native-calendars";
import { colors } from "../../theme/theme";
import { Feather } from "@expo/vector-icons";

const RenderList = ({ item }) => {
  const [showButton, setShowButton] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleButton = () => {
    setShowButton(!showButton);
    Animated.timing(animation, {
      toValue: showButton ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <View style={{}}>
          <Text style={{ marginBottom: 10 }}>{item.name}</Text>
          <Text>{item.time}</Text>
        </View>
        <TouchableOpacity style={styles.checkboxBtn} onPress={toggleButton}>
          {showButton && (
            <View style={styles.checkboxBtnActive}>
              <Feather name="check" size={15} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>
      {showButton && (
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: animation,
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>i took the pill at {item.time}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const Schedule = () => {
  const renderItems = (item) => {
    console.log(item);
    return <RenderList item={item} />;
  };

  return (
    <View style={styles.container}>
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
      <Agenda
        items={{
          "2024-02-21": [
            { name: "Item 1", time: "10:00 AM" },
            { name: "Item 2", time: "2:00 PM" },
          ],
          "2024-02-22": [{ name: "Item 3", time: "9:00 AM" }],
        }}
        renderItem={renderItems}
        style={{}}
      />
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  agenda: {
    flex: 1,
  },
  item: {
    backgroundColor: "#fff",

    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginVertical: 20,
  },
  logoContainer: {
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  },
  checkboxBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxBtnActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
