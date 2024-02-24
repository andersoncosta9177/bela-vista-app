import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../globalStyles/GlobalStyles';
// import { styles } from '../../Home/styles';


const SignUpResidents = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numeroApartamento, setNumeroApartamento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implemente a lógica de cadastro aqui
    // Verifique se a senha e a confirmação da senha são iguais, etc.
    console.log('Cadastro realizado:', email, password);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.tituloPrincipal}>Cadastre-se</Text>
      <TextInput
      style={GlobalStyles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
      style={GlobalStyles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
         <TextInput
      style={GlobalStyles.input}
        placeholder="número do apartamento"
        value={numeroApartamento}
        onChangeText={setNumeroApartamento}
      />
      <TextInput
      style={GlobalStyles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
      style={GlobalStyles.input}
        placeholder="Repita a Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={GlobalStyles.btn_save}>
        <Text style={GlobalStyles.btn_save_text}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
       <View style={GlobalStyles.containerBtnIrLogin}>
       <Text style={GlobalStyles.btn_login_text}>Já possui cadastro?</Text>
        <Text style={GlobalStyles.btn_login}> Fazer login</Text>
       </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpResidents;
