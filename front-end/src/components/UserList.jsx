import { useLoaderData } from "react-router-dom";

// import "../styles/UserList.css";
export const UserList = () => {
  const users = useLoaderData();

  return (
    <>
      <div className="container">
        <div
          style={{
            overflowY: "auto",
            maxHeight: "200",
          }}
        >
          <table className="table table-fixed">
            <thead>
              <tr>
                <th scope="col" className="col-3">
                  #
                </th>
                <th scope="col" className="col-3">
                  First
                </th>
                <th scope="col" className="col-3">
                  Last
                </th>
                <th scope="col" className="col-3">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ...users,
                ...users,
                ...users,
                ...users,
                ...users,
                ...users,
                ...users,
              ].map((user, index) => (
                <tr key={user.username}>
                  <th scope="row" className="col-3">
                    {index + 1}
                  </th>
                  <td className="col-3">{user.first_name}</td>
                  <td className="col-3">{user.last_name}</td>
                  <td className="col-3">{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
