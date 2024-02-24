import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
} from "react-native";
import { GlobalStyles } from "../../../globalStyles/GlobalStyles";
import {
  getDatabase,
  ref,
  onValue,
} from "firebase/database";


function TelefonesUteis() {
  const [contatos, setContatos] = useState([]);

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
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Não há telefones cadastrados</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
  },



  
  itemContainer: {
    width: "96%",
    marginHorizontal: "2%",
    backgroundColor: "#f69c54",
    padding: 6,
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "column",
    marginBottom: 0,
    marginTop: '8%',

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
    paddingVertical: 5,
    backgroundColor: '#f5ac70',
    marginBottom: 1,
    paddingHorizontal: 5,
    borderRadius: 4
  },

  emptyContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '8%',
  },
  emptyText:{
    color: '#ddd',
    fontSize: 16,
    fontStyle: 'italic'
  }
});
export default TelefonesUteis;
