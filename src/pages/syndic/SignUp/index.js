import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../globalStyles/GlobalStyles';
// import { styles } from '../../Home/styles';


const SignUp = ({ navigation }) => {
  const [condominiumName, setCondominiumName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implemente a lógica de cadastro aqui
    // Verifique se a senha e a confirmação da senha são iguais, etc.
    console.log('Cadastro realizado:', condominiumName, email, password);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.tituloPrincipal}>Cadastre seu do condomínio</Text>
      <TextInput
      style={GlobalStyles.input}
        placeholder="Nome do Condomínio"
        value={condominiumName}
        onChangeText={setCondominiumName}
      />
      <TextInput
      style={GlobalStyles.input}
        placeholder="E-mail do Condomínio"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
         <TextInput
      style={GlobalStyles.input}
        placeholder="Cnpj do Condomínio"
        value={cnpj}
        onChangeText={setCnpj}
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

export default SignUp;
