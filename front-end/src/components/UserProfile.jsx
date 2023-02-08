import {
  useLoaderData,
  useActionData,
  useRouteError,
  Form,
} from "react-router-dom";
import { useState } from "react";

export const UserProfile = () => {
  const profile = useLoaderData();
  console.log(profile);

  let error = useRouteError();
  // const [profile1, setProfile1] = useState(useLoaderData());
  // const [first_name, setFirstName] = useState(profile.first_name);
  // const [username, setUserName] = useState(profile.username);
  // const [last_name, setLastName] = useState(profile.last_name);
  // const [email, setEmail] = useState(profile.email);
  // const [street, setStreet] = useState(profile.street);
  // const [city, setCity] = useState(profile.city);
  // const [province, setProvince] = useState(profile.province);
  // const [zip, setZip] = useState(profile.zip);
  // const [phone, setPhone] = useState(profile.phone);
  // const [birth_date, setBirthDate] = useState(profile.birth_date);
  // const [sex, setSex] = useState(profile.sex);
  // const [country, setCountry] = useState(profile.country);
  // const updateProfile = async (id) => {
  //   const response = await fetch("http://localhost:8000/user/" + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: {
  //       first_name: first_name,
  //       last_name: last_name,
  //       email: email,
  //       street: street,
  //       city: city,
  //       province: province,
  //       zip: zip,
  //       phone: phone,
  //       birth_date: birth_date,
  //       sex: sex,
  //       country: country,
  //       username: username,
  //     },
  //   });
  // };
  if (typeof profile === "undefined") {
    return <div>loading...</div>;
  }
  return (
    <div className="container-xl px-4 mt-4">
      <div className="col-xl-8">
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
                  // onChange={(e) => {
                  //   setUserName(e.target.value);
                  // }}
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
                    // onChange={(e) => {
                    //   setFirstName(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setLastName(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setStreet(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setZip(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setCity(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setProvince(e.target.value);
                    // }}
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
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  // }}
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
                    // onChange={(e) => {
                    //   setPhone(e.target.value);
                    // }}
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
                    // onChange={(e) => {
                    //   setBirthDate(e.target.value);
                    // }}
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
                  // onChange={(e) => {
                  //   setSex(e.target.value);
                  // }}
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
                  // onChange={(e) => {
                  //   setSex(e.target.value);
                  // }}
                />
                <label class="form-check-label" for="radio2">
                  Female
                </label>
              </div>
              {/* <!-- Edit button--> */}
              <button
                // onClick={updateProfile(localStorage.getItem("collector_id"))}
                className="btn btn-primary"
                type="submit"
              >
                Edit
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
