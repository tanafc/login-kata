import { Container } from "inversify";
import { createContext, useContext } from "react";

export const ContainerContext = createContext<Container | null>(null);

export const useContainer = (): Container => {
  const container = useContext(ContainerContext);

  if (!container) {
    throw new Error("useDependencies must be provided");
  }

  return container;
};
