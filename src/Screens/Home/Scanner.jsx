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

const Scanner = () => {
  const navigation = useNavigation();
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      setResult(await MlkitOcr.detectFromUri(result.assets[0].uri));
    }
  };

  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const clickPicture = async () => {
    const data = await camera.takePictureAsync();

    setResult(await MlkitOcr.detectFromUri(data.uri));
    setCapturedImage(data.uri);
  };

  const [camera, setCamera] = useState(null);

  const nameRegex = /Name:\s*([^:\n]+)(?![^\n]*:)/i;
  const ageRegex = /Age:\s*([^\n]+)/i;
  const genderRegex = /Gender:\s*([^:\n]+)(?=\s*Medicine:|$)/i;
  const medicineRegex = /Medicine:\s*([^:\n].+)/i;
  const whenToTakeRegex = /When to take:\s*([^\n]+)/i;
  const quantityRegex = /Quantity:\s*([^\n]+)/i;
  const timesPerDayRegex = /Times per day:\s*(\d+)/i;

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setpatientGender] = useState("");
  const [drugName, setdrugName] = useState("");
  const [drugQuantity, setdrugQuantity] = useState("");
  const [times, settimes] = useState("");
  const [when, setwhen] = useState("");

  return (
    <View style={styles.container}>
      {result ? (
        <>
          {/* {capturedImage && (
            <Image
              source={{ uri: capturedImage }}
              style={{ width: 100, height: 100 }}
            />
          )} */}
          {!!result?.length && (
            <ScrollView
              contentContainerStyle={{
                alignItems: "stretch",
                padding: 20,
              }}
              showsVerticalScrollIndicator
              style={styles.scroll}
            >
              {result?.map((block, index) => {
                const text = block.lines.map((line) => line.text).join(" ");

                const nameMatch = text.match(nameRegex);
                const ageMatch = text.match(ageRegex);
                const genderMatch = text.match(genderRegex);
                const medicineMatch = text.match(medicineRegex);
                const whenToTakeMatch = text.match(whenToTakeRegex);
                const quantityMatch = text.match(quantityRegex);
                const timesPerDayMatch = text.match(timesPerDayRegex);

                const name = nameMatch ? nameMatch[1] : "";
                const age = ageMatch ? parseInt(ageMatch[1]) : "";
                const gender = genderMatch ? genderMatch[1] : "";
                const medicine = medicineMatch ? medicineMatch[1] : "";
                const whenToTake = whenToTakeMatch ? whenToTakeMatch[1] : "";
                const quantity = quantityMatch
                  ? parseInt(quantityMatch[1])
                  : null;
                const timesPerDay = timesPerDayMatch
                  ? parseInt(timesPerDayMatch[1])
                  : null;

                if (name || medicine || whenToTake) {
                  return (
                    <View key={index}>
                      {name && (
                        <>
                          <Text style={styles.labelText}>Name</Text>
                          <View style={styles.infoBox}>
                            <TextInput
                              style={styles.infoText}
                              defaultValue={name}
                              value={patientName ? patientName : name}
                              onChangeText={(t) => setPatientName(t)}
                            />
                          </View>
                        </>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {age && (
                          <View
                            style={{ flexDirection: "column", width: "45%" }}
                          >
                            <Text style={styles.labelText}>Age</Text>
                            <View style={styles.infoBox}>
                              <TextInput
                                style={styles.infoText}
                                defaultValue={age.toString()}
                                value={patientAge ? patientAge : age}
                                onChangeText={(t) => setPatientAge(t)}
                              />
                            </View>
                          </View>
                        )}
                        {gender && (
                          <View
                            style={{ flexDirection: "column", width: "45%" }}
                          >
                            <Text style={styles.labelText}>Gender</Text>
                            <View style={styles.infoBox}>
                              <TextInput
                                style={styles.infoText}
                                defaultValue={gender}
                                value={patientGender ? patientGender : gender}
                                onChangeText={(t) => setpatientGender(t)}
                              />
                            </View>
                          </View>
                        )}
                      </View>

                      {medicine && (
                        <>
                          <Text style={styles.labelText}>Drug Name</Text>
                          <View style={styles.infoBox}>
                            <TextInput
                              style={styles.infoText}
                              defaultValue={medicine}
                              value={drugName ? drugName : medicine}
                              onChangeText={(t) => setdrugName(t)}
                            />
                          </View>
                        </>
                      )}

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {quantity && (
                          <View
                            style={{ flexDirection: "column", width: "45%" }}
                          >
                            <Text style={styles.labelText}>Drug Quantity</Text>
                            <View style={styles.infoBox}>
                              <TextInput
                                style={styles.infoText}
                                defaultValue={quantity.toString()}
                                value={drugQuantity ? drugQuantity : quantity}
                                onChangeText={(t) => setdrugQuantity(t)}
                              />
                            </View>
                          </View>
                        )}
                        {timesPerDay && (
                          <View
                            style={{ flexDirection: "column", width: "45%" }}
                          >
                            <Text style={styles.labelText}>Times per day</Text>
                            <View style={styles.infoBox}>
                              <TextInput
                                style={styles.infoText}
                                defaultValue={timesPerDay.toString()}
                                value={times ? times : timesPerDay}
                                onChangeText={(t) => settimes(t)}
                              />
                            </View>
                          </View>
                        )}
                      </View>

                      {whenToTake && (
                        <>
                          <Text style={styles.labelText}>When to take</Text>
                          <View style={styles.infoBox}>
                            <TextInput
                              style={styles.infoText}
                              defaultValue={whenToTake}
                              value={when ? when : whenToTake}
                              onChangeText={(text) => setwhen(text)}
                            />
                          </View>
                        </>
                      )}
                    </View>
                  );
                } else {
                  return null;
                }
              })}
              <View style={{ justifyContent: "flex-end" }}>
                <CustomBtn
                  text="Save"
                  primary
                  margin
                  onPress={() => navigation.navigate("Schedule")}
                />
                <CustomBtn
                  text="Try again"
                  onPress={() => {
                    setResult(null);
                    setCapturedImage(null);
                  }}
                />
              </View>
            </ScrollView>
          )}
        </>
      ) : (
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
      )}
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
  },
  labelText: {
    fontWeight: "700",
    marginLeft: 5,
    marginBottom: 5,
  },
});
