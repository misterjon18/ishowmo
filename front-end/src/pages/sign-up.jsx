import { Form } from "react-router-dom";
import { useState } from "react";
import "../styles/Sign-up.css";

export function SignUp({ hasError }) {
  return (
    <Form method="post">
      <div className="wrapper rounded bg-white">
        <div className="h3">Registration Form</div>

        <div className="form">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Birthday</label>
              <input
                type="date"
                name="birth_date"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Gender</label>
              <div className="d-flex align-items-center mt-2">
                <label className="option">
                  <input type="radio" name="sex" value="M" />
                  Male
                  <span className="checkmark"></span>
                </label>
                <label className="option ms-4">
                  <input type="radio" name="sex" value="F" />
                  Female <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                required
              />
            </div>
          </div>

          {/* ---- */}

          {/* Personal Info */}

          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Street</label>
              <input type="text" name="street" className="form-control" />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>City</label>
              <input type="text" name="city" className="form-control" />
            </div>
          </div>

          {/* ------- */}
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Province</label>
              <input type="text" name="province" className="form-control" />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Zip Code</label>
              <input type="text" name="zip" className="form-control" />
            </div>
          </div>
          {/* ------ */}
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <label>Country</label>
              <input type="text" name="country" className="form-control" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </div>
    </Form>
  );
}
