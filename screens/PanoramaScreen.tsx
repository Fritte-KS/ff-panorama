import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { Image } from "expo-image";
import { useState, useEffect } from "react";
import { Gyroscope } from "expo-sensors";

type Props = NativeStackScreenProps<RootStackParamList, "Panorama">;

const steps = [
  {
    title: "Steps to follow",
    data: [
      "Align the camera",
      "Take the first picture",
      "Tap GO to measure angle change",
      "Take a new picture when notified",
      "Continue sequence as needed",
      "Tap STOP when done",
    ],
  },
];

export default function PanoramaScreen({ navigation }: Props) {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [currentRotationZ, setCurrentRotationZ] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);

  const toggleGyroscope = () => {
    if (isMeasuring) {
      stopGyroscope();
    } else {
      startGyroscope();
    }
    setIsMeasuring(!isMeasuring);
  };

  const startGyroscope = () => {
    let angleSum = 0; // Initialize angle sum.

    const sub = Gyroscope.addListener(({ z }) => {
      angleSum += z * 0.01; // Add the z-axis rotation to the sum (0.01 is the sampling interval/sensitivity).
      setCurrentRotationZ(angleSum * (180 / Math.PI)); // Convert radians to degrees.
    });

    setSubscription(sub);
  };

  const stopGyroscope = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  useEffect(() => {
    return () => {
      stopGyroscope();
    };
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.header}>Let's create a panorama</Text>
      <Image
        source={require("../assets/images/panorama.png")}
        style={s.panoramaImage}
      />
      <SectionList
        sections={steps}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={s.item}>
            <Text style={s.stepText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={s.stepHeader}>{title}</Text>
        )}
      />
      <View style={s.buttonWrapper}>
        <TouchableOpacity
          style={[s.button, isMeasuring ? s.stopButton : s.goButton]}
          onPress={toggleGyroscope}
        >
          <Text style={s.buttonText}>{isMeasuring ? "STOP" : "GO"}</Text>
          <Text style={s.rotationText}>
            {Math.abs(currentRotationZ).toFixed(1)}°
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
    marginBottom: 15,
  },
  panoramaImage: {
    width: 350,
    height: 175,
    marginBottom: 15,
    borderRadius: 5,
  },
  stepHeader: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 8,
    // marginTop: 10,
    // textAlign: "center",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#D7D7D7",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingTop: 3,
    // paddingBottom: 0,
    marginVertical: 4,
  },
  stepText: {
    fontSize: 18,
    marginBottom: 5,
    // textAlign: "center",
  },
  buttonWrapper: {
    alignItems: "center",
    marginBottom: 15,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#bbb",
    borderWidth: 3,
  },
  goButton: {
    backgroundColor: "#11b932",
  },
  stopButton: {
    backgroundColor: "orange",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  rotationText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 3,
    marginTop: 10,
  },
});
