import { Form, useSearchParams } from "react-router-dom";
import "../App.css";
// ADD CSS
import React from "react";
// EDIT --------

// export function Login({ hasError }) {
//   const params = useSearchParams();

//   return (
//     <section>
//       {/* {useSearchParams.register == "true" && (
//         <p>You have successfully registered! Please login.</p>
//       )} */}

//       <>
//         <h1 id="login-msg">Welcome to iSHOWMO</h1>
//         <div class=" d-flex justify-content-center align-items-center">
//           <div class="col-md-4 p-5 shadow-sm border rounded-5 border-primary">
//             <h2 class="text-center mb-4 text-primary">Login </h2>
//             <Form method="post">
//               <div class="mb-3">
//                 <label for="username" class="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   class="form-control bg-info bg-opacity-10 border border-primary"
//                   id="username"
//                   aria-describedby="emailHelp"
//                 />
//               </div>
//               <div class="mb-3">
//                 <label for="password" class="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   class="form-control bg-info bg-opacity-10 border border-primary"
//                   id="password"
//                 />
//               </div>
//               <p class="small">
//                 <a class="text-primary" href="forgot-password">
//                   Forgot password?
//                 </a>
//               </p>
//               <div class="d-grid">
//                 <button class="btn btn-primary" type="submit" id="login">
//                   Login
//                 </button>
//               </div>
//             </Form>
//             <div class="mt-3">
//               <p class="mb-0  text-center">
//                 Don't have an account?{" "}
//                 <a href="./sign-up" class="text-primary fw-bold">
//                   Sign Up
//                 </a>
//               </p>
//               {hasError && (
//                 <div class="alert alert-danger" role="alert">
//                   An error has occurred. Please try again.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </>
//     </section>
//   );
// }

// EDIT _----------

export const Login = ({ hasError }) => {
  const params = useSearchParams();
  return (
    <>
      <section class="vh-100">
        {useSearchParams.register == "true" && (
          <p>You have successfully registered! Please login.</p>
        )}
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6 text-black">
              <div class="px-5 ms-xl-4">
                <i
                  class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span class="h1 fw-bold mb-0">ISHOWMO LOGO</span>
              </div>

              <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <Form method="post" style={{ width: "23rem" }}>
                  <h3
                    class="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div class="form-outline mb-4">
                    <input
                      name="username"
                      type="text"
                      id="username"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="form2Example17">
                      Username
                    </label>
                  </div>

                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="form2Example27">
                      Password
                    </label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button
                      class="btn btn-info btn-lg btn-block"
                      type="submit"
                      id="login"
                    >
                      Login
                    </button>
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-muted" href="forgot-password">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="./sign-up" class="link-info">
                      Register here
                    </a>
                  </p>
                  {/* hasError------- */}
                  {hasError && (
                    <div class="alert alert-danger" role="alert">
                      An error has occurred. Please try again.
                    </div>
                  )}
                  {/* hasError */}
                </Form>
              </div>
            </div>
            <div class="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image"
                class="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};
