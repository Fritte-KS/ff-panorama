import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Panorama">;

export default function PanoramaScreen({ navigation }: Props) {
  return (
    <View style={s.container}>
      <Text>Panorama Screen</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
