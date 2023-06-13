import { Text, StyleSheet, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CondutorAtualizar({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tempoPago, setTempoPago] = useState("");
  const [tempoDesconto, setTempoDesconto] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const updateItem = async () => {
    try {
      const updateData = {
        id: id,
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        tempoPago: tempoPago,
        tempoDesconto: tempoDesconto,
      };
      if (isFormValid) {
        await axios.put(
          `http://192.168.1.3:8080/api/condutor?id=${id}`,
          updateData
        );
        // Actualizar la lista después de eliminar el elemento
        setTimeout(() => {
          navigation.navigate("condutorlist");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
    }
  };

  const handleInputChange = (text, field) => {
    // Actualizar el estado de los campos y la bandera de validez
    if (field === "nome") {
      setNome(text);
    } else if (field === "cpf") {
      setCpf(text);
    } else if (field === "telefone") {
      setTelefone(text);
    } else if (field === "tempoPago") {
      setTempoPago(text);
    } else if (field === "tempoDesconto") {
      setTempoDesconto(text);
    }

    // Verificar la validez de todos los campos
    if (nome && cpf && telefone && tempoPago) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <View>
      <Text>Actualizar Condutor ID: {id}</Text>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => handleInputChange(text, "nome")}
      />
      <TextInput
        placeholder="Cpf"
        value={cpf}
        onChangeText={(text) => handleInputChange(text, "cpf")}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => handleInputChange(text, "telefone")}
      />
      <TextInput
        placeholder="Tempopago"
        value={tempoPago}
        onChangeText={(text) => handleInputChange(text, "tempoPago")}
      />
      <TextInput
        placeholder="Tempodesconto"
        value={tempoDesconto}
        onChangeText={(text) => handleInputChange(text, "tempoDesconto")}
      />
      <Button title="Atualizar" onPress={updateItem} disabled={!isFormValid} />
    </View>
  );
}

const styles = StyleSheet.create({});
