import { useNavigate } from "react-router-dom";
import { Router } from "../domain/Router.js";

export class RouterReactRouter implements Router {
  private navigate = useNavigate()

  goToRecipes() {
    this.navigate("/recipes");
  }
}
