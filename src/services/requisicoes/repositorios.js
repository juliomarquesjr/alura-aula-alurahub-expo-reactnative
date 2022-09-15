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
      postId: postId,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const cadastrarNovoRepositorio = async (nome, data, postId) => {
  try {
    await api.post(`/repos`, {
      name: nome,
      data: data,
      postId: postId,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removerRepositorioUsuario = async (id) => {
  try {
    await api.delete(`/repos/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
