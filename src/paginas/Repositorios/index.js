import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';

import { buscarRepositorios } from '../../services/requisicoes/repositorios';

export default function Repositorios({ route, navigation, id }) {
    const [repo, setRepo] = useState([]);

    useEffect(async () =>{
        const resposta = await buscarRepositorios(id)
        //setRepo(resposta)
        //console.log(resposta)
    },[])

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
        </View>
    );
}
