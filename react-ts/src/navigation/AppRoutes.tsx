import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { Recipes } from "../pages/Recipes";
import { TokenRepositoryLocalStorage } from "../services/TokenRepositoryLocalStorage";

export const AppRoutes = () => {
  const navigate = useNavigate();
  const tokenRepositoryLocalStorage = new TokenRepositoryLocalStorage();

  return (
    <Routes>
      <Route path="/" element={<Login navigate={navigate} tokenRepository={tokenRepositoryLocalStorage}/>} />
      <Route path="/recipes" element={<Recipes />} />
    </Routes>
  );
};
