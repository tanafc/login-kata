import { createContext, useContext } from "react";
import { LoginUseCase } from "../use-cases/LoginUseCase";

export type Dependencies = {
  loginUseCase: LoginUseCase;
};

export const DependenciesContext = createContext<Dependencies | null>(null);


export const useDependencies = (): Dependencies => {
  const dependencies = useContext(DependenciesContext);

  if (!dependencies) {
    throw new Error("useDependencies must be provided");
  }

  return dependencies
}