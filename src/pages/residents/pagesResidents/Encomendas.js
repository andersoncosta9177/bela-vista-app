import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EncomendasComponent = () => {
  // Dados estáticos das encomendas
  const encomendas = [
    {
      id: 1,
      descricao: 'Pacote da Amazon',
      horario: '14:00',
      recebedor: 'João da Portaria'
    },
    {
      id: 2,
      descricao: 'Correspondência',
      horario: '09:30',
      recebedor: 'Maria da Portaria'
    }
  ];

  // Estado para armazenar a confirmação do morador
  const [confirmacao, setConfirmacao] = useState(Array(encomendas.length).fill(false));

  // Função para lidar com a confirmação da encomenda
  const handleConfirmacao = (index) => {
    const novaConfirmacao = [...confirmacao];
    novaConfirmacao[index] = true;
    setConfirmacao(novaConfirmacao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações de Encomendas</Text>
      {encomendas.map((encomenda, index) => (
        <View key={encomenda.id} style={styles.encomendaContainer}>
          <Text>Descrição: {encomenda.descricao}</Text>
          <Text>Horário: {encomenda.horario}</Text>
          <Text>Recebido por: {encomenda.recebedor}</Text>
          {confirmacao[index] ? (
            <Text style={styles.confirmado}>Confirmado</Text>
          ) : (
            <Button
              title="Confirmar Recebimento"
              onPress={() => handleConfirmacao(index)}
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  encomendaContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  confirmado: {
    color: 'green',
    marginTop: 10,
  }
});

export default EncomendasComponent;
