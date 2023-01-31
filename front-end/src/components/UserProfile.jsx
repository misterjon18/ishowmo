import { useLoaderData } from "react-router-dom";

export const UserProfile = () => {
  const profile = useLoaderData();
  console.log(profile);
  return;
};
