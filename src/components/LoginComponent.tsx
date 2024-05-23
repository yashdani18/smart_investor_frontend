import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type InputState = string;

const LoginComponent: React.FC = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");
  const [username, setUsername] = useState<InputState>("");
  const [password, setPassword] = useState<InputState>("");

  const navigate = useNavigate();

  //   const onLogin = () => {};

  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const rootURL =
    import.meta.env.VITE_APP_ENV === "development"
      ? import.meta.env.VITE_APP_LOCAL_ROOT_URL
      : import.meta.env.VITE_APP_SERVER_ROOT_URL;

  console.log(rootURL);
  console.log(import.meta.env.VITE_APP_ENV);

  function onLogin() {
    console.log(username, password);
    axios
      .post(`${rootURL}/api/auth`, { username: username, password: password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch(async (err) => {
        console.log(err.response.data.msg);
        setShowError(!showError);
        setErrorMessage(err.response.data.msg);
        await sleep(5000);
        setShowError(false);
        // setErrorMessage("");
      });
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="login">
          <div className="row-username">
            <h6 className="input-label mt-4" data-testid="cypress-title-here">
              Username
            </h6>
            <input
              type="text"
              placeholder="Username"
              className="border-2 border-zinc-950 text-center rounded-sm"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="row-password">
            <h6 className="input-label mt-4">Password</h6>
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-zinc-950 text-center"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {/* {{ showError } && <p className="text-center text-red-600">{errorMessage}</p>} */}
          <h1 className={"mt-2 text-center " + (showError ? "text-red-500" : "text-white")}>{errorMessage}</h1>
          <p className="mt-2 text-center">
            <a href="#" className="underline">
              Forgot Password?
            </a>
          </p>
          <div className="submit-login text-center">
            <button className="bg-slate-700 text-white p-2 mt-4" onClick={onLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
