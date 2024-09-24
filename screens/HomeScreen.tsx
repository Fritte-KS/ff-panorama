import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { Image } from "expo-image";

export default function HomeScreen() {
  const [isPortrait, setIsPortrait] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FF Panorama</Text>
      <Image
        source={require("../assets/images/camera_outline.png")}
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
          containerStyle={styles.switchContainer}
          circleStyle={styles.switchCircle}
        />
      </View>
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
  },
  switchLabel: {
    fontSize: 18,
    marginRight: 15,
  },
  switchContainer: {
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
});
