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
      <Text style={s.header}>Awesome features are coming soon!</Text>
      <Text style={s.header}>Stay tuned for epic updates 🚀</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
