import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity , StatusBar} from 'react-native';
import { GlobalStyles } from '../../../globalStyles/GlobalStyles';
// import { styles } from '../../Home/styles';


const SignInResidents = ({ navigation }) => {
  const [condominiumName, setCondominiumName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implemente a lógica de cadastro aqui
    // Verifique se a senha e a confirmação da senha são iguais, etc.
    console.log('login realizado:', condominiumName, email, password);
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar backgroundColor="#EBE3D5" barStyle="light-content" />

      <Text style={GlobalStyles.tituloPrincipal}>Entrar na sua conta</Text>
     
      <TextInput
      style={GlobalStyles.input}
        placeholder="Digite seu e-mail"
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
   
      <TouchableOpacity style={GlobalStyles.btn_save} onPress={()=>navigation.navigate("Pagina inicial")}>
        <Text style={GlobalStyles.btn_save_text}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro morador')}>
       <View style={GlobalStyles.containerBtnIrLogin}>
       <Text style={GlobalStyles.btn_login_text}>não possui cadastro?</Text>
        <Text style={GlobalStyles.btn_login}> cadastre-se</Text>
       </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignInResidents;
