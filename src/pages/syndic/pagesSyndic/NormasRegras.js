import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert } from 'react-native';

const RegraItem = ({ regra, onEdit }) => (
  <View style={styles.regraItem}>
    <Text style={styles.regraTitulo}>{regra.titulo}</Text>
    {regra.subitens.map((subitem, index) => (
      <Text key={index} style={styles.regraSubitem}>{`- ${subitem}`}</Text>
    ))}
    <Button title="Editar" onPress={() => onEdit(regra)} />
  </View>
);

const NormasCondominio = () => {
  const [normas, setNormas] = useState([]);
  const [tituloRegra, setTituloRegra] = useState('');
  const [subitem, setSubitem] = useState('');
  const [editandoRegra, setEditandoRegra] = useState(null);

  const adicionarOuEditarRegra = () => {
    if (editandoRegra) {
      // Editar regra existente
      const novasNormas = normas.map((regra) => {
        if (regra.id === editandoRegra.id) {
          return { ...regra, titulo: tituloRegra, subitens: [...regra.subitens, subitem] };
        }
        return regra;
      });
      setNormas(novasNormas);
    } else {
      // Adicionar nova regra
      const novaRegra = { id: Date.now(), titulo: tituloRegra, subitens: [subitem] };
      setNormas([...normas, novaRegra]);
    }
    setTituloRegra('');
    setSubitem('');
    setEditandoRegra(null);
  };

  const editarRegra = (regra) => {
    setEditandoRegra(regra);
    setTituloRegra(regra.titulo);
    // Não preenchemos subitem aqui pois é adicionado individualmente
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título da Regra"
        value={tituloRegra}
        onChangeText={setTituloRegra}
      />
      <TextInput
        style={styles.input}
        placeholder="Subitem da Regra"
        value={subitem}
        onChangeText={setSubitem}
      />
      <Button
        title={editandoRegra ? "Salvar Edição" : "Adicionar Regra"}
        onPress={adicionarOuEditarRegra}
      />
      <FlatList
        data={normas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RegraItem
            regra={item}
            onEdit={editarRegra}
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
  regraItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  regraTitulo: {
    fontWeight: 'bold',
  },
  regraSubitem: {
    marginLeft: 10,
  },
});

export default NormasCondominio;
