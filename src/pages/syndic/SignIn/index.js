import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../../../globalStyles/GlobalStyles';
// import { styles } from '../../Home/styles';


const SignIn = ({ navigation }) => {
  const [condominiumName, setCondominiumName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implemente a lógica de cadastro aqui
    // Verifique se a senha e a confirmação da senha são iguais, etc.
    console.log('Cadastro realizado:', condominiumName, email, password);
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.tituloPrincipal}>Login</Text>
    
      <TextInput
      style={GlobalStyles.input}
        placeholder="E-mail do Condomínio"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
      style={GlobalStyles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
    
      <TouchableOpacity style={GlobalStyles.btn_save}>
        <Text style={GlobalStyles.btn_save_text}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
       <View style={GlobalStyles.containerBtnIrLogin}>
       <Text style={GlobalStyles.btn_login_text}> Não possui cadastro?</Text>
       <TouchableOpacity onPress={()=>navigation.navigate("Cadastro")}>
       <Text style={GlobalStyles.btn_login}> cadastre-se</Text>
       </TouchableOpacity>
       </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;
