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
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Gyroscope } from "expo-sensors";
import { Audio } from "expo-av";
import calculateAngleOfView from "../utils/calculateAngleOfView";

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
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false);
  const [currentAngleZ, setCurrentAngleZ] = useState<number>(0);
  const [subscription, setSubscription] = useState<any>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [lastPlayedAngle, setLastPlayedAngle] = useState<number>(0);
  const { sliderFocal, isPortrait } = useContext(AppContext);

  const toggleGyroscope = () => {
    if (isMeasuring) {
      stopGyroscope();
      setLastPlayedAngle(0);
    } else {
      startGyroscope();
    }
    setIsMeasuring(!isMeasuring);
  };

  const angleOfView = calculateAngleOfView(Number(sliderFocal), isPortrait);
  const nonOverlapAngle: number = angleOfView * 0.7; // 30% image overlap, adjust as needed.

  const startGyroscope = () => {
    let angleSum: number = 0;
    let numberOfPlays: number = 0;
    const gyroThreshold: number = 0.01; // Set the threshold to 0.01 radians.

    Gyroscope.setUpdateInterval(100); // Set the update interval to 100 ms.

    const sub = Gyroscope.addListener(({ z }) => {
      if (Math.abs(z) > gyroThreshold) {
        angleSum += z * 0.1; // Add the z-axis rotation to the sum (0.1 is the sensitivity).
      }

      const angleSumDegrees: number = angleSum * (180 / Math.PI); // Convert radians to degrees.
      setCurrentAngleZ(angleSumDegrees);

      const absAngleSum: number = Math.abs(angleSumDegrees);
      const nextImageAngle: number =
        Math.floor(absAngleSum / nonOverlapAngle) * nonOverlapAngle;

      const maxPlays: number = Math.floor(absAngleSum / nonOverlapAngle);

      if (numberOfPlays < maxPlays) {
        playSound();
        setLastPlayedAngle(nextImageAngle);
        numberOfPlays++;
      }
    });

    setSubscription(sub);
  };

  const stopGyroscope = () => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/level-up.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

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
          <Text style={s.angleText}>{Math.abs(currentAngleZ).toFixed(1)}°</Text>
        </TouchableOpacity>
        <Text style={s.nextPictureText}>
          Next picture at angle: {lastPlayedAngle.toFixed(1)}°
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#D7D7D7",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingTop: 3,
    marginVertical: 5,
  },
  stepText: {
    fontSize: 18,
    marginBottom: 5,
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
    marginTop: 10,
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
  angleText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 3,
    marginTop: 10,
  },
  nextPictureText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
