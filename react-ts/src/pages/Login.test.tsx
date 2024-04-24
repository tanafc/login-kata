import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Auth } from "../domain/Auth";
import { Router } from "../domain/Router";
import { TokenRepository } from "../domain/TokenRepository";
import { ContainerContext } from "../infrastructure/container";
import { LoginUseCase } from "../use-cases/LoginUseCase";
import { Login } from "./Login";

describe("Login", () => {
  const router: Router = {
    goToRecipes: vi.fn(),
  };
  const tokenRepository: TokenRepository = {
    save: vi.fn(),
  };

  const authService: Auth = {
    login: async () => "token",
  };
  const loginUseCase = new LoginUseCase(router, tokenRepository, authService);

  it("redirects to recipe page after login", async () => {
    render(
      <ContainerContext.Provider value={{ loginUseCase }}>
        <Login />
      </ContainerContext.Provider>
    );

    await fillOutAndSubmit();

    await waitFor(() => {
      expect(router.goToRecipes).toHaveBeenCalled();
    });
  });

  it("stores token when user logs in", async () => {
    render(
      <ContainerContext.Provider value={{ loginUseCase }}>
        <Login />
      </ContainerContext.Provider>
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
