import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { TabParamList } from "./TabNavigator";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screens/SettingsScreen";

export type RootStackParamList = {
  Home: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerBackTitle: "Back" }}
      />
    </RootStack.Navigator>
  );
}
