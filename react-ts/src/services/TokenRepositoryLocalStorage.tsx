import { TokenRepository } from "../types/TokenRepository.js";

export class TokenRepositoryLocalStorage implements TokenRepository {
  save(token: string): void {
    localStorage.setItem("token", token);
  }
}
