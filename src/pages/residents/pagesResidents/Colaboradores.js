import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { getDatabase, push, ref, update, onValue , remove} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { GlobalStyles } from "../../../globalStyles/GlobalStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

function Colaboradores() {
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const db = getDatabase();
  const storage = getStorage();
  const [menuVisible, setMenuVisible] = useState(false);

  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const colaboradoresRef = ref(db, "colaboradores");

    const unsubscribe = onValue(colaboradoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaColaboradores = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setColaboradores(listaColaboradores);
      } else {
        setColaboradores([]);
      }
    });

    return () => unsubscribe();
  }, []);







  return (
    <View style={GlobalStyles.container}>
      <StatusBar backgroundColor="#ebe2dd" barStyle="light-content" />
      <View style={styles.container}>
      <FlatList
        data={colaboradores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagemUrl }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <View style={styles.nomeContainer}>
                <Text style={styles.itemTextNome}>{item.nome}</Text>
              
                
                
  

              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.itemText}>Função</Text>
                <Text style={styles.itemText}>{item.funcao}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.itemText}>Telefone</Text>
                <Text style={styles.itemText}>{item.telefone}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>

  
     
    </View>
  );
}
const styles = StyleSheet.create({


 container: {
    flex: 1,
    marginTop: '5%'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center', 
    backgroundColor: '#f69c54',
    width: '96%',
    marginHorizontal: '2%',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 10
  },
  image: {
    width: '25%', // A imagem ocupa 25% do container
    height: 100, // Defina uma altura fixa ou ajuste conforme necessário
    resizeMode: 'cover', // Ajusta a imagem para cobrir o espaço definido
    borderRadius: 10,


  },
  detailsContainer: {
    width: '75%', // Os detalhes ocupam 75% do container
    paddingLeft: 10, // Espaço entre a imagem e os detalhes
    flexDirection: 'column',
  },
  nomeContainer: {
    justifyContent: 'space-between', // Centraliza o nome no meio do container
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 7
   
  },
  itemTextNome: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  infoContainer: {
    flexDirection: 'row', // Organiza função e telefone em linha
    justifyContent: 'space-between', // Distribui espaço igualmente entre função e telefone
    marginTop: 10, // Espaço acima da linha de função e telefone
    backgroundColor: '#f5ac70',
    
    borderRadius: 5,
    padding:4
  },
  itemText:{
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 6
  },





});

export default Colaboradores;
