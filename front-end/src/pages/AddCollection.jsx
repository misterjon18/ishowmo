import React from "react";
import { ToastContainer } from "react-bootstrap";
import { Form } from "react-router-dom";

export default function AddCollection() {
  return (
    <>
      <Form method="post">
        <div className="container" style={{ backgroundColor: "green" }}>
          <div className="mb-3 my-5 row">
            <label for="inputType" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="type"
                name="name"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="inputType" className="col-sm-2 col-form-label">
              Type
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="type"
                name="type"
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label for="required_points" className="col-sm-2 col-form-label">
              Required Points
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
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
