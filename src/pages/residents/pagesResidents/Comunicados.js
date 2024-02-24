import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ComunicadosCondominio = () => {
  // Dados estáticos dos comunicados
  const comunicados = [
    // Exemplo de comunicado
    { id: 1, titulo: 'Manutenção do Elevador', data: '10/02/2024', conteudo: 'Informamos que o elevador estará em manutenção no dia 12/02. Por favor, usem as escadas.' },
    // Adicione mais comunicados aqui
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {comunicados.length === 0 ? (
          <Text style={styles.semComunicadosTexto}>Não há comunicados no momento.</Text>
        ) : (
          comunicados.map(comunicado => (
            <View key={comunicado.id} style={styles.comunicado}>
              <Text style={styles.titulo}>{comunicado.titulo}</Text>
              <Text style={styles.data}>{comunicado.data}</Text>
              <Text style={styles.conteudo}>{comunicado.conteudo}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  comunicado: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  conteudo: {
    fontSize: 16,
  },
  semComunicadosTexto: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ComunicadosCondominio;
