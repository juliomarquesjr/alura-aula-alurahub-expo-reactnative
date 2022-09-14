import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import estilos from "./estilos";

import { pegarRepositoriosDoUsuario } from "../../services/requisicoes/repositorios";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

export default function Repositorios( ) {
  const [repo, setRepo] = useState([]);

  const rota = useRoute();
  const navigation = useNavigation()

  const estaNaTela = useIsFocused()

  useEffect(async () => {
    const resultado = await pegarRepositoriosDoUsuario(rota.params.id);
    setRepo(resultado);
  }, [estaNaTela]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation .navigate("CriarRepositorio", {id: rota.params.id})}
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ width: "100%" }}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.repositorio} onPress={() => {navigation.navigate('InfoRepositorio', {item})}}>
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>{item.data}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
