import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";

import { salvarRepositorioDoUsuario } from "../../services/requisicoes/repositorios";

export default function InfoRepositorio() {
  const route = useRoute();
  const navigation = useNavigation();

  const [nome, setNome] = useState(route.params?.item.name);
  const [data, setData] = useState(route.params?.item.data);

  async function salvarDados() {
    const postID = route.params.item.postId;
    const id = route.params.item.id;

    const resultado = await salvarRepositorioDoUsuario(postID, nome, data, id);

     if (resultado) {
      Alert.alert("Sucesso!", "Repositorio salva com sucesso");
      navigation.goBack()
    } else {
      Alert.alert("Falha!", "Erro ao salvar as informações.");
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Nome do repositório"
        autoCapitalize="none"
        value={nome}
        style={estilos.entrada}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Data de criação"
        autoCapitalize="none"
        value={data}
        style={estilos.entrada}
        onChangeText={(text) => setData(text)}
      />
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => salvarDados()}
      >
        <Text style={estilos.textoBotao}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[estilos.botao, { backgroundColor: "#DD2B2B", marginTop: 10 }]}
      >
        <Text style={estilos.textoBotao}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}
