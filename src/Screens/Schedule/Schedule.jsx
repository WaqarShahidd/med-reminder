import {
  Alert,
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Agenda } from "react-native-calendars";
import { colors } from "../../theme/theme";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useUser } from "../../constants/context";
import { BASE_URL } from "../../constants/config";
import Spinner from "react-native-loading-spinner-overlay";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const RenderList = ({ item, ChangeStatus }) => {
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
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <View style={{}}>
          <Text>
            <Text style={{ fontWeight: "700" }}>Drug: </Text>{" "}
            {item?.client_drug_info?.drugName}
          </Text>
          <Text style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "700" }}>When to take: </Text>{" "}
            {item?.client_drug_info?.whenToTake}
          </Text>
          <Text>
            <Text style={{ fontWeight: "700" }}>Quantity: </Text>{" "}
            {item?.client_drug_info?.drugQuantity}
          </Text>
        </View>
        {item?.status === "pending" && (
          <TouchableOpacity style={styles.checkboxBtn} onPress={toggleButton}>
            {showButton && (
              <View style={styles.checkboxBtnActive}>
                <Feather name="check" size={15} color="white" />
              </View>
            )}
          </TouchableOpacity>
        )}
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
          {item?.status === "pending" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Alert.alert(
                  "Confirmation",
                  "Are you sure you want to mark the pill as taken?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        ChangeStatus(item.id);
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Text style={styles.btnText}>i took the pill</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      )}
    </View>
  );
};

const Schedule = () => {
  const { userData } = useUser();

  const [medicineSchedule, setMedicineSchedule] = useState([]);
  const [loading, setloading] = useState(false);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Allow notifications to receive updates.");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      UpdateUser(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const GetMedicineSchedule = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("Getting medicine schedule", JSON.parse(userId), userData.id);
    setloading(true);

    await axios
      .get(`${BASE_URL}/api/client/getAllDrugInfo?userId=${userData.id}`)
      .then((res) => {
        setloading(false);
        console.log(res.data.clientDrugData.length);
        setMedicineSchedule(res.data.clientDrugData);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response.data.message);
      });
  };

  const ChangeStatus = async (id) => {
    console.log("Changing status", id);
    setloading(true);
    await axios
      .post(`${BASE_URL}/api/client/updateStatusOfDrugSchedule`, {
        id: id,
        status: "taken",
      })
      .then((res) => {
        setloading(false);
        console.log(res.data.message);
        GetMedicineSchedule();
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response);
      });
  };

  const UpdateUser = async (token) => {
    console.log("Adding Token", token);

    await axios
      .post(`${BASE_URL}/api/user/updateUser`, {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        mobile: userData?.mobile,
        email: userData?.email,
        age: userData?.age,
        expoPushToken: token,
        userId: userData?.id,
      })
      .then((res) => {
        console.log(res.data, "Token added");
      })
      .catch((error) => {
        console.log(error.response.data.message, "Token not added");
      });
  };

  useEffect(() => {
    GetMedicineSchedule();
    registerForPushNotificationsAsync();
  }, []);

  const renderItems = (item) => {
    return <RenderList item={item} ChangeStatus={ChangeStatus} />;
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

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
        items={medicineSchedule}
        renderItem={renderItems}
        renderEmptyData={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <Text>No reminder for today.</Text>
          </View>
        )}
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
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 9,
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
