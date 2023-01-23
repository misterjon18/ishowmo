import { Form, useSearchParams } from "react-router-dom";
import "./App.css";
// ADD CSS
import React from "react";

export function Login({ hasError }) {
  const params = useSearchParams();

  return (
    <section>
      {useSearchParams.register == "true" && (
        <p>You have successfully registered! Please login.</p>
      )}

      {/* ADD CSS */}
      <>
        <h1 id="login-msg">Welcome to iSHOWMO</h1>
        <div class=" d-flex justify-content-center align-items-center">
          <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
            <h2 class="text-center mb-4 text-primary">Login </h2>
            <Form method="post">
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
                <a class="text-primary" href="forgot-password">
                  Forgot password?
                </a>
              </p>
              <div class="d-grid">
                <button class="btn btn-primary" type="submit" id="login">
                  Login
                </button>
              </div>
            </Form>
            <div class="mt-3">
              <p class="mb-0  text-center">
                Don't have an account?{" "}
                <a href="./sign-up" class="text-primary fw-bold">
                  Sign Up
                </a>
              </p>
              {hasError && (
                <div class="alert alert-danger" role="alert">
                  An error has occurred. Please try again.TESTING
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </section>
  );
}
