import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CondutorList from "../screens/condutor/CondutorList";
import CondutorCadastro from "../screens/condutor/CondutorCadastro";
import CondutorDetalle from "../screens/condutor/CondutorAtualizar";
import CondutorAtualizar from "../screens/condutor/CondutorAtualizar";

const Stack = createNativeStackNavigator();

export default function CondutorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="condutorlist"
        component={CondutorList}
        options={{ title: "Condutor" }}
      />
      <Stack.Screen
        name="condutorcadastro"
        component={CondutorCadastro}
        options={{ title: "cadastrar condutor" }}
      />
      <Stack.Screen
        name="condutoratualizar"
        component={CondutorAtualizar}
        options={{ title: "atualizar condutor" }}
      />
    </Stack.Navigator>
  );
}
