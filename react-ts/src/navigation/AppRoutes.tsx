import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { AuthService } from "../infrastructure/AuthService";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { Auth } from "../domain/Auth";
import { LoginUseCase } from "../use-cases/LoginUseCase";
import { ContainerContext } from "../infrastructure/container";
import { Container } from "inversify";
import { Tokens } from "../tokens";
import { TokenRepository } from "../domain/TokenRepository";
import { Router } from "../domain/Router";

const container = new Container();

export const AppRoutes = () => {
  const navigate = useNavigate();

  if (!container.isBound(Tokens.LOGIN_USE_CASE)) {
    container
      .bind(Tokens.TOKEN_REPOSITORY)
      .toDynamicValue(() => new TokenRepositoryLocalStorage());
    container
      .bind(Tokens.ROUTER)
      .toDynamicValue(() => new RouterReactRouter(navigate));
    container.bind(Tokens.AUTH).toDynamicValue(() => new AuthService());
    container.bind(Tokens.LOGIN_USE_CASE).toDynamicValue(({ container }) => {
      const router = container.get<Router>(Tokens.ROUTER);
      const authService = container.get<Auth>(Tokens.AUTH);
      const tokenRepository = container.get<TokenRepository>(
        Tokens.TOKEN_REPOSITORY
      );

      return new LoginUseCase(router, tokenRepository, authService);
    });
  }

  return (
    <ContainerContext.Provider value={container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </ContainerContext.Provider>
  );
};
