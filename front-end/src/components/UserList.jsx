import { useLoaderData } from "react-router-dom";
import "../styles/UserList.css";
export const UserList = () => {
  const users = useLoaderData();

  return (
    <>
      <div class="container text-center text-white">
        <div class="row pt-5">
          <div class="col-lg-8 mx-auto">
            <h1 class="display-4">Collectors List</h1>
            <p class="lead mb-0">
              Build a bootstrap table with a fixed header and scrollable body
              using Bootstrap 4.
            </p>
          </div>
        </div>
      </div>

      <div class="container py-5">
        <div class="row">
          <div class="col-lg-7 mx-auto bg-white rounded shadow">
            {/* <!-- Fixed header table--> */}
            <div class="table-responsive">
              <table class="table table-fixed">
                {users.map((user, index) => (
                  <>
                    <thead key={user.username}>
                      <tr>
                        <th scope="col" class="col-3">
                          #
                        </th>
                        <th scope="col" class="col-3">
                          First
                        </th>
                        <th scope="col" class="col-3">
                          Last
                        </th>
                        <th scope="col" class="col-3">
                          Username
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" class="col-3">
                          {index + 1}
                        </th>
                        <td class="col-3">{user.first_name}</td>
                        <td class="col-3">{user.last_name}</td>
                        <td class="col-3">{user.username}</td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// WORKING CODE

{
  /* <table>
{users.map((user) => (
  <tr key={user.username}>
    <td>{user.username}</td>
    <td>{user.first_name}</td>
  </tr>
))}
</table> */
}
