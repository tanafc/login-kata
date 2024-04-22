import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { TokenRepositoryLocalStorage } from "../infrastructure/TokenRepositoryLocalStorage";
import { AuthService } from "../infrastructure/AuthService";
import { RouterReactRouter } from "../infrastructure/RouterReactRouter";
import { Auth } from "../domain/Auth";

export const AppRoutes = () => {
  const router = new RouterReactRouter();
  const tokenRepositoryLocalStorage = new TokenRepositoryLocalStorage();
  const authService: Auth = new AuthService();

  return (
    <Routes>
      <Route path="/" element={
      <Login 
        router={router} 
        tokenRepository={tokenRepositoryLocalStorage}
        authService={authService}
      />
      } 
      />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};
