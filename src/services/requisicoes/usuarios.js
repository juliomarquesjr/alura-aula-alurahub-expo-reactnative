import api from "../api";

export const buscaUsuario = async (usuario) => {
  try {
    const resultado = await api.get("/users?login=" + usuario);
    return resultado.data[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};
