import "../App.css";
export function ForgotPassword() {
  return (
    <div class="container-1">
      <div class="card text-center container-forgot" style={{ width: 340 }}>
        <div class="card-header h5 text-white bg-primary">Password Reset</div>
        <div class="card-body px-5">
          <p class="card-text py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <div class="form-outline">
            <input type="email" id="typeEmail" class="form-control my-3" />
            <label
              class="form-label"
              for="typeEmail"
              placeholder="Enter Email Address"
            ></label>
          </div>
          <a href="#" class="btn btn-primary w-100">
            Reset password
          </a>
        </div>
      </div>
    </div>
  );

  // Form
  //   - Input field na for email
  // - Button "Reset Password"

  //
}
