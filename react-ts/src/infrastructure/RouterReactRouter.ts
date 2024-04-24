import { NavigateFunction } from "react-router-dom";
import { Router } from "../domain/Router.js";

export class RouterReactRouter implements Router {
  private navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  goToRecipes() {
    this.navigate("/recipes");
  }
}
