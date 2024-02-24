import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet, Alert } from 'react-native';

const SolicitacaoItem = ({ solicitacao }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>Problema: {solicitacao.descricao}</Text>
    <Text style={styles.itemText}>Solicitante: {solicitacao.nomeMorador}</Text>
    <Text style={styles.itemText}>Data: {solicitacao.dataHora}</Text>
  </View>
);

const SolicitacoesManutencao = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [nomeMorador, setNomeMorador] = useState('');

  const adicionarSolicitacao = () => {
    const novaSolicitacao = {
      id: Date.now(),
      descricao,
      nomeMorador,
      dataHora: new Date().toLocaleString(),
    };
    setSolicitacoes([...solicitacoes, novaSolicitacao]);
    setDescricao('');
    setNomeMorador('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descrição do Problema"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu Nome"
        value={nomeMorador}
        onChangeText={setNomeMorador}
      />
      <Button
        title="Solicitar Manutenção"
        onPress={adicionarSolicitacao}
      />
      <Text style={styles.title}>Solicitações de Manutenção</Text>
      <FlatList
        data={solicitacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SolicitacaoItem
            solicitacao={item}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SolicitacoesManutencao;
