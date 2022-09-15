import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import estilos from "./estilos";
import useTextos from "../../hooks/useTextos";
import { buscaUsuario } from "../../services/requisicoes/usuarios";

const Principal = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [usuario, setUsuario] = useState({});

  const textos = useTextos().principal;

  //Funcao assincrona para aguardar os dados chegarem da API
  async function busca() {
    const resultado = await buscaUsuario(nomeUsuario);
    setNomeUsuario("");

    if (resultado) {
      setUsuario(resultado);
    } else {
      Alert.alert(textos.tituloAlertError, textos.textoAlertError);
      setUsuario({});
    }
  }

  return (
    <ScrollView>
      <View style={estilos.container}>
        {usuario?.login && (
          <>
            <View style={estilos.fundo} />
            <View style={estilos.imagemArea}>
              <Image
                source={{
                  uri: usuario.avatar_url,
                }}
                style={estilos.imagem}
              />
            </View>
            <Text style={estilos.textoNome}>{usuario.name}</Text>
            <Text style={estilos.textoEmail}>{usuario.email}</Text>
            <View style={estilos.seguidoresArea}>
              <View style={estilos.seguidores}>
                <Text style={estilos.seguidoresNumero}>
                  {usuario.followers}
                </Text>
                <Text style={estilos.seguidoresTexto}>{textos.seguidores}</Text>
              </View>
              <View style={estilos.seguidores}>
                <Text style={estilos.seguidoresNumero}>
                  {usuario.following}
                </Text>
                <Text style={estilos.seguidoresTexto}>{textos.seguindo}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Repositorios", { id: usuario.id })
              }
            >
              <Text style={estilos.repositorios}>{textos.repositorios}</Text>
            </TouchableOpacity>
          </>
        )}

        <TextInput
          placeholder={textos.placeholderInput}
          autoCapitalize="none"
          value={nomeUsuario}
          onChangeText={(texto) => setNomeUsuario(texto)}
          style={estilos.entrada}
        />

        <TouchableOpacity style={estilos.botao} onPress={() => busca()}>
          <Text style={estilos.textoBotao}>{textos.btnBuscar}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default Principal;
