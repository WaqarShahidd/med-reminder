import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import MlkitOcr, { MlkitOcrResult } from "react-native-mlkit-ocr";
import CustomBtn from "../../components/CustomBtn";
import { CustomInput } from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../constants/config";
import moment from "moment";
import { useUser } from "../../constants/context";
import Spinner from "react-native-loading-spinner-overlay";

const Scanner = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const clickPicture = async () => {
    setloading(true);
    const data = await camera.takePictureAsync();

    try {
      const ocrResult = await MlkitOcr.detectFromUri(data.uri);
      setResult(ocrResult);
      setCapturedImage(data.uri);
    } catch (error) {
      console.error("Error processing image:", error);
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState([]);
  const [camera, setCamera] = useState(null);

  const medicineRegex = /Medicine:\s*([^:\n].+)/i;
  const whenToTakeRegex = /When to take:\s*([^\n]+)/i;
  const quantityRegex = /Quantity:\s*([^\n]+)/i;
  const fromDateRegex = /From: (\d{2}\/\d{2}\/\d{4})/;
  const toDateRegex = /To: (\d{2}\/\d{2}\/\d{4})/;

  const [drugName, setdrugName] = useState("");
  const [drugQuantity, setdrugQuantity] = useState("");
  const [when, setwhen] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [message, setmessage] = useState("");

  const currentDate = moment().format("YYYY-MM-DD");

  const { userData } = useUser();

  const [loading, setloading] = useState("");

  const AddDrug = async () => {
    console.log(medicineData);
    setloading(true);
    await axios
      .post(`${BASE_URL}/api/client/createDrugInfo`, {
        userId: userData?.id,
        drugName: drugName,
        drugQuantity: drugQuantity,
        whenToTake: when,
        message: message,
        start_date: currentDate,
        end_date: currentDate,
        isMorning: when?.toLowerCase().includes("morning") ? true : false,
        isAfternoon: when?.toLowerCase().includes("afternoon") ? true : false,
        isNight: when?.toLowerCase().includes("evening") ? true : false,
      })
      .then((res) => {
        setloading(false);
        navigation.navigate("Schedule");
        console.log(res.data.message);
      })
      .catch((error) => {
        setloading(false);
        console.log(error.response.data.message);
      });
  };

  // const updateStateFromResult = () => {
  //   result.forEach((block) => {
  //     const text = block.lines.map((line) => line.text.trim()).join("\n");

  //     const medicineMatch = text.match(medicineRegex);
  //     const whenToTakeMatch = text.match(whenToTakeRegex);
  //     const quantityMatch = text.match(quantityRegex);
  //     const fromDateMatch = text.match(fromDateRegex);
  //     const toDateMatch = text.match(toDateRegex);

  //     const medicine = medicineMatch ? medicineMatch[1] : null;
  //     const whenToTake = whenToTakeMatch ? whenToTakeMatch[1] : null;
  //     const quantity = quantityMatch ? parseInt(quantityMatch[1]) : null;
  //     const fromDate = fromDateMatch ? fromDateMatch[1] : null;
  //     const toDate = toDateMatch ? toDateMatch[1] : null;

  //     if (medicine !== null) setdrugName(medicine);
  //     if (whenToTake !== null) setwhen(whenToTake);
  //     if (quantity !== null) setdrugQuantity(quantity.toString());
  //     if (fromDate !== null) setFrom(fromDate);
  //     if (toDate !== null) setTo(toDate);
  //   });
  // };

  const [medicineData, setMedicineData] = useState([]);

  const updateStateFromResult = () => {
    const extractedData = [];

    result.forEach((block) => {
      const text = block.lines.map((line) => line.text.trim()).join("\n");

      console.log(text);

      const medicineMatch = text.match(medicineRegex);
      const whenToTakeMatch = text.match(whenToTakeRegex);
      const quantityMatch = text.match(quantityRegex);
      const fromDateMatch = text.match(fromDateRegex);
      const toDateMatch = text.match(toDateRegex);

      const medicine = medicineMatch ? medicineMatch[1] : null;
      const whenToTake = whenToTakeMatch ? whenToTakeMatch[1] : null;
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : null;
      const fromDate = fromDateMatch ? fromDateMatch[1] : null;
      const toDate = toDateMatch ? toDateMatch[1] : null;

      if (medicine !== null) {
        extractedData.push({
          userId: userData?.id,
          medicine: medicine,
          whenToTake: whenToTake,
          quantity: quantity,
          fromDate: fromDate,
          toDate: toDate,
          isMorning: whenToTake?.toLowerCase().includes("morning")
            ? true
            : false,
          isAfternoon: whenToTake?.toLowerCase().includes("afternoon")
            ? true
            : false,
          isNight: whenToTake?.toLowerCase().includes("evening") ? true : false,
        });
      }
    });

    setMedicineData(extractedData);
  };

  useEffect(() => {
    updateStateFromResult();
  }, [result]);

  const handleMedicineChange = (text, index) => {
    setMedicineData((prevMedicineData) => {
      const updatedMedicineData = [...prevMedicineData];
      updatedMedicineData[index] = {
        ...updatedMedicineData[index],
        medicine: text,
      };
      return updatedMedicineData;
    });
  };

  const handleWhenChange = (text, index) => {
    setMedicineData((prevMedicineData) => {
      const updatedMedicineData = [...prevMedicineData];
      updatedMedicineData[index] = {
        ...updatedMedicineData[index],
        whenToTake: text,
      };
      return updatedMedicineData;
    });
  };

  const handleQuantityChange = (text, index) => {
    setMedicineData((prevMedicineData) => {
      const updatedMedicineData = [...prevMedicineData];
      updatedMedicineData[index] = {
        ...updatedMedicineData[index],
        quantity: text,
      };
      return updatedMedicineData;
    });
  };

  const handleFromDateChange = (text, index) => {
    setMedicineData((prevMedicineData) => {
      const updatedMedicineData = [...prevMedicineData];
      updatedMedicineData[index] = {
        ...updatedMedicineData[index],
        fromDate: text,
      };
      return updatedMedicineData;
    });
  };

  const handleToDateChange = (text, index) => {
    setMedicineData((prevMedicineData) => {
      const updatedMedicineData = [...prevMedicineData];
      updatedMedicineData[index] = {
        ...updatedMedicineData[index],
        toDate: text,
      };
      return updatedMedicineData;
    });
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />

      {!!result?.length && (
        <ScrollView
          contentContainerStyle={{
            alignItems: "stretch",
            padding: 20,
          }}
          showsVerticalScrollIndicator
          style={styles.scroll}
        >
          {/* {result?.map((block, index) => {
            const text = block.lines.map((line) => line.text.trim()).join("\n");

            const medicineMatch = text.match(medicineRegex);
            const whenToTakeMatch = text.match(whenToTakeRegex);
            const quantityMatch = text.match(quantityRegex);
            const fromDateMatch = text.match(fromDateRegex);
            const toDateMatch = text.match(toDateRegex);

            const medicine = medicineMatch ? medicineMatch[1] : null;
            const whenToTake = whenToTakeMatch ? whenToTakeMatch[1] : null;
            const quantity = quantityMatch ? parseInt(quantityMatch[1]) : null;
            const fromDate = fromDateMatch ? fromDateMatch[1] : null;
            const toDate = toDateMatch ? toDateMatch[1] : null;

            return (
            );
          })} */}
          {capturedImage && (
            <Image
              source={{ uri: capturedImage }}
              style={{
                height: 300,
                marginVertical: 20,
                borderRadius: 12,
                objectFit: "contain",
              }}
            />
          )}
          <View>
            {medicineData.map((medicine, index) => (
              <View key={index}>
                <Text style={styles.labelText}>Drug Name {index + 1}</Text>
                <View style={styles.infoBox}>
                  <TextInput
                    style={styles.infoText}
                    value={medicine.medicine}
                    onChangeText={(t) => handleMedicineChange(t, index)}
                  />
                </View>

                <Text style={styles.labelText}>When to take</Text>
                <View style={styles.infoBox}>
                  <TextInput
                    style={styles.infoText}
                    value={medicine.whenToTake}
                    onChangeText={(text) => handleWhenChange(text, index)}
                  />
                </View>

                <Text style={styles.labelText}>Drug Quantity</Text>
                <View style={styles.infoBox}>
                  <TextInput
                    style={styles.infoText}
                    value={medicine?.quantity?.toString()}
                    onChangeText={(t) => handleQuantityChange(t, index)}
                  />
                </View>

                <Text style={styles.labelText}>From Date</Text>
                <View style={styles.infoBox}>
                  <TextInput
                    style={styles.infoText}
                    value={medicine.fromDate}
                    onChangeText={(text) => handleFromDateChange(text, index)}
                  />
                </View>

                <Text style={styles.labelText}>To Date</Text>
                <View style={styles.infoBox}>
                  <TextInput
                    style={styles.infoText}
                    value={medicine.toDate}
                    onChangeText={(text) => handleToDateChange(text, index)}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={{ justifyContent: "flex-end" }}>
            <CustomBtn text="Save" primary margin onPress={AddDrug} />
            <CustomBtn
              text="Try again"
              onPress={() => {
                setResult([]);
                setCapturedImage(null);
              }}
            />
          </View>
        </ScrollView>
      )}

      {!result ||
        (result.length === 0 && (
          <>
            <Camera
              type={CameraType.back}
              style={{
                flex: 1,
                width: "100%",
                height: null,
              }}
              ref={(e) => setCamera(e)}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "90%",
                margin: 20,
              }}
            >
              <CustomBtn text="Capture" primary margin onPress={clickPicture} />
            </View>
          </>
        ))}
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
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
    color: "#000",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  scroll: {
    flex: 1,
    marginTop: 20,
    width: "100%",
  },
  infoBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
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
    marginBottom: 20,
  },
  infoText: {
    color: "black",
    fontWeight: "400",
    fontSize: 16,
    width: "100%",
  },
  labelText: {
    fontWeight: "700",
    marginLeft: 5,
    marginBottom: 5,
  },
});
