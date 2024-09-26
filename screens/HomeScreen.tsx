import { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";

export default function HomeScreen() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [focalLength, setFocalLength] = useState(16);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FF Panorama</Text>
      <Image
        source={require("../assets/images/camera_dark.png")}
        style={[
          styles.cameraImage,
          { transform: [{ rotate: isPortrait ? "270deg" : "0deg" }] },
        ]}
      />
      <View style={styles.switchWrapper}>
        <Text style={styles.switchLabel}>Portrait mode</Text>
        <SwitchToggle
          switchOn={isPortrait}
          onPress={() => setIsPortrait(!isPortrait)}
          circleColorOn="#32D932"
          circleColorOff="#f00"
          backgroundColorOn="#ddd"
          backgroundColorOff="#bbb"
          containerStyle={styles.switchDimension}
          circleStyle={styles.switchCircle}
        />
      </View>
      <View style={styles.focalWrapper}>
        <Text style={styles.focalLabel}>Select focal length</Text>
        <TextInput
          style={styles.focalInput}
          keyboardType="numeric"
          value={String(focalLength)}
          onChangeText={(value) => setFocalLength(parseInt(value, 10))}
          maxLength={2}
        />
      </View>
      <Slider
        style={styles.focalSlider}
        minimumValue={12}
        maximumValue={85}
        step={1}
        value={focalLength}
        onValueChange={(value) => setFocalLength(value)}
        minimumTrackTintColor="#32D932"
        maximumTrackTintColor="#111"
        thumbTintColor="#32D932"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cameraImage: {
    width: 230,
    height: 210,
    marginBottom: 10,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 15,
  },
  switchDimension: {
    width: 70,
    height: 30,
    borderRadius: 15,
    padding: 4,
  },
  switchCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  focalWrapper: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
  },
  focalLabel: {
    fontSize: 18,
    marginRight: 15,
    // marginBottom: 10,
  },
  focalSlider: {
    width: "80%",
    height: 40,
  },
  focalInput: {
    width: 45,
    height: 35,
    fontSize: 18,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 7,
    textAlign: "center",
    // marginTop: 10,
    // marginBottom: 10,
  },
});
