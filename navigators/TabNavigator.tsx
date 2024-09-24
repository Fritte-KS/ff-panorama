import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import PanoramaScreen from "../screens/PanoramaScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type TabParamList = {
  Home: undefined;
  Panorama: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: (props) => (
          <MaterialIcons
            style={{ marginRight: 16 }}
            name="settings"
            size={24}
            color={props.tintColor}
            onPress={() => navigation.navigate("Settings")}
          />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Panorama"
        component={PanoramaScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="panorama" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
