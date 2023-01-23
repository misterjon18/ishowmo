import { Form } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
export function SignUp({ hasError }) {
  return (
    <section>
      <h1>Sign Up</h1>
      {hasError && <p>An error has occurred. Please try again...</p>}
      <Form id="sign-upform">
        <label htmlFor="username"> Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="picture">Picture</label>
        <input type="file" id="picture" name="picture" />
        <ImageUpload />

        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" />
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="street">Street :</label>
        <input type="text" id="street" name="street" />
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" />
        <label htmlFor="province">Province:</label>
        <input type="text" id="province" name="province" />
        <label htmlFor="zip">Zip Code:</label>
        <input type="text" id="zip" name="zip" />
        <label htmlFor="phone">Phone :</label>
        <input type="text" id="phone" name="phone" />
        <label htmlFor="birth_date">Birth Date :</label>
        <input type="text" id="birth_date" name="birth_date" />
        <label htmlFor="sex">Gender :</label>
        <input type="text" id="sex" name="sex" />
        <label htmlFor="country">Country :</label>
        <input type="text" id="country" name="country" />
        <input type="submit" value="Sign Up" />
      </Form>
    </section>
  );
}
