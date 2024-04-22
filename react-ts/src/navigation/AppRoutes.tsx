import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { AuthService } from "../infrastructure/AuthService";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { Auth } from "../domain/Auth";
import { LoginUseCase } from "../use-cases/LoginUseCase";

export const AppRoutes = () => {
  const router = new RouterReactRouter();
  const tokenRepositoryLocalStorage = new TokenRepositoryLocalStorage();
  const authService: Auth = new AuthService();

  const loginUseCase = new LoginUseCase(router, tokenRepositoryLocalStorage, authService);
  
  return (
    <Routes>
      <Route path="/" element={
      <Login loginUseCase={loginUseCase}/>
      } 
      />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};
