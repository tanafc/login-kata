import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { TokenRepository } from "../types/TokenRepository";

describe("Login", () => {
  const navigateSpy = vi.fn();
  const tokenRepositorySpy: TokenRepository =  {
    save: vi.fn()
  }

  it("redirects to recipe page after login", async () => {

    const user = userEvent.setup();
    render(<Login navigate={navigateSpy} tokenRepository={tokenRepositorySpy}/>);

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com"
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(
      () => {
        expect(navigateSpy).toHaveBeenCalledWith("/recipes");
      },
      { timeout: 5000 }
    );
  });

  it('stores token when user logs in', async () => {
    const user = userEvent.setup();
    render(<Login navigate={navigateSpy} tokenRepository={tokenRepositorySpy}/>);

    await user.type(
      screen.getByLabelText("Your email"),
      "linustorvalds@gmail.com"
    );
    await user.type(screen.getByLabelText("Your password"), "ilovecats");
    await user.click(screen.getByRole("button", { name: "Login" }));
    expect(tokenRepositorySpy.save).toHaveBeenCalled()
    
  });
});
