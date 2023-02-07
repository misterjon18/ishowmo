import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import app from "../lib/axios-config";
import Dashboard from "./dashboard";
import { Layout } from "./components/Layout";
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
import { UserList } from "./components/UserList";
import { UserProfile } from "./components/UserProfile";

// Add CSS

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route element={<Layout />}>
        <Route
          path="users"
          element={<UserList />}
          loader={async () => {
            try {
              const result = await app.get("/userlist");
              console.log(result);
              console.log(result.data);
              return result.data;
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        <Route
          path="profile"
          element={<UserProfile />}
          loader={async () => {
            try {
              const result = await app.get(
                "/user/" + localStorage.getItem("collector_id"),
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              console.log(result.data);
              return result.data[0];
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
          errorElement={<UserProfile />}
        ></Route>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
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

            // EDITABLE
            app.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token}`;
            localStorage.setItem("token", res.data.token);

            // EDIT
            localStorage.setItem("collector_id", res.data.id);
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
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
