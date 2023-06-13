import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function CondutorList() {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    listGet();
  }, []);

  const listGet = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.3:8080/api/condutor/lista"
      );
      setData(response.data);
    } catch (error) {
      Promise.reject(error.response.data);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://192.168.1.3:8080/api/condutor?id=${id}`);

      Toast.show({
        type: "success",
        text1: "excluido com sucesso",
        position: "bottom",
        visibilityTime: 3000,
      });
      // Actualizar la lista después de eliminar el elemento
      setTimeout(() => {
        listGet();
      }, 2000);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const updateItem = (id) => {
    navigation.navigate("condutoratualizar", { id });
  };

  //actualiza una vez que hace el post
  useFocusEffect(
    React.useCallback(() => {
      listGet();
    }, [])
  );

  return (
    <ScrollView>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("condutorcadastro")}
      >
        <Text style={styles.text}>adicionar um condutor</Text>
      </Pressable>
      {data.map((item) => (
        <View key={item.id} style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Title>Condutor: {item.nome}</Card.Title>
            <Card.Divider />
            <Text>CPF: {item.cpf}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Tempo pago: {item.tempoPago}</Text>
            <Text>
              Tempo desconto: {item.tempoDesconto}
              {"\n"}{" "}
            </Text>
            <TouchableOpacity
              style={styles.deleteContainer}
              onPress={() => deleteItem(item.id)}
            >
              <Icon
                type="material-community"
                name="delete-outline"
                color="red"
                size={15}
              />
              <Text style={styles.deleteText}>EXCLUIR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.putContainer}
              onPress={() => updateItem(item.id)}
            >
              <Icon
                type="material-community"
                name="update"
                color="green"
                size={15}
              />
              <Text style={styles.putText}>ATUALIZAR</Text>
            </TouchableOpacity>
          </Card>
          <Toast />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  letra: {
    fontSize: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    marginTop: 40,
    height: 50,
    width: 300,
    marginLeft: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  cardContainer: {
    marginVertical: 8,
  },
  card: {
    padding: 16,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  deleteContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginTop: 60,
  },
  deleteText: {
    color: "red",
  },
  putContainer: {
    position: "absolute",
    top: 0,
    right: -7,
    marginTop: 100,
  },
  putText: {
    color: "green",
  },
});
