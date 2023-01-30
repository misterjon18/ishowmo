import { useLoaderData } from "react-router-dom";
export const UserList = () => {
  const users = useLoaderData();
  return (
    <>
      {users.map((user) => (
        <div key={user.username}>
          {user.username} {user.first_name}
        </div>
      ))}
    </>
  );
};
