import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  containerLogo: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    // gap: 5,
    backgroundColor: '#708e89',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },


  card: {
    backgroundColor: '#708e89',
    borderRadius: 15,
    overflow: 'hidden',
    width: '28%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 5, 
    marginHorizontal: 7,
        // Propriedades para sombra no iOS
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        // Propriedade para sombra no Android
        elevation: 6,
    

  },
  
  containerRodape:{
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    backgroundColor: '#708e89',
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "flex-end",
    // display: 'flex',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, // Ajustado para projetar a sombra para cima
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5, // No Android, este valor adiciona sombra, mas pode não se comportar como esperado
    overflow: 'hidden',
},

  title: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
    marginTop: 5
 
  },
  iconsCards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '4%',
    height: '20%',
  },
  


});



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

//#af6f3b
//#201010
