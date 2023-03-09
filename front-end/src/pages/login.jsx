import { Form, useSearchParams } from "react-router-dom";
import "../App.css";
// ADD CSS
import React from "react";

export const Login = ({ hasError }) => {
  const params = useSearchParams();
  const notify = () => toast("Login successful !");
  return (
    <>
      <section className="vh-100">
        {useSearchParams.register == "true" && (
          <p>You have successfully registered! Please login.</p>
        )}
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4" style={{ padding: "0px" }}>
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0">
                  <img
                    alt="jigsaw-puzzle"
                    id="brandLogo1"
                    src="/src/assets/ishowmoLogo.png"
                    style={{ width: "40%" }}
                  />{" "}
                </span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-4  pt-xl-0 mt-xl-n5">
                <Form method="post" style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      name="username"
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" for="form2Example17">
                      Username
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" for="form2Example27">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                      id="login"
                    >
                      Login
                    </button>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="forgot-password">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="./sign-up" className="link-info">
                      Register here
                    </a>
                  </p>
                  {/* hasError------- */}
                  {hasError && (
                    <div className="alert alert-danger" role="alert">
                      An error has occurred. Please try again.
                    </div>
                  )}
                  {/* hasError */}
                </Form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
