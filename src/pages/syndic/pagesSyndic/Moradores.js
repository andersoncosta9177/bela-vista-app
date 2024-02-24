import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const MoradoresLista = () => {
  const [moradores, setMoradores] = useState([
    { id: '1', nome: 'João Silva', apartamento: '101', telefone: '99999-9999' },
    { id: '2', nome: 'Maria Souza', apartamento: '102', telefone: '99999-8888' },
    { id: '3', nome: 'Pedro Rocha', apartamento: '103', telefone: '99999-7777' },
    // Adicione mais moradores conforme necessário
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Moradores</Text>
      <FlatList
        data={moradores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Nome: {item.nome}</Text>
            <Text style={styles.itemText}>Apartamento: {item.apartamento}</Text>
            <Text style={styles.itemText}>Telefone: {item.telefone}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default MoradoresLista;
