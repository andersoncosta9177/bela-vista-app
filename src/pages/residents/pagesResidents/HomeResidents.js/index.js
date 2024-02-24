import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image,StatusBar } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../../globalStyles/GlobalStyles";

function HomeResidents() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <StatusBar backgroundColor="#708e89" barStyle="light-content" />

      <View style={GlobalStyles.header}>
        <Image
          source={require("../../../../assets/img/logo/logopequena.png")}
        />
        <Text style={GlobalStyles.tituloHeader}>Moradores</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Encomendas")}
        >
          <MaterialCommunityIcons
            name="package-variant"
            size={40}
            color="#af6f3b"
          />
          <Text style={styles.textIconContainer}>Encomendas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Agendamentos")}
        >
          <AntDesign name="calendar" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Agendamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Financeiro")}
        >
          <MaterialIcons name="attach-money" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Financeiro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Comunicados")}
        >
          <AntDesign name="notification" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Comunicados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Normas e regras")}
        >
          <MaterialIcons name="rule" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Normas e regras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Relatorio")}
        >
          <AntDesign name="filetext1" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Relatório</Text>
        </TouchableOpacity>

        {/* Adicione o sexto ícone aqui, se necessário */}
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Achados e perdidos")}
        >
          <AntDesign name="aliyun" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Achados e perdidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Ocorrencia")}
        >
          <AntDesign name="warning" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}> Ocorrençia</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Manutencao")}
        >
          <MaterialCommunityIcons name="tools" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}> Manutenção</Text>
        </TouchableOpacity>

        {/* Adicione o sexto ícone aqui, se necessário */}
      </View>


      <View style={styles.row}>
      <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Telefones Uteis")}
        >
          <AntDesign name="phone" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Telefones Úteis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Aluguel vagas")}
        >
          <AntDesign name="car" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Colaboradores")}
        >
          <Ionicons name="person" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Colaboradores</Text>
        </TouchableOpacity>

     

      </View>
      
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Dados pessoais")}
        >
          <AntDesign name="setting" size={40} color="#af6f3b" />
          <Text style={styles.textIconContainer}>Meus dados</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "94%",
    marginVertical: 8,
    marginHorizontal: "3%",
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "30%",
    height: 100,
    justifyContent: "center",
    shadowColor: "#af6f3b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textIconContainer: {
    fontSize: 11,
    color: "#af6f3b",
    textAlign: "center",
    marginTop: 5,
  },
});

export default HomeResidents;
