import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const PublicarComunicado = () => {
  const [titulo, setTitulo] = useState('');
  const [corpo, setCorpo] = useState('');
  const [nomeCondominio, setNomeCondominio] = useState('');

  const publicarComunicado = () => {
    // Aqui você adicionaria a lógica para publicar o comunicado.
    const agora = new Date();
    const dataPublicacao = `${agora.toLocaleDateString()} ${agora.toLocaleTimeString()}`;

    console.log('Título:', titulo);
    console.log('Corpo:', corpo);
    console.log('Condomínio:', nomeCondominio);
    console.log('Data de Publicação:', dataPublicacao);
    
    // Exibir um alerta de sucesso
    Alert.alert("Comunicado Publicado", "Seu comunicado foi publicado com sucesso.");

    // Limpar os campos após a publicação
    setTitulo('');
    setCorpo('');
    setNomeCondominio('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título do Comunicado"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Corpo do Comunicado"
        multiline
        numberOfLines={6}
        value={corpo}
        onChangeText={setCorpo}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Condomínio"
        value={nomeCondominio}
        onChangeText={setNomeCondominio}
      />
      <Button
        title="Publicar Comunicado"
        onPress={publicarComunicado}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 120, // Ajuste conforme necessário
  },
});

export default PublicarComunicado;
