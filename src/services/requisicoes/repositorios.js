import api from "../api";

export const buscarRepositorios = async (id) => {
  try {
    console.log(id)
    const retorno = await api.get(`/repos?postId=${id}`);
    return retorno.data[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};
