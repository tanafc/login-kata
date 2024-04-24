import { Auth } from "../domain/Auth";
import { Router } from "../domain/Router";
import { TokenRepository } from "../domain/TokenRepository";

export class LoginUseCase {
  constructor(
    private router: Router,
    private tokenRepository: TokenRepository,
    private authService: Auth
  ) {}

  async execute(email: string, password: string): Promise<void> {
    console.log("execute usecase");
    return this.authService
      .login(email, password)
      .then((jwt) => {
        console.log("saving jwt");

        this.tokenRepository.save(jwt);
      })
      .then(() => {
        console.log("navigating");

        this.router.goToRecipes();
      });
  }
}
