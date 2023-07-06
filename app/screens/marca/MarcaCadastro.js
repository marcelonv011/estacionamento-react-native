import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "@rneui/themed";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function MarcaCadastro() {
  const [nome, setNome] = useState("");
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    postData();
  }, []);

  const postData = async () => {
    try {
      const data = {
        nome: nome,
      };

      if (isFormValid) {
        const response = await axios.post(
          "http://192.168.1.3:8080/api/marca",
          data
        );
        console.log(response.data);
        Toast.show({
          type: "success",
          text1: response.data,
          position: "bottom",
          visibilityTime: 3000,
        });
        setTimeout(() => {
          navigation.navigate("marcalist");
        }, 2000);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response.data,
        position: "bottom",
        visibilityTime: 3000,
      });
    }
  };

  const handleInputChange = (text, field) => {
    // Actualizar el estado de los campos y la bandera de validez
    if (field === "nome") {
      setNome(text);
    }

    // Verificar la validez de todos los campos
    if (nome) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Nome</Text>
      <Input
        placeholder=""
        value={nome}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        onChangeText={(text) => handleInputChange(text, "nome")}
      />
      <Toast />
      <Button
        title="Registrar"
        buttonStyle={styles.buttonStyle}
        onPress={postData}
        disabled={!isFormValid}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 0,
    borderRadius: 20,
    paddingHorizontal: 40,
    width: "65%",
    alignSelf: "center",
  },
  inputText: {
    textAlign: "center",
  },
  buttonContainer: {
    height: 40,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: "#0e7d0f",
  },
  buttonText: {
    color: "white",
    marginHorizontal: 20,
  },
});
