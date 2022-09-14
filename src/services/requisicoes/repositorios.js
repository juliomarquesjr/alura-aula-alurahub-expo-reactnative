import api from "../api";

export const pegarRepositoriosDoUsuario = async (usuario) => {
  try {
    const retorno = await api.get(`/repos?postId=${usuario}`);
    return retorno.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const salvarRepositorioDoUsuario = async (postId, nome, data, id) => {
  try {
    await api.put(`/repos/${id}`, {
      id: id,
      name: nome,
      data: data,
      postId: postId
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
