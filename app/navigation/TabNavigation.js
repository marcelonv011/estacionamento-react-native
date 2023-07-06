import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CondutorStack from "./CondutorStack";
import MarcaStack from "./MarcaStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="condutorStack"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="condutorStack"
          component={CondutorStack}
          options={{ title: "Condutor", headerShown: false }}
        />
        <Tab.Screen
          name="marcaStack"
          component={MarcaStack}
          options={{ title: "Marca", headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconName;

  switch (route.name) {
    case "condutorStack":
      iconName = "card-account-details-outline";
      break;
    case "marcaStack":
      iconName = "watermark";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
