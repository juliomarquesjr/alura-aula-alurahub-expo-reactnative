import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";

import { cadastrarNovoRepositorio } from "../../services/requisicoes/repositorios";
import useTextos from "../../hooks/useTextos"

const CriarRepositorio = () => {
  const textos = useTextos().criarRepositorio

  const route = useRoute();
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  async function criarRota() {
    const id = route.params.id;
    const retorno = await cadastrarNovoRepositorio(nome, data, id);
    
    if (retorno) {
      Alert.alert(textos.tituloAlertSucess, textos.textoAlertSucess);
      navigation.goBack();
    } else {
      Alert.alert(textos.tituloAlertError, textos.textoAlertError);
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder={textos.placeholderInputRepositorio}
        autoCapitalize="none"
        style={estilos.entrada}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder={textos.placeholderInputDataCriacao}
        autoCapitalize="none"
        style={estilos.entrada}
        value={data}
        onChangeText={(texto) => {
          setData(texto);
        }}
      />
      <TouchableOpacity style={estilos.botao} onPress={criarRota}>
        <Text style={estilos.textoBotao}>{textos.btnCriarRepositorio}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CriarRepositorio;
