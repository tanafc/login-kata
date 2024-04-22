import { TokenRepository } from "../domain/TokenRepository.js";

export class TokenRepositoryLocalStorage implements TokenRepository {
  save(token: string): void {
    localStorage.setItem("token", token);
  }
}
