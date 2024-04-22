import { useEffect, useState } from "react";
import "./Login.css";
import { EmailField } from "../components/EmailField.js";
import { PasswordField } from "../components/PasswordField.js";
import { Title } from "../components/Title.js";
import { Button } from "../components/Button.js";
import { translateError } from "../utils/translateError.js";
import { TokenRepository } from "../domain/TokenRepository.js";
import { Router } from "../domain/Router.js";
import { Auth } from "../domain/Auth.js";

type LoginProps = {
  router: Router;
  tokenRepository: TokenRepository
  authService: Auth
};

export const Login = ({ router, tokenRepository, authService }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage(null);
  }, [email, password]);

  return (
    <main className="login-container">
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          setIsLoading(true);
          setErrorMessage(null);

          authService.login(email, password)
            .then((jwt) => {
              tokenRepository.save(jwt);
            })
            .then(() => {
              router.goToRecipes()
            })
            .catch((error) => {
              setErrorMessage(error.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }}
      >
        <Title>Login with email</Title>
        <p>Enter your email address to login with your account.</p>

        <EmailField
          id="email"
          labelText="Your email"
          value={email}
          onChange={setEmail}
        />
        <PasswordField
          id="password"
          labelText="Your password"
          value={password}
          onChange={setPassword}
        />
        {errorMessage && <p>{translateError(errorMessage)}</p>}
        <Button title="Login" disabled={isLoading} />
      </form>
    </main>
  );
};
