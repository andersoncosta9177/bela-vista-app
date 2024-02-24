import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

const ServicoItem = ({ servico, onDelete, onEdit }) => (
  <View style={styles.servicoItem}>
    <Text style={styles.servicoTexto}>{`${servico.nome} - ${servico.data}`}</Text>
    <Button title="Editar" onPress={() => onEdit(servico)} />
    <Button title="Deletar" onPress={() => onDelete(servico.id)} />
  </View>
);

const RelatorioServicos = () => {
  const [servicos, setServicos] = useState([]);
  const [nomeServico, setNomeServico] = useState('');
  const [dataServico, setDataServico] = useState('');
  const [editandoServico, setEditandoServico] = useState(null);

  const adicionarServico = () => {
    if (editandoServico) {
      const index = servicos.findIndex(s => s.id === editandoServico.id);
      const novosServicos = [...servicos];
      novosServicos[index] = { ...editandoServico, nome: nomeServico, data: dataServico };
      setServicos(novosServicos);
      setEditandoServico(null);
    } else {
      const novoServico = { id: Date.now(), nome: nomeServico, data: dataServico };
      setServicos([...servicos, novoServico]);
    }
    setNomeServico('');
    setDataServico('');
  };

  const deletarServico = (id) => {
    setServicos(servicos.filter(servico => servico.id !== id));
  };

  const editarServico = (servico) => {
    setEditandoServico(servico);
    setNomeServico(servico.nome);
    setDataServico(servico.data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Serviço"
        value={nomeServico}
        onChangeText={setNomeServico}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (DD/MM/AAAA)"
        value={dataServico}
        onChangeText={setDataServico}
      />
      <Button title={editandoServico ? "Salvar Edição" : "Adicionar Serviço"} onPress={adicionarServico} />
      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ServicoItem
            servico={item}
            onDelete={deletarServico}
            onEdit={editarServico}
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
  servicoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  servicoTexto: {
    flex: 1,
  },
});

export default RelatorioServicos;
