import { Alert } from "react-bootstrap";
import { Form, useActionData, useRouteError } from "react-router-dom";
import "../App.css";

export function ForgotPassword() {
  let actionData = useActionData();
  let error = useRouteError();

  return (
    <Form method="post">
      <div class="container-1">
        <div class="card text-center container-forgot" style={{ width: 340 }}>
          <div class="card-header h5 text-white bg-primary">Password Reset</div>
          <div class="card-body px-5">
            <p class="card-text py-2">
              Enter your email address and we'll send you an email with a new
              password.
            </p>
            <div class="form-outline">
              <input
                type="email"
                name="email"
                id="typeEmail"
                class="form-control my-3"
              />
              <label
                class="form-label"
                for="typeEmail"
                placeholder="Enter Email Address"
              ></label>
            </div>
            <button type="submit" class="btn btn-primary w-100">
              Reset password
            </button>
            {error?.message && (
              <Alert style={{ marginTop: 12 }} variant="danger">
                {error.message}
              </Alert>
            )}
            {actionData?.message && (
              <Alert style={{ marginTop: 12 }} variant="success">
                {actionData?.message}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}
