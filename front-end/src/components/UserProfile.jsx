import {
  useLoaderData,
  useActionData,
  useRouteError,
  Form,
} from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserProfile = () => {
  const profile = useLoaderData();

  // const notify = toast.success("🦄 Wow so easy!", {
  //   position: "top-right",
  //   autoClose: 2000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  // });

  let error = useRouteError();
  if (typeof profile === "undefined") {
    return <div>loading...</div>;
  }
  return (
    <div className="container-xl px-4 mt-4">
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <div className="col-xl-8" style={{ margin: "auto" }}>
        {/* <!-- Account details card--> */}
        <div className="card mb-4">
          <div className="card-header">Account Details</div>
          <div className="card-body">
            <Form method="post">
              {/* <!-- Form Group (username)--> */}
              <div className="mb-3">
                <label className="small mb-1">Username</label>
                <input
                  defaultValue={profile.username}
                  name="username"
                  className="form-control"
                  id="inputUsername"
                  type="text"
                />
              </div>
              {/* <!-- Form Row--> */}
              <div className="row gx-3 mb-3">
                {/* <!-- Form Group (full name)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">First Name</label>
                  <input
                    className="form-control"
                    name="first_name"
                    id="inputFirstName"
                    type="text"
                    defaultValue={profile.first_name}
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1">Last Name</label>
                  <input
                    className="form-control"
                    name="last_name"
                    id="inputLastName"
                    type="text"
                    defaultValue={profile.last_name}
                  />
                </div>
                {/* <!-- Form Group (street)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">Street</label>
                  <input
                    className="form-control"
                    name="street"
                    id="inputStreet"
                    type="text"
                    defaultValue={profile.street}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1">Zip Code</label>
                  <input
                    className="form-control"
                    name="zip"
                    id="inputZip"
                    type="text"
                    defaultValue={profile.zip}
                  />
                </div>
              </div>
              {/* <!-- Form Row        --> */}
              <div className="row gx-3 mb-3">
                {/* <!-- Form Group (city)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">City</label>
                  <input
                    className="form-control"
                    name="city"
                    id="inputOrgName"
                    type="text"
                    defaultValue={profile.city}
                  />
                </div>
                {/* <!-- Form Group (region)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">Province</label>
                  <input
                    className="form-control"
                    name="province"
                    id="inputLocation"
                    type="text"
                    defaultValue={profile.province}
                  />
                </div>
              </div>
              {/* <!-- Form Group (email address)--> */}
              <div className="mb-3">
                <label className="small mb-1">Email address</label>
                <input
                  className="form-control"
                  name="email"
                  id="inputEmailAddress"
                  type="email"
                  defaultValue={profile.email}
                />
              </div>
              {/* <!-- Form Row--> */}
              <div className="row gx-3 mb-3">
                {/* <!-- Form Group (phone number)--> */}
                <div className="col-md-6">
                  <label className="small mb-1">Phone number</label>
                  <input
                    className="form-control"
                    name="phone"
                    id="inputPhone"
                    type="tel"
                    defaultValue={profile.phone}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1">Birthday</label>
                  <input
                    className="form-control"
                    name="birth_date"
                    id="inputBirthday"
                    type="date"
                    defaultValue={new Date(profile.birth_date)
                      .toISOString()
                      .substring(0, 10)}
                  />
                </div>
              </div>
              {/* Radio button for Gender */}
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="radio1"
                  name="sex"
                  defaultChecked={profile.sex === "M"}
                  value="M"
                />
                <label class="form-check-label" for="radio1">
                  Male
                </label>
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="radio2"
                  name="sex"
                  defaultChecked={profile.sex === "F"}
                  value="F"
                />
                <label class="form-check-label" for="radio2">
                  Female
                </label>
              </div>
              {/* Country  */}
              <div className="col-md-6">
                <label className="small mb-1">Country</label>
                <input
                  className="form-control"
                  name="country"
                  id="inputCountry"
                  type="text"
                  defaultValue={profile.country}
                />
              </div>
              {/* <!-- Edit button--> */}
              <button className="btn btn-primary" type="submit">
                Edit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
