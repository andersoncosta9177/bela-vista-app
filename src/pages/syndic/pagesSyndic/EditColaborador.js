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
import { SafeAreaView } from "react-native-safe-area-context";

function AddColaborador() {
  const [nome, setNome] = useState("");
  const [funcao, setFuncao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingColaborador, setEditingColaborador] = useState(null);
  const db = getDatabase();
  const storage = getStorage();
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState(null);

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

  const selectPhoto = () => {
    const options = {
      mediaType: "photo",
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = response.assets[0].uri;
        uploadImage(source);
      }
    });
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = storageRef(storage, `colaboradores/${new Date().toISOString()}`);
    uploadBytes(fileRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        setImagemUrl(downloadURL);
        Alert.alert("Sucesso", "Imagem carregada com sucesso.");
      });
    }).catch((error) => {
      Alert.alert("Erro", error.message);
    });
  };

  const saveOrUpdateDataPhone = () => {
    if (nome === "" || funcao === "" || telefone === "" || imagemUrl === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos e selecione uma imagem.");
      return;
    }

    const dataReference = editingColaborador ? ref(db, `colaboradores/${editingColaborador.id}`) : push(ref(db, "colaboradores"));
    update(dataReference, {
      nome: nome,
      funcao: funcao,
      telefone: telefone,
      imagemUrl: imagemUrl,
    }).then(() => {
      console.log("Sucesso", "Colaborador salvo com sucesso.");
      closeModal();
      if (editingColaborador) {
        setEditingColaborador(null);
      }
    }).catch((error) => {
      Alert.alert("Erro", error.message);
    });
  };

  function closeModal() {
    setModalVisible(false);
    setNome("");
    setFuncao("");
    setTelefone("");
    setImagemUrl("");
    setEditingColaborador(null);
  }

// Chamada quando o botão de deletar é pressionado
const startDeleteUser = (colaborador) => {
  deleteUser(colaborador); // Passa o colaborador diretamente
};

// Chamada quando o botão de editar é pressionado
const startEditUser = (colaborador) => {
  editUser(colaborador); // Passa o colaborador diretamente
};



const deleteUser = (colaborador) => {
  Alert.alert("Confirmação", "Deseja mesmo deletar este colaborador?", [
    {
      text: "Cancelar",
      style: "cancel",
    },
    {
      text: "Deletar",
      onPress: () => {
        const deleteRef = ref(db, `colaboradores/${colaborador.id}`);
        remove(deleteRef).then(() => {
          console.log("Sucesso", "Colaborador deletado com sucesso.");
        }).catch((error) => {
          Alert.alert("Erro", error.message);
        });
      },
    },
  ]);
};

// Agora editUser espera receber um colaborador como argumento
const editUser = (colaborador) => {
  setNome(colaborador.nome);
  setFuncao(colaborador.funcao);
  setTelefone(colaborador.telefone);
  setImagemUrl(colaborador.imagemUrl);
  setEditingColaborador(colaborador);
  setModalVisible(true);
};


  return (
    <SafeAreaView style={GlobalStyles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <View style={styles.container}>
    {
      colaboradores.length > 0 ? (
        <FlatList
        data={colaboradores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagemUrl }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <View style={styles.nomeContainer}>
                <Text style={styles.itemTextNome}>{item.nome}</Text>
                <View style={styles.btnActions}>
            <TouchableOpacity style={{paddingRight: 5}} onPress={() => startDeleteUser(item)}>
              <AntDesign name="delete" size={18} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => startEditUser(item)}>
              <AntDesign name="edit" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
                
                
    

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
      ):(
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Não há colaboradores cadastrados</Text>
      </View>
      )
    }
    </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={nome}
              placeholderTextColor="#696969"
              onChangeText={setNome}
              placeholder="Nome"
            />
            <TextInput
              placeholderTextColor="#696969"
              style={styles.input}
              value={funcao}
              onChangeText={setFuncao}
              placeholder="Função"
            />
            <TextInput
              placeholderTextColor="#696969"
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
              placeholder="Telefone"
            />
            <TouchableOpacity style={styles.AddPhoto} onPress={selectPhoto}>
              <AntDesign name="picture" size={30} color="#c7b084" />
              <Text style={styles.imageText}>Adicione uma imagem</Text>
            </TouchableOpacity>

            <View style={styles.containerBtns}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.btn_cancel_text}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn_save}
                onPress={saveOrUpdateDataPhone}
              >
                <Text style={styles.btn_save_text}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.fab}
        underlayColor="#10ac44"
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    marginHorizontal: "3%",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    color: "#747264",
    marginBottom: 10,
    // Propriedades para sombra no iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    // Propriedade para sombra no Android
    elevation: 4,
  },
  AddPhoto: {
    width: "100%",
    height: 50,
    marginHorizontal: "3%",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    paddingLeft: 10,
    // color: "#747264",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#23CF5C",
    borderRadius: 28,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerBtns: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
  },

  btn_save: {
    backgroundColor: "#23CF5C",
    borderRadius: 7,
    padding: 6,
    width: "47%",
    marginHorizontal: "3%",
    height: 45,
    justifyContent: "center",
  },
  btn_save_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  btnCancel: {
    backgroundColor: "#f69c54",
    borderRadius: 7,
    padding: 6,
    width: "47%",
    marginHorizontal: "3%",
    height: 45,
    justifyContent: "center",
  },
  btn_cancel_text: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  btnActions: {
    flexDirection: "column",
    justifyContent: "space-around",
    // paddingVertical: 5,
    alignItems: "center",
    marginHorizontal: "1%",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "8%",
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    fontStyle: "italic",
  },


//  estilos dos dados mostrados na tela 
 container: {
    flex: 1,
    marginTop: '5%'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center', 
    backgroundColor: '#708e89',
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
    borderRadius: 8,



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
    paddingLeft: 5,
    paddingRight: '0.2%'
   
  },
  itemTextNome: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  btnActions: {
    flexDirection: "row",
    justifyContent: "space-",
    paddingVertical: 5,
    alignItems: "center",
    marginHorizontal: '1%'
  },

  infoContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    backgroundColor: '#708e89',
    borderRadius: 5,
    padding:4,
            // Propriedades para sombra no iOS
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            // Propriedade para sombra no Android
            elevation: 12,
  },
  itemText:{
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 6
  },




});

export default AddColaborador;
