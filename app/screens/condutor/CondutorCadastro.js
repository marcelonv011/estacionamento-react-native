import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function CondutorCadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tempoPago, setTempoPago] = useState("");
  const [tempoDesconto, setTempoDesconto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    try {
      const data = {
        nome: nome,
        cpf: cpf,
        telefone: telefone,
        tempoPago: tempoPago,
        tempoDesconto: tempoDesconto,
      };

      if (isFormValid) {
        const response = await axios.post(
          "http://192.168.1.3:8080/api/condutor",
          data
        );
        console.log(response.data);
        navigation.navigate("condutorlist");
        setSuccessMessage("Agregado con éxito");
      }
    } catch (error) {
      console.error(error.response.data);
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
    if (nome && cpf && telefone && tempoPago && tempoDesconto) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <View>
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
      <Toast />
      {successMessage
        ? Toast.show({
            text1: successMessage,
            position: "bottom",
            visibilityTime: 10000,
          })
        : null}
      <Button title="Submit" onPress={postData} disabled={!isFormValid} />
    </View>
  );
}

const styles = StyleSheet.create({
  letra: {
    fontSize: 50,
    marginTop: 0,
  },
});
