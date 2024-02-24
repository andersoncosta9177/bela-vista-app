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
import { GlobalStyles } from "../globalStyles/GlobalStyles";
import { getDatabase, push,update, ref, onValue, remove } from "firebase/database";

import AntDesign from "react-native-vector-icons/AntDesign";

function TelefoneUtilItem() {
  const [nome, setNome] = useState("");
  const [numeroApartamento, setNumeroApartamento] = useState("");
  const [valor, setValor] = useState("");
  const [telefone, setTelefone]  = useState('')
  const [vagas, setVagas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState('');

  function saveOrUpdateDataParking() {
    const db = getDatabase();
    const dadosRef = ref(db, 'VagasGaragem/' + (currentId || ''));

    if (isEditing) {
      update(dadosRef, { nome, numeroApartamento, valor, telefone })
        .then(() => console.log('Dados atualizados com sucesso.'))
        .catch((error) => console.error('Erro ao atualizar os dados: ', error));
    } else {
      push(dadosRef, { nome, numeroApartamento, valor, telefone })
        .then(() => console.log('Dados salvos com sucesso.'))
        .catch((error) => console.error('Erro ao salvar os dados: ', error));
    }

    closeModal();
  }


  useEffect(() => {
    const db = getDatabase();
    const dadosRef = ref(db, "VagasGaragem");

    // Observa mudanças na referência 'TelefonesUteis'
    const unsubscribe = onValue(dadosRef, (snapshot) => {
      const data = snapshot.val();
      const contatosFirebase = data
        ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
        : [];
      setVagas(contatosFirebase);
    });

    // Desmonta o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  function deleteContact(id) {
    // Usa 'Alert' do React Native para mostrar a caixa de diálogo
    Alert.alert(
      "Confirmação", // Título da caixa de diálogo
      "Deseja excluir esse anúncio?", // Mensagem
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Operação de exclusão cancelada pelo usuário."),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            const db = getDatabase();
            const deleteRef = ref(db, 'VagasGaragem/' + id);
            remove(deleteRef)
              .then(() => console.log('Anuncio deletado com sucesso.'))
              .catch((error) => console.error('Erro ao deletar anuncio: ', error));
          } 
        }
      ],
      { cancelable: false } // Impede que o diálogo seja fechado ao tocar fora dele
    );
  }
  function editContact(item) {
    setNome(item.nome);
    setNumeroApartamento(item.numeroApartamento);
    setValor(item.valor);
    setTelefone(item.telefone);
    setCurrentId(item.id);
    setIsEditing(true);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setNome('');
    setNumeroApartamento('');
    setValor('');
    setTelefone("");
    setIsEditing(false);
    setCurrentId('');
  }

  return (
    <View style={GlobalStyles.container}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />

      {
  vagas.length > 0 ? (
    <FlatList
      data={vagas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Nome:</Text>
            <Text style={styles.itemText}>{item.nome}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Apartamento:</Text>
            <Text style={styles.itemText}>{item.numeroApartamento.trim() ? item.numeroApartamento : 'Condomínio'}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Valor:</Text>
            <Text style={styles.itemText}>
            {item.valor.trim() ? `R$: ${item.valor}` : "A combinar"}
            </Text>
          </View>

          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Contato:</Text>
            <Text style={styles.itemText}>{item.telefone}</Text>
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
      <Text style={styles.emptyText}>Não há vagas disponíveis</Text>
    </View>
  )
}

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
            placeholderTextColor="#696969"
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
            />
            <TextInput
            
              style={styles.input}
              value={numeroApartamento}
              onChangeText={setNumeroApartamento}
              placeholder="Apartamento"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#696969"
              value={valor}
              onChangeText={setValor}
              placeholder="Valor (opcional)"
            />
               <TextInput
              style={styles.input}
              placeholderTextColor="#696969"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="numeric"
              placeholder="Contato"
            />
            

            <View style={styles.containerBtns}>
              <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.btn_cancel_text}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn_save} onPress={saveOrUpdateDataParking}>
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
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    width: "94%",
    marginHorizontal: "3%",
    backgroundColor: "#708e89",
    padding: 9,
    borderRadius: 13,
    justifyContent: "space-between",
    flexDirection: "column",
    marginBottom: 0,
    marginTop: '8%',
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
  itemText: {
    fontSize: 13,
    color: "#ddd",
    fontWeight: "bold",
  },
  
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 8,
    marginBottom: 2,
    backgroundColor: '#708e89',
    borderRadius: 5,
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
  btnActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    alignItems: "center",
    marginHorizontal: '1%'
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

});

export default TelefoneUtilItem;
