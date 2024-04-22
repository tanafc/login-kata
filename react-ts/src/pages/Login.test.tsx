import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { TokenRepository } from "../domain/TokenRepository";
import { Router } from "../domain/Router";
import { Auth } from "../domain/Auth";
import { AuthService } from "../infrastructure/AuthService";
import { LoginUseCase } from "../use-cases/LoginUseCase";

describe("Login", () => {
  const router: Router = {
    goToRecipes: vi.fn(),
  }
  const tokenRepository: TokenRepository = {
    save: vi.fn(),
  };

  const authService: Auth = {
    login: async () => "token" ,
  };
  const loginUseCase = new LoginUseCase(router, tokenRepository, authService);

  it("redirects to recipe page after login", async () => {
    render(
      <Login loginUseCase={loginUseCase}/>
    );

    await fillOutAndSubmit();

    await waitFor(
      () => {
        expect(router.goToRecipes).toHaveBeenCalled();
      },
    );
  });

  it("stores token when user logs in", async () => {
    render(
      <Login loginUseCase={loginUseCase}/>
    );

    await fillOutAndSubmit();

    expect(tokenRepository.save).toHaveBeenCalled();
  });

  async function fillOutAndSubmit() {
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com"
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: "Login" }));
  }
});
