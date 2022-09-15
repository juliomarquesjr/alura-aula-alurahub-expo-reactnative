import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";

import {
  salvarRepositorioDoUsuario,
  removerRepositorioUsuario,
} from "../../services/requisicoes/repositorios";

import useTextos from "../../hooks/useTextos";

export default function InfoRepositorio() {
  const textos = useTextos().infoRepositorio;

  const route = useRoute();
  const navigation = useNavigation();

  const [nome, setNome] = useState(route.params?.item.name);
  const [data, setData] = useState(route.params?.item.data);

  async function salvarRepositorio() {
    const postID = route.params.item.postId;
    const id = route.params.item.id;

    const resultado = await salvarRepositorioDoUsuario(postID, nome, data, id);

    if (resultado) {
      Alert.alert(
        textos.tituloAlertSalvarSucess,
        textos.textoAlertSalvarSucesso
      );
      navigation.goBack();
    } else {
      Alert.alert(textos.tituloAlertSalvarError, textos.textoAlertSalvarError);
    }
  }

  async function removerRepositorio() {
    const retorno = await removerRepositorioUsuario(route.params.item["id"]);

    if (retorno) {
      Alert.alert(textos.tituloAlertRemoverSucess, textos.textoAlertRemoverSucess);
      navigation.goBack();
    } else {
      Alert.alert(textos.tituloAlertRemoverError, textos.textoAlertRemoverError);
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder={textos.placeholderInputNomeRepo}
        autoCapitalize="none"
        value={nome}
        style={estilos.entrada}
        onChangeText={setNome}
      />
      <TextInput
        placeholder={textos.placeholderInputDataRepo}
        autoCapitalize="none"
        value={data}
        style={estilos.entrada}
        onChangeText={(text) => setData(text)}
      />
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => salvarRepositorio()}
      >
        <Text style={estilos.textoBotao}>{textos.btnSalvar}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: "#DD2B2B", marginTop: 10 }]}
        onPress={() => removerRepositorio()}
      >
        <Text style={estilos.textoBotao}>{textos.btnDeletar}</Text>
      </TouchableOpacity>
    </View>
  );
}
