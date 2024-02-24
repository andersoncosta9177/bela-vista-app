import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalStyles } from "../../../../globalStyles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

function HomeSyndic() {
  const navigation = useNavigation();

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Image source={require("../../../../assets/img/logo/logopequena.png")} />
        <Text style={GlobalStyles.tituloHeader}>Administração</Text>

      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Agendamentos")}
        >
          <AntDesign name="calendar" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Publicar Comunicado")}
        >
          <AntDesign name="notification" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Comunicados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Relatorio Servicos")}
        >
          <AntDesign name="filetext1" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Relatório</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Normas Condominio")}
        >
          <MaterialIcons name="rule" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Normas e regras</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("VisualizarOcorrencias")}
        >
          <AntDesign name="warning" size={40} color="#fff" />
          <Text style={styles.textIconContainer}> Ocorrençia</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Solicitacoes Manutencao")}
        >
          <MaterialCommunityIcons name="tools" size={40} color="#fff" />
          <Text style={styles.textIconContainer}> Manutenção</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Achados e perdidos")}
        >
          <AntDesign name="aliyun" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Achados e perdidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Aluguel vagas")}
        >
          <AntDesign name="car" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Vagas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Registro funcionario")}a
        >
          <Ionicons name="person" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Colaboradores</Text>
        </TouchableOpacity>

        {/* Adicione o sexto ícone aqui, se necessário */}
      </View>

      <View style={styles.row}>
      <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Moradores")}
        >
          <Ionicons name="people" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Moradores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("Dados pessoais")}
        >
          <AntDesign name="setting" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.navigate("Telefones uteis")}>
          <MaterialIcons name="phone" size={40} color="#fff" />
          <Text style={styles.textIconContainer}>Contatos</Text>
        </TouchableOpacity>

        {/* Adicione o sexto ícone aqui, se necessário */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "94%",
    marginHorizontal: "3%",
    marginTop: '6%'
    
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#708e89",
    width: "30%",
    height: 100,
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginVertical: '5%',


  },
  textIconContainer: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    marginTop: 4,
    opacity: 0.8,
    fontWeight: '500'
  },
});

export default HomeSyndic;
