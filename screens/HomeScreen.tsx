import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import FieldOfView from "../components/FieldOfView";
import { AppContext } from "../context/AppContext";

export default function HomeScreen() {
  const { isPortrait, setIsPortrait, sliderFocal, setSliderFocal } =
    useContext(AppContext);

  const defaultFocalLength = "16";

  const handleInputBlur = () => {
    const numericValue = Number(sliderFocal);

    // Check if the input numericValue is a number and within the range. If not, set the slider focal to the default value.
    if (isNaN(numericValue) || numericValue < 12 || numericValue > 85) {
      setSliderFocal(defaultFocalLength);
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
          value={sliderFocal}
          onChangeText={(value) => setSliderFocal(value)}
          onBlur={handleInputBlur}
          maxLength={2}
        />
      </View>
      <FieldOfView />
      <Slider
        style={s.focalSlider}
        minimumValue={12}
        maximumValue={85}
        step={1}
        value={Number(sliderFocal)}
        onValueChange={(value) => {
          setSliderFocal(value.toString());
        }}
        minimumTrackTintColor="#32D932"
        maximumTrackTintColor="#bbb"
        thumbTintColor="#32D932"
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
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
    height: 15,
  },
});
