import { StyleSheet, Text, View, SectionList } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { Image } from "expo-image";

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
});
