import { Container } from "inversify";
import { createContext, useContext } from "react";
import { Tokens } from "../tokens";
import { LoginUseCase } from "../use-cases/LoginUseCase";

export const ContainerContext = createContext<Container | null>(null);

export const useContainer = () => {
  const container = useContext(ContainerContext);

  if (!container) {
    throw new Error("Container must be provided");
  }

  return {
    login: (email: string, password: string) =>
      container
        .get<LoginUseCase>(Tokens.LOGIN_USE_CASE)
        .execute(email, password),
  };
};
