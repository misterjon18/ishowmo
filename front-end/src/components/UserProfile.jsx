import {
  useLoaderData,
  useActionData,
  useRouteError,
  Form,
} from "react-router-dom";

export const UserProfile = () => {
  const profile = useLoaderData();
  // let actionData = useActionData();
  let error = useRouteError();
  console.log(error);

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
                <label className="small mb-1" htmlFor="inputUsername">
                  Username
                </label>
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
                  <label className="small mb-1" htmlFor="inputFirstName">
                    First Name
                  </label>
                  <input
                    className="form-control"
                    name="first_name"
                    id="inputFirstName"
                    type="text"
                    defaultValue={profile.first_name}
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputLastName">
                    Last Name
                  </label>
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
                  <label className="small mb-1" htmlFor="inputStreet">
                    Street
                  </label>
                  <input
                    className="form-control"
                    name="street"
                    id="inputStreet"
                    type="text"
                    defaultValue={profile.street}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputZip">
                    Zip Code
                  </label>
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
                  <label className="small mb-1" htmlFor="inputOrgName">
                    City
                  </label>
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
                  <label className="small mb-1" htmlFor="inputLocation">
                    Province
                  </label>
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
                <label className="small mb-1" htmlFor="inputEmailAddress">
                  Email address
                </label>
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
                  <label className="small mb-1" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className="form-control"
                    name="phone"
                    id="inputPhone"
                    type="tel"
                    defaultValue={profile.phone}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small mb-1" htmlFor="inputBirth_date">
                    Birthday
                  </label>
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
                  name="optradio"
                  defaultChecked={profile.sex === "M"}
                  value="option1"
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
                  name="optradio"
                  defaultChecked={profile.sex === "F"}
                  value="option2"
                />
                <label class="form-check-label" for="radio2">
                  Female
                </label>
              </div>
              {/* <!-- Save changes button--> */}
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

// export const UserProfile = () => {
//   const profile = useLoaderData();
//   console.log(profile);
//   return <div>HELLO !!!!</div>;
// };

// SQL FILE INTERACTION TABLE
// CREATE TABLE interaction(
//   interaction_id INTEGER REFERENCES collector(id),
//   collector_id INTEGER NOT NULL,
//   likes varchar(255) UNIQUE NOT NULL,
//   comments varchar(255) UNIQUE NOT NULL,
//   shares varchar(255) UNIQUE NOT NULL,
// id SERIAL PRIMARY KEY
// );
