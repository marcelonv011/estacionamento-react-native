import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CondutorStack from "./CondutorStack";
import MarcaStack from "./MarcaStack";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
