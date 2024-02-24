import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { GlobalStyles } from "../../../globalStyles/GlobalStyles";
import database from "../../../config/database";
import {
  getDatabase,
  push,
  update,
  ref,
  onValue,
  remove,
} from "firebase/database";

import AntDesign from "react-native-vector-icons/AntDesign";

function TelefoneUtilItem() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [email, setEmail] = useState("");
  const [contatos, setContatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");
  // funçoes para salvar telefones uteis no firebase
  function saveOrUpdateDataPhone() {
    const db = getDatabase();
    const dadosRef = ref(db, "TelefonesUteis/" + (currentId || ""));

    if (isEditing) {
      update(dadosRef, { nome, numero, email })
        .then(() => console.log("Dados atualizados com sucesso."))
        .catch((error) => console.error("Erro ao atualizar os dados: ", error));
    } else {
      push(dadosRef, { nome, numero, email })
        .then(() => console.log("Dados salvos com sucesso."))
        .catch((error) => console.error("Erro ao salvar os dados: ", error));
    }

    closeModal();
  }

  useEffect(() => {
    const db = getDatabase();
    const dadosRef = ref(db, "TelefonesUteis");

    // Observa mudanças na referência 'TelefonesUteis'
    const unsubscribe = onValue(dadosRef, (snapshot) => {
      const data = snapshot.val();
      const contatosFirebase = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
        : [];
      setContatos(contatosFirebase);
    });

    // Desmonta o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  function deleteContact(id) {
    // Usa 'Alert' do React Native para mostrar a caixa de diálogo
    Alert.alert(
      "Confirmação", // Título da caixa de diálogo
      "Deseja excluir esse contato?", // Mensagem
      [
        {
          text: "Cancelar",
          onPress: () =>
            console.log("Operação de exclusão cancelada pelo usuário."),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            const db = getDatabase();
            const deleteRef = ref(db, "TelefonesUteis/" + id);
            remove(deleteRef)
              .then(() => console.log("Contato deletado com sucesso."))
              .catch((error) =>
                console.error("Erro ao deletar contato: ", error)
              );
          },
        },
      ],
      { cancelable: false } // Impede que o diálogo seja fechado ao tocar fora dele
    );
  }
  function editContact(item) {
    setNome(item.nome);
    setNumero(item.numero);
    setEmail(item.email);
    setCurrentId(item.id);
    setIsEditing(true);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setNome("");
    setNumero("");
    setEmail("");
    setIsEditing(false);
    setCurrentId("");
  }

  return (
    <View style={GlobalStyles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />

      {contatos.length > 0 ? (
        <FlatList
          data={contatos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>Nome:</Text>
                <Text style={styles.itemText}>{item.nome}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>Telefone:</Text>
                <Text style={styles.itemText}>{item.numero}</Text>
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemText}>E-mail:</Text>
                <Text style={styles.itemText}>
                  {item.email.trim() ? item.email : "******"}
                </Text>
              </View>
              <View style={styles.btnActions}>
                <TouchableOpacity onPress={() => deleteContact(item.id)}>
                  <AntDesign name="delete" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editContact(item)}>
                  <AntDesign name="edit" size={25} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Não há telefones cadastrados</Text>
        </View>
      )}

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
            placeholderTextColor="#A9A9A9"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="nome"
            />
            <TextInput
            placeholderTextColor="#A9A9A9"
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
              placeholder="número"
            />
            <TextInput
            placeholderTextColor="#A9A9A9"

              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-mail (opcional)"
            />

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
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 15,
  },
  
    input: {
      width: "100%",
      height: 50,
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
    marginTop: 18,
  },
  modalView: {
    width: "96%",
    marginHorizontal: '2%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 17,
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
  itemContainer: {
    width: "96%",
    marginHorizontal: "2%",
    backgroundColor: "#708e89",
    padding: 9,
    borderRadius: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#708e89",
    marginBottom: 2,
    marginTop: 6,
    padding: 6,
    paddingHorizontal: 5,
    borderRadius: 8,
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
  btnActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
    marginHorizontal: "1%",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "8%",
  },
  emptyText: {
    color: "#ddd",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default TelefoneUtilItem;
