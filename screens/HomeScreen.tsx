import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import FieldOfView from "../components/FieldOfView";

export default function HomeScreen() {
  const {
    isPortrait,
    setIsPortrait,
    sliderFocal,
    setSliderFocal,
    inputFocal,
    setInputFocal,
  } = useContext(AppContext);

  const defaultFocalLength = 16;

  const handleInputBlur = () => {
    const numericValue = parseInt(inputFocal, 10);

    // Check if the input numericValue is a number and within the range. If not, set the slider and input focal to the default value.
    if (isNaN(numericValue) || numericValue < 12 || numericValue > 85) {
      setSliderFocal(defaultFocalLength);
      setInputFocal(String(defaultFocalLength));
    } else {
      setSliderFocal(numericValue); // If the input is valid, update focalLength.
    }
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.header}>FF Panorama</Text>
      <Image
        source={require("../assets/images/camera_dark.png")}
        style={[
          s.cameraImage,
          { transform: [{ rotate: isPortrait ? "270deg" : "0deg" }] },
        ]}
      />
      <View style={s.switchWrapper}>
        <Text style={s.switchLabel}>Portrait mode</Text>
        <SwitchToggle
          switchOn={isPortrait}
          onPress={() => setIsPortrait(!isPortrait)}
          circleColorOn="#32D932"
          circleColorOff="#f00"
          backgroundColorOn="#ddd"
          backgroundColorOff="#bbb"
          containerStyle={s.switchDimension}
          circleStyle={s.switchCircle}
        />
      </View>

      <View style={s.separatorLine} />

      <View style={s.focalWrapper}>
        <Text style={s.focalLabel}>Select focal length</Text>
        <TextInput
          style={s.focalInput}
          keyboardType="numeric"
          value={inputFocal}
          onChangeText={(value) => setInputFocal(value)}
          onBlur={handleInputBlur}
          maxLength={2}
        />
      </View>
      <Slider
        style={s.focalSlider}
        minimumValue={12}
        maximumValue={85}
        step={1}
        value={sliderFocal}
        onValueChange={(value) => {
          setSliderFocal(value);
          setInputFocal(String(value));
        }}
        minimumTrackTintColor="#32D932"
        maximumTrackTintColor="#111"
        thumbTintColor="#32D932"
      />
      <FieldOfView />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
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
  separatorLine: {
    height: 4,
    borderRadius: 2,
    width: "90%",
    backgroundColor: "#bbb",
    marginVertical: 40,
  },
  focalWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  focalLabel: {
    fontSize: 18,
    marginRight: 15,
  },
  focalInput: {
    width: 45,
    height: 35,
    fontSize: 18,
    borderColor: "#bbb",
    borderWidth: 2,
    borderRadius: 7,
    textAlign: "center",
  },
  focalSlider: {
    width: "80%",
    height: 40,
    marginVertical: 12,
  },
});
