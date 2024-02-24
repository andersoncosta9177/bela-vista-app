import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pagina inicial do app
import Home from "./pages/Home";

//  rotas para a pagina inicial do sindico
import HomeSyndic from "./pages/syndic/pagesSyndic/HomeSyndic/HomeSyndic.js";
import SigIn from "./pages/syndic/SignIn";
import SigUp from "./pages/syndic/SignUp";
// import EventosCondominio from "./pages/syndic/pagesSyndic/Agenda.js";
import PublicarComunicado from "./pages/syndic/pagesSyndic/Comunicados.js";
import RelatorioServicos from "./pages/syndic/pagesSyndic/Relatorio.js";
import NormasCondominio from "./pages/syndic/pagesSyndic/NormasRegras.js";
import VisualizarOcorrencias from "./pages/syndic/pagesSyndic/Ocorrencia.js";
import SolicitacoesManutencao from "./pages/syndic/pagesSyndic/Manutencao.js";
import MoradoresLista from "./pages/syndic/pagesSyndic/Moradores.js";
import TelefoneUtilItem from "./pages/syndic/pagesSyndic/TelefonesUteis.js";
import RegistroFuncionario from "./pages/syndic/pagesSyndic/EditColaborador.js";

// LINK PARA PASTA MORADORES
import SignInResidents from "./pages/residents/SignInResidents";
import SignUpResidents from "./pages/residents/SignUpResidents";
import HomeResidents from "./pages/residents/pagesResidents/HomeResidents.js";
import AchadosPerdidos from "./pages/residents/pagesResidents/AchadosPerdidos.js";
import EventosCondominio from "./pages/residents/pagesResidents/Agendamentos.js";
// import VagasAluguel from "./pages/residents/pagesResidents/AluguelVagas.js";
import Colaboradores from "./pages/residents/pagesResidents/Colaboradores.js";
import ComunicadosCondominio from "./pages/residents/pagesResidents/Comunicados.js";
import EncomendasComponent from "./pages/residents/pagesResidents/Encomendas.js";
import Financeiro from "./pages/residents/pagesResidents/Financeiro.js";
import Relatorio from "./pages/residents/pagesResidents/Relatorio.js";
import MeusDados from "./pages/residents/pagesResidents/MeusDados.js";
import NormasRegras from "./pages/residents/pagesResidents/Normas_Regras.js";
import RegistroOcorrencia from "./pages/residents/pagesResidents/RegistrarOcorrencia.js";
import SolicitarManutencao from "./pages/residents/pagesResidents/solicitarManutencao.js";
import TelefonesUteis from "./pages/Concierge/pagesConcierge/TelefonesUteis.js";

// Rotas para Home portaria
import HomeConcierge from "./pages/Concierge/HomeConcierge/index.js";
import EntregaEncomendas from "./pages/Concierge/pagesConcierge/EntregaEncomendas.js";
import Concierge from "./pages/Concierge/SignIn/index.js";


// Rotas Publicas 
import VagasAluguel from "./public/AluguelVagas.js";


const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
       options={{
        headerShown: false
       }}
    
        
        name="Home"
        component={Home}
      />
      <Stack.Screen name="Login" component={SigIn} />
      <Stack.Screen name="Cadastro" component={SigUp} />
      <Stack.Screen
        name="Portaria"
        component={Concierge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login morador"
        component={SignInResidents}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Cadastro morador" component={SignUpResidents} />

      {/* pagina inicial dos moradores  */}
      <Stack.Screen
        name="Pagina inicial"
        component={HomeResidents}
        options={{
          headerShown: false,
        }}
      />

      {/* rotas para area do sindico  */}
      <Stack.Screen name="Eventos" component={EventosCondominio} />
      <Stack.Screen
        name="Sindico"
        component={HomeSyndic}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#f2c399",
            borderBottomWidth: 0,
          },
          headerTitle: "",
        }}
      />

      <Stack.Screen name="Publicar Comunicado" component={PublicarComunicado} />
      <Stack.Screen name="Relatorio Servicos" component={RelatorioServicos} />
      <Stack.Screen name="Normas Condominio" component={NormasCondominio} />
      <Stack.Screen name="Registro funcionario" component={RegistroFuncionario} 
      options={{
        headerShown: false
      }}
      />
      <Stack.Screen
        name="Telefones uteis"
        component={TelefoneUtilItem}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VisualizarOcorrencias"
        component={VisualizarOcorrencias}
      />
      <Stack.Screen name="Moradores" component={MoradoresLista} />
      <Stack.Screen
        name="Solicitacoes Manutencao"
        component={SolicitacoesManutencao}
      />

      {/* Rotas Publicas  */}
      <Stack.Screen  name="Aluguel vagas" component={VagasAluguel} options={{headerShown: false}}/>
     

      {/* rotas para paginas moradores */}
      <Stack.Screen name="Achados e perdidos" component={AchadosPerdidos} />
      <Stack.Screen name="Agendamentos" component={EventosCondominio} options={{headerShown: false}}/>
    
      <Stack.Screen name="Colaboradores" component={Colaboradores} />
      <Stack.Screen name="Comunicados" component={ComunicadosCondominio} />
      <Stack.Screen name="Encomendas" component={EncomendasComponent} />
      <Stack.Screen name="Financeiro" component={Financeiro} />
      <Stack.Screen name="Relatorio" component={Relatorio} />
      <Stack.Screen name="Dados pessoais" component={MeusDados} />
      <Stack.Screen name="Normas e regras" component={NormasRegras} />
      <Stack.Screen name="Ocorrencia" component={RegistroOcorrencia} />
      <Stack.Screen name="Manutencao" component={SolicitarManutencao} />


      {/* Rotas para Home Portaria   */}
      <Stack.Screen
        name="Home Portaria"
        component={HomeConcierge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Entrega de encomendas"
        component={EntregaEncomendas}
      />
       <Stack.Screen
       options={{
          headerShown: false
       }}
        name="Telefones Uteis"
        component={TelefonesUteis}
      />
    </Stack.Navigator>
  );
}

export default Routes;
