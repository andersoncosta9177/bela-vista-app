import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

const OcorrenciaItem = ({ ocorrencia, onResponder }) => (
  <View style={styles.ocorrenciaItem}>
    <Text style={styles.ocorrenciaTitulo}>{ocorrencia.titulo}</Text>
    <Text>{ocorrencia.descricao}</Text>
    <Text style={styles.ocorrenciaData}>{ocorrencia.data}</Text>
    {ocorrencia.resposta && (
      <>
        <Text style={styles.respostaTitulo}>Resposta do Síndico:</Text>
        <Text>{ocorrencia.resposta}</Text>
      </>
    )}
    {!ocorrencia.resposta && (
      <Button title="Responder" onPress={() => onResponder(ocorrencia.id)} />
    )}
  </View>
);

const VisualizarOcorrencias = () => {
  // Inicializando com dados estáticos para demonstração
  const [ocorrencias, setOcorrencias] = useState([
    {
      id: '1',
      titulo: 'Barulho após as 22h',
      descricao: 'Música alta vindo do apartamento 101.',
      data: '2024-02-15',
      resposta: null,
    },
    {
      id: '2',
      titulo: 'Vazamento na garagem',
      descricao: 'Observado vazamento próximo ao estacionamento 5.',
      data: '2024-02-16',
      resposta: 'A manutenção será realizada em 20/02/2024.',
    },
  ]);
  const [resposta, setResposta] = useState('');
  const [ocorrenciaParaResponder, setOcorrenciaParaResponder] = useState(null);

  const responderOcorrencia = (id) => {
    const novasOcorrencias = ocorrencias.map((ocorrencia) => {
      if (ocorrencia.id === id) {
        return { ...ocorrencia, resposta };
      }
      return ocorrencia;
    });
    setOcorrencias(novasOcorrencias);
    setResposta('');
    setOcorrenciaParaResponder(null);
  };

  const escolherOcorrenciaParaResponder = (id) => {
    const ocorrencia = ocorrencias.find((o) => o.id === id);
    if (ocorrencia) {
      setOcorrenciaParaResponder(ocorrencia);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ocorrencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OcorrenciaItem
            ocorrencia={item}
            onResponder={escolherOcorrenciaParaResponder}
          />
        )}
      />
      {ocorrenciaParaResponder && (
        <View style={styles.respostaContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escreva sua resposta aqui..."
            multiline
            numberOfLines={4}
            onChangeText={setResposta}
            value={resposta}
          />
          <Button
            title="Salvar Resposta"
            onPress={() => responderOcorrencia(ocorrenciaParaResponder.id)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ocorrenciaItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
  },
  ocorrenciaTitulo: {
    fontWeight: 'bold',
  },
  ocorrenciaData: {
    fontSize: 12,
    color: '#666',
  },
  respostaTitulo: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  respostaContainer: {
    marginTop: 20,
  },
  input: {
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default VisualizarOcorrencias;
