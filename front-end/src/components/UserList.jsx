import { Link, useLoaderData } from "react-router-dom";

import "../styles/UserList.css";
export const UserList = () => {
  const users = useLoaderData();
  console.log(users);

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
              {users.map((user, index) => (
                <tr key={user.username}>
                  <th scope="row" className="col-3">
                    {index + 1}
                  </th>

                  <td className="col-3">{user.first_name}</td>

                  <td className="col-3">{user.last_name}</td>
                  <td className="col-3">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/collectors/${user.collector_id}`}
                    >
                      {user.username}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
