import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

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
      <Text style={styles.letra}>Consumiendo api</Text>
      {data.map((item) => (
        <View key={item.id}>
          <Text>{item.nome}</Text>
          <Text>{item.telefone}</Text>
          <Text>{item.tempoPago}</Text>
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
});
