import { Form, useSearchParams } from "react-router-dom";
import "./App.css";
// ADD CSS
import React from "react";

export function Login({ hasError }) {
  const params = useSearchParams();

  return (
    <section>
      {hasError && <p>An error has occurred. Please try again.TESTING</p>}
      {useSearchParams.register == "true" && (
        <p>You have successfully registered! Please login.</p>
      )}
      {/* <h2 id="login-h2">LOG IN</h2>

      <div id="form">
        <Form method="post">
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <input id="login" type="submit" value="Log In" />
        </Form>
      </div> */}
      {/* ADD CSS */}
      <>
        <h1 id="login-msg">Welcome to iSHOWMO</h1>
        <div class="vh-100 d-flex justify-content-center align-items-center">
          <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
            <h2 class="text-center mb-4 text-primary">Login </h2>
            <form method="post">
              <div class="mb-3">
                <label for="username" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  class="form-control bg-info bg-opacity-10 border border-primary"
                  id="username"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  class="form-control bg-info bg-opacity-10 border border-primary"
                  id="password"
                />
              </div>
              <p class="small">
                <a class="text-primary" href="forget-password.html">
                  Forgot password?
                </a>
              </p>
              <div class="d-grid">
                <button class="btn btn-primary" type="submit" id="login">
                  Login
                </button>
              </div>
            </form>
            <div class="mt-3">
              <p class="mb-0  text-center">
                Don't have an account?{" "}
                <a href="signup.html" class="text-primary fw-bold">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    </section>
  );
}
