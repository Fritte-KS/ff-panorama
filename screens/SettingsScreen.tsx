import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigators/TabNavigator";

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, "Settings">,
  BottomTabScreenProps<TabParamList>
> & {
  navigation: {
    navigate: (screen: "Panorama") => void;
  };
};

export default function SettingsScreen(props: Props) {
  return (
    <View style={s.container}>
      <Text>Settings Screen</Text>
      <TouchableOpacity
        style={s.button}
        onPress={() => props.navigation.navigate("Panorama")}
      >
        <Text style={s.buttonText}>Back to Panorama</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
