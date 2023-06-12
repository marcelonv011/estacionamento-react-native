import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, TextInput, Text } from "react-native";
import axios from "axios";

export default function CondutorCadastro() {
  const [data, setData] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tempoPago, setTempoPago] = useState("");
  const [tempoDesconto, setTempoDesconto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

      const response = await axios.post(
        "http://192.168.1.3:8080/api/condutor",
        data
      );
      console.log(response.data);
      setSuccessMessage("Agregado con éxito");
    } catch (error) {
      Promise.reject(error.response.data);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />
      <TextInput
        placeholder="Cpf"
        value={cpf}
        onChangeText={(text) => setCpf(text)}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={(text) => setTelefone(text)}
      />
      <TextInput
        placeholder="Tempopago"
        value={tempoPago}
        onChangeText={(text) => setTempoPago(text)}
      />
      <TextInput
        placeholder="Tempodesconto"
        value={tempoDesconto}
        onChangeText={(text) => setTempoDesconto(text)}
      />
      <Button title="Submit" onPress={postData} />
      {successMessage ? <Text>{successMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  letra: {
    fontSize: 50,
    marginTop: 0,
  },
});
