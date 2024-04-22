import { Auth } from "../domain/Auth";
import { Router } from "../domain/Router";
import { TokenRepository } from "../domain/TokenRepository";

export class LoginUseCase {
  constructor(private router: Router, private tokenRepository: TokenRepository, private authService: Auth) {}

  async execute(email: string, password: string): Promise<void> {
    return this.authService.login(email, password)
      .then((jwt) => {
        this.tokenRepository.save(jwt);
      })
      .then(() => {
        this.router.goToRecipes()
    })
  }
}