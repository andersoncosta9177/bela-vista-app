// #ff6700
// #ebebeb
// #c0c0c0
// #3a6ea5
// #004e98
// #b8b8d1
// #5b5f97
// #ffc145
// #fffffb
// #ff6b6c
// #c0917f
// #f2c399

import { StyleSheet } from "react-native";
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tituloPrincipal: {
    textAlign: "center",
    fontSize: 22,
    color: '#708e89',
    marginTop: '2%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    // Propriedade para sombra no Android
    elevation: 9,
  },
  
  header:{
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#708e89',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: '25%'

  },
 tituloHeader:{
  fontSize: 22,
  color: '#fff',
  textAlign: 'center',

 },
  input: {
    width: "94%",
    height: 50,
    // borderWidth: 1,
    // borderColor: "#af6f3b",
    marginHorizontal: "3%",
    borderRadius: 6,
    backgroundColor: '#ebebeb',
    paddingLeft: 10,
    color: '#747264',
    marginBottom: 5
  },

  btn_save: {
    backgroundColor: "#af6f3b",
    borderRadius: 7,
    padding: 6,
    width: "94%",
    marginHorizontal: "3%",
    height: 45,
    justifyContent: "center",
    marginTop: 10,
  },

  btn_save_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  containerBtnIrLogin:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

btn_login_text:{
    fontSize: 14, 
    fontWeight: '400',
    marginRight: 5,
    letterSpacing: 1,
    color: '#747264'

},
btn_login:{
    color: '#af6f3b'

},
  delete: {
    backgroundColor: "#ff6b6c",
    borderRadius: 7,
    padding: 6,
  },

  rodape: {
    color: '#AAA',
    fontSize: 13,
    bottom: 10,
  },

  btn_save_round:{
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#af6f3b',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  btn_save_text_round:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  }
});
