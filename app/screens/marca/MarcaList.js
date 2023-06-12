import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MarcaList() {
  return (
    <View style={styles.container}>
      <Text style={styles.letra}>marca</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  letra: {
    fontSize: 50,
    marginTop: 0,
  },
});
