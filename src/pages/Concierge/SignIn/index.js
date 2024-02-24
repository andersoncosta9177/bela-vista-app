import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StatusBar } from 'react-native';
import { GlobalStyles } from '../../../globalStyles/GlobalStyles';
import { useNavigation } from "@react-navigation/native";

const Concierge = () => {
  const [idNumber, setIdNumber] = useState('');
  const navigation = useNavigation();

  
  return (
    <View style={GlobalStyles.container}>
          <StatusBar backgroundColor="#EBE3D5" barStyle="light-content" />

      <Text style={GlobalStyles.tituloPrincipal}>Login do Funcionário</Text>
      <TextInput
        style={GlobalStyles.input}
        placeholder="Número de Identificação"
        value={idNumber}
        onChangeText={setIdNumber}
        keyboardType="numeric"
      />
        <TouchableOpacity style={GlobalStyles.btn_save} onPress={()=>navigation.navigate("Home Portaria")}>
        <Text style={GlobalStyles.btn_save_text}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};



export default Concierge;
