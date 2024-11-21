import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Fill in email.");
      return;
    }
    if (!password) {
      setPasswordError("Fill in password.");
      return;
    }

    try {
      const response = await fetch("http://13.40.190.253:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const data = await response.json();
      console.log("Login successful", data);

      if (rememberMe) {
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        sessionStorage.setItem("accessToken", data.accessToken);
      }

      navigate("/movies");
    } catch (err) {
      setEmailError(err.message);
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center justify-center w-full h-full"
        onSubmit={handleSubmit}
      >
        <div className="lg:w-[300px] w-full">
          <h1 className="mb-10 text-heading-1 text-white text-center">
            Sign in
          </h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <CheckBox
            label="Remember me"
            className="w-full items-center justify-center"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Button text="Login" type="submit" />
        </div>
      </form>
    </div>
  );
}
