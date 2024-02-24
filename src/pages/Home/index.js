import React from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import "../../globalStyles/GlobalStyles";
import { styles } from "./styles";
import { GlobalStyles } from "../../globalStyles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar backgroundColor="#708e89" barStyle="light-content" />

      <View  style={styles.containerLogo}>
        <Image
          style={styles.logo}
          source={require("../../assets/img/logo/logo.png")}
        />
        <View style={styles.containerTextName}></View>
      </View>


      <View style={styles.iconsCards}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Sindico")}
        >
          <FontAwesome name="gears" size={50} color="#fff" />

          <Text style={styles.title}>Síndico</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Login morador")}
        >
          <Ionicons name="people" size={50} color="#fff" />
          <Text style={styles.title}>Moradores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Portaria")}
        >
          <Fontisto name="person" size={50} color="#fff" />
          <Text style={styles.title}>Portaria</Text>
        </TouchableOpacity>
      </View>

      <View  style={styles.containerRodape}>

      <Text style={GlobalStyles.rodape}>developed by Blizzy solutions</Text>

      </View>
     
    </SafeAreaView>
  );
}
export default Home;
