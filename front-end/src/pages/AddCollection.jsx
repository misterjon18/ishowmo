import { React, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Form } from "react-router-dom";
import "../styles/AddCollection.css";

export default function AddCollection() {
  let [val, setVal] = useState("");
  // let [disabler, setDisabler] = useState(false);

  const changeVal = (e) => {
    setVal(e.target.value);
    // setDisabler(!disabler);
  };

  return (
    <>
      <Form method="post">
        <div className="container container-add-collection">
          <div className="mb-3 form-group-sm ">
            <label for="dropdown" className="form-label">
              Type
            </label>
            <select
              type="hidden"
              className="form-select"
              id="dropdown"
              name="type"
              defaultValue="Select option"
              onChange={(e) => {
                setVal(e.target.value);
              }}
            >
              <option value="public">public</option>
              <option value="private">private</option>
            </select>
          </div>
          <div className="mb-3 form-group-sm">
            <label for="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter collection name"
              name="name"
            />
          </div>

          <div className="mb-3 form-group-sm">
            <label for="required_points" class="form-label">
              Required points
            </label>
            <input
              type="text"
              className="form-control"
              id="required_points"
              placeholder="Enter required points"
              name="required_points"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}
