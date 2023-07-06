import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarcaList from "../screens/marca/MarcaList";
import MarcaCadastro from "../screens/marca/MarcaCadastro";
import MarcaAtualizar from "../screens/marca/MarcaAtualizar";

const Stack = createNativeStackNavigator();

export default function MarcaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="marcalist"
        component={MarcaList}
        options={{ title: "Marca" }}
      />
      <Stack.Screen
        name="marcacadastro"
        component={MarcaCadastro}
        options={{ title: "Registrar Marca" }}
      />
      <Stack.Screen
        name="marcaatualizar"
        component={MarcaAtualizar}
        options={{ title: "Atualizar Marca" }}
      />
    </Stack.Navigator>
  );
}
