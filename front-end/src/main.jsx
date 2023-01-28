import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import app from "../lib/axios-config";
import Dashboard from "./dashboard";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { Login } from "./login";
import { SignUp } from "./sign-up";
// -------->
import "bootstrap/dist/css/bootstrap.min.css";
import { ForgotPassword } from "./pages/ForgotPassword";
// Add CSS

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route
        path="forgot-password"
        element={<ForgotPassword />}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            const result = await app.post("/send-email", data);

            return result.data;
          } catch (err) {
            console.log(err);
            throw err.response.data;
          }
        }}
        errorElement={<ForgotPassword />}
      />
      <Route
        path="sign-up"
        element={<SignUp />}
        action={async ({ request }) => {
          console.log("Hello");
          const data = Object.fromEntries(await request.formData());
          try {
            await app.post("/register", data);
            redirect("/login?register=true");
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        errorElement={<SignUp hasError />}
      />
      {/* Homepage */}
      {/* <Route index element={<App />}></Route> */}
      <Route
        path="login"
        element={<Login />}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            // needs validation need to check if login is successful
            const res = await app.post("/login", data);

            localStorage.setItem("token", res.data.token);
            sessionStorage.setItem("welcome", "true");

            return redirect("/dashboard");
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        errorElement={<Login hasError />}
      />
    </Route>,
    <Route path="dashboard" element={<Dashboard />} />,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
