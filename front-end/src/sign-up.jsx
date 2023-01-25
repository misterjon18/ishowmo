import { Form } from "react-router-dom";
// import ImageUpload from "./components/ImageUpload";

import "./styles/sign-up.css";
import { useRef } from "react";

export function SignUp({ hasError }) {
  return (
    <Form method="post">
      <div class="wrapper rounded bg-white">
        {hasError && <p>An error has occurred. Please try again...</p>}

        <div class="h3">Registration Form</div>

        <div class="form">
          {/*  */}

          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Birthday</label>
              <input
                type="date"
                name="birth_date"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Gender</label>
              <div class="d-flex align-items-center mt-2">
                <label class="option">
                  <input type="radio" name="sex" value="M" />
                  Male
                  <span class="checkmark"></span>
                </label>
                <label class="option ms-4">
                  <input type="radio" name="sex" value="F" />
                  Female <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Email</label>
              <input type="email" name="email" class="form-control" required />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Phone Number</label>
              <input type="tel" name="phone" class="form-control" required />
            </div>
          </div>

          {/* ---- */}
          <div class="col-md-9 pe-5">
            <input
              class="form-control form-control-lg"
              id="formFileLg"
              type="file"
            />

            <div class="small text-muted mt-2">
              Upload your image file . Max file size 50 MB
            </div>
          </div>
          {/* Personal Info */}
          <header>HEADER</header>
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Street</label>
              <input type="text" name="street" class="form-control" />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>City</label>
              <input type="text" name="city" class="form-control" />
            </div>
          </div>

          {/* ------- */}
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Province</label>
              <input type="text" name="province" class="form-control" />
            </div>
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Zip Code</label>
              <input type="text" name="zip" class="form-control" />
            </div>
          </div>
          {/* ------ */}
          <div class="row">
            <div class="col-md-6 mt-md-0 mt-3">
              <label>Country</label>
              <input type="text" name="country" class="form-control" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}
