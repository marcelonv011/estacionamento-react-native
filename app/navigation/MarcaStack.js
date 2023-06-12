import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarcaList from "../screens/marca/MarcaList";

const Stack = createNativeStackNavigator();

export default function MarcaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="marcalist"
        component={MarcaList}
        options={{ title: "Marca" }}
      />
    </Stack.Navigator>
  );
}
