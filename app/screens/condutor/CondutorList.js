import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
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

  const mensajedelete = (id) => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de que quieres eliminar este elemento?",
      [
        {
          text: "Eliminar",
          onPress: () => deleteItem(id),
          style: "destructive",
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
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
      Toast.show({
        type: "error",
        text1: error.response.data,
        position: "bottom",
        visibilityTime: 3000,
      });
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
            <Text style={styles.title}>Condutor: {item.nome}</Text>
            <Card.Divider />
            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Text
                  style={[
                    styles.ativoText,
                    { color: item.ativo ? "green" : "red" },
                  ]}
                >
                  Ativo: {item.ativo ? "Sí" : "No"}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Text>CPF:</Text>
                <Text>{item.cpf}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text>Telefone:</Text>
                <Text>{item.telefone}</Text>
              </View>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => mensajedelete(item.id)}
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
                style={styles.iconContainer}
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
            </View>
          </Card>
        </View>
      ))}
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionContainer: {
    flexDirection: "row-reverse",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  deleteText: {
    marginLeft: 5,
    color: "red",
    fontWeight: "bold",
  },
  putText: {
    marginLeft: 5,
    color: "green",
    fontWeight: "bold",
  },
  ativoText: {
    fontWeight: "bold",
  },
});
