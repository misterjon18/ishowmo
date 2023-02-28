import React from "react";
import { ToastContainer } from "react-bootstrap";
import { Form } from "react-router-dom";

export default function AddCollection() {
  return (
    <>
      <Form method="post">
        <div className="container">
          <div class="mb-3 row">
            <label for="staticEmail" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="Name"
                name="name"
              />
            </div>
          </div>
          <div class="mb-3 row">
            <label for="inputType" class="col-sm-2 col-form-label">
              Type
            </label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="type" name="type" />
            </div>
          </div>
          {/* section */}
          <div class="mb-3 row">
            <label for="required_points" class="col-sm-2 col-form-label">
              Required Points
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="required_points"
                name="required_points"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
