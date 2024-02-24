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
import {
  getDatabase,
  push,
  ref,
  update,
  onValue,
  remove,
} from "firebase/database";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import CalendarPicker from "react-native-calendar-picker";

import { GlobalStyles } from "../../../globalStyles/GlobalStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

function EventosCondominio() {
  const [nome, setNome] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [agendamentos, setAgendamentos] = useState([]);
  const [editingAgenda, setEditingAgenda] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const db = getDatabase();

  // formata a data
  const  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() retorna um índice baseado em zero, então adicione 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const MyCalendar = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(null); // Adiciona estado para a data selecionada
  
  const onDateChange = (date, type) => {
    // Atualiza os estados com a nova data selecionada
    setSelectedStartDate(date);
    setDataReserva(date ? date.toString() : ''); // Formata a data conforme necessário
  };
  
    return (
      <View style={styles.calendar}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={false}
          weekdays={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]}
          months={[
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ]}
          previousTitle="anterior"
          todayBackgroundColor="#66ff33"
          selectedDayColor="#007bff" // Azul para o dia selecionado
          selectedDayTextColor="#000"
          // scaleFactor={375}
          textStyle={{
            fontFamily: "Cochin",
            color: "#123",
          }}
          onDateChange={onDateChange}
          selectedStartDate={selectedStartDate} 
        />
      </View>
    );
  };

  useEffect(() => {
    const db = getDatabase();
    // Certifique-se de que a referência aqui esteja alinhada com a usada para salvar os agendamentos
    const AgendamentosRef = ref(db, "Agendamentos");

    const unsubscribe = onValue(AgendamentosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaAgendamento = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAgendamentos(listaAgendamento);
      } else {
        setAgendamentos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  //  funçao para salvar o agendamento
  const saveOrUpdateDataPhone = () => {
    if (nome === "" || apartamento === "" || dataReserva === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    let dataReference;
    if (editingAgenda) {
      // Se estiver editando, use a referência do agendamento existente
      dataReference = ref(db, `Agendamentos/${editingAgenda.id}`);
    } else {
      // Se for um novo agendamento, crie uma nova entrada
      dataReference = push(ref(db, "Agendamentos"));
    }

    // Salva ou atualiza os dados no Firebase
    update(dataReference, {
      nome: nome,
      apartamento: apartamento,
      dataReserva: dataReserva,
    })
      .then(() => {
        closeModal();
        if (editingAgenda) {
          setEditingAgenda(null);
        }
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      });
  };

  function closeModal() {
    setModalVisible(false);
    setNome("");
    setApartamento("");
    setDataReserva("");
    setEditingAgenda(null); // Reseta o estado de edição
  }
  const startDeleteAgenda = (agenda) => {
    deleteUser(agenda); // Passa o colaborador diretamente
  };

  // Chamada quando o botão de editar é pressionado
  const startEditAgenda = (agenda) => {
    setNome(agenda.nome); // Define o nome para o valor da agenda sendo editada
    setApartamento(agenda.apartamento); // Define o apartamento para o valor da agenda sendo editada
    setDataReserva(agenda.dataReserva); // Define a dataReserva para o valor da agenda sendo editada
    setEditingAgenda(agenda); // Define o item que está sendo editado
    setModalVisible(true); // Abre o modal para edição
  };
  const deleteUser = (agenda) => {
    Alert.alert("Confirmação", "Deseja cancelar  este agendamento?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        onPress: () => {
          const deleteRef = ref(db, `Agendamentos/${agenda.id}`);
          remove(deleteRef)
            .then(() => {
              console.log("Sucesso", " deletado com sucesso.");
            })
            .catch((error) => {
              Alert.alert("Erro", error.message);
            });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={GlobalStyles.tituloPrincipal}>Agendamentos</Text>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <View style={styles.container}>
        {agendamentos.length > 0 ? (
          <FlatList
            data={agendamentos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Nome:</Text>
                  <Text style={styles.itemText}>{item.nome}</Text>
                </View>

                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Apartamento:</Text>
                  <Text style={styles.itemText}>{item.apartamento}</Text>
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemText}>Data:</Text>
                  <Text style={styles.itemText}>
                    {formatDate(item.dataReserva)}
                  </Text>
                </View>
                <View style={styles.btnActions}>
                  <TouchableOpacity onPress={() => startDeleteAgenda(item)}>
                    <AntDesign name="delete" size={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => startEditAgenda(item)}>
                    <AntDesign name="edit" size={18} color="#fff" />
                  </TouchableOpacity>

                </View>
              </View>
            )}
            numColumns={2}
            key={"two-columns"}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Não há eventos agendados</Text>
          </View>
        )}
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
              value={apartamento}
              onChangeText={setApartamento}
              placeholder="Apartamento"
            />
            <MyCalendar />

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
                <Text style={styles.btn_save_text}>Agendar</Text>
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
    marginHorizontal: "9%",
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
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    marginHorizontal: "0%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
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

  calendar: {
    width: "100%",
    marginHorizontal: "2%",
    marginBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 12,
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
    flexDirection: "row",
    justifyContent: "space-between", // Isso distribui os itens ao longo do eixo principal (neste caso, horizontalmente)
    alignItems: "center", // Isso centraliza os itens ao longo do eixo cruzado (neste caso, verticalmente)
    width: "92%", // Isso garante que a View ocupe toda a largura disponível
    marginHorizontal: '4%',
    paddingTop: 6
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
    marginTop: "5%",
  },
  itemContainer: {
    width: "94%", // Largura da View será 50% da largura da tela
    marginHorizontal: "3%",
    height: 125, // Altura fixa de 120
    padding: 7, // Espaçamento interno para não deixar o conteúdo muito grudado nas bordas
    backgroundColor: "#708e89", // Cor de fundo
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 3, // Margem abaixo de cada item
    flexDirection: "column", // Itens organizados verticalmente
    justifyContent: "space-around", // Distribuir o espaço internamente de maneira uniforme
    alignItems: "center", // Alinhar itens ao centro horizontalmente
    // Propriedades para sombra no iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    // Propriedade para sombra no Android
    elevation: 9,
    marginBottom: '5%'
  },

  itemRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%", 
    backgroundColor: "#84a09b",
    padding: 5,
    borderColor: '#708e89',
    borderWidth: 1,
    borderRadius: 5
    // marginBottom: 13,
  },



  // infoContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 10,
  //   backgroundColor: "#708e89",
  //   borderRadius: 5,
  //   padding: 4,
  //   // Propriedades para sombra no iOS
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 10,
  //   // Propriedade para sombra no Android
  //   elevation: 12,
  // },
  itemText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
});

export default EventosCondominio;
