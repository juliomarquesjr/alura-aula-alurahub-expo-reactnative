import { useEffect, useState } from "react";
import textosApp from "../mocks/textosApp";

const useTextos = () => {
  const [textos, setTextos] = useState(textosApp);

  useEffect(() => {
    setTextos(textosApp);
  });

  return textos;
};
export default useTextos;
