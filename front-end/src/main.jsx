import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import app from "../lib/axios-config";
import Dashboard from "./pages/dashboard";
import Collection from "./pages/collection";
import { Layout } from "./components/Layout";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from "react-router-dom";
import { Login } from "./pages/login";
import { SignUp } from "./pages/sign-up";
import AddCollection from "./pages/AddCollection";
import { ToastContainer, toast } from "react-toastify";

// -------->
import { ForgotPassword } from "./pages/ForgotPassword";
import { UserList } from "./components/UserList";
import { UserProfile } from "./components/UserProfile";
import Post from "./pages/Post";
import { MyCollection } from "./pages/MyCollection";
import SeeUnlockedCollection from "./pages/SeeUnlockedCollection";
// ---------

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route element={<Layout />}>
        <Route
          path="users"
          element={<UserList />}
          loader={async () => {
            try {
              const result = await app.get("/userlist", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              return result.data;
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        <Route
          path="profile"
          element={<UserProfile />}
          action={async ({ request }) => {
            const data = Object.fromEntries(await request.formData());
            try {
              const user = localStorage.getItem("collector_id");
              await app.put(`/user/${user}`, data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              toast("🦄 Edit Successful!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            } catch (err) {
              console.log(err);
              throw err.response.data;
            }
            return null;
          }}
          loader={async () => {
            try {
              const result = await app.get(
                "/user/" + localStorage.getItem("collector_id"),
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return result.data[0];
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
          errorElement={<UserProfile />}
        ></Route>

        {/* postId*/}
        <Route
          path="/posts/:postId/like"
          action={async ({ request, params }) => {
            if (request.method === "DELETE") {
              await app.delete(`/posts/${params.postId}/likes`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
            } else if (request.method === "POST") {
              await app.post(
                `/posts/${params.postId}/likes`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
            }
            return redirect(`/posts/${params.postId}`);
          }}
        ></Route>
        <Route
          path="/post/:postId/comments"
          action={async ({ request, params }) => {
            const formData = Object.fromEntries(await request.formData());
            if (request.method === "PATCH") {
              try {
                const editComment = await app.patch(
                  `/comments/${formData.comment_id}`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                return redirect(`/posts/${params.postId}`);
              } catch (error) {
                console.log(error);
                throw error;
              }
            }
          }}
        ></Route>
        <Route
          path="/posts/:postId"
          element={<Post />}
          action={async ({ request, params }) => {
            const formData = Object.fromEntries(await request.formData());

            if (request.method === "DELETE" && "comment_id" in formData) {
              try {
                const deleteComment = await app.delete(
                  `/comments/${formData.comment_id}`,

                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                return deleteComment;
              } catch (error) {
                console.log(error);
                throw error;
              }
            } else if (
              request.method === "DELETE" &&
              Object.keys(formData).length != 0
            ) {
              const deletePost = await app.delete(
                `/me/posts/${params.postId}`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              return redirect("/dashboard");
            }
            if (request.method === "PATCH") {
              try {
                const editComment = await app.patch(
                  `/comments/${formData.comment_id}`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                return editComment;
              } catch (error) {
                console.log(error);
                throw error;
              }
            }
            if (request.method === "POST") {
              try {
                // needs validation need to check if login is successful
                const res = await app.post(
                  `/posts/${params.postId}/comments`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                return res.data;
              } catch (err) {
                console.log(err);
                throw err;
              }
            }
          }}
          loader={async ({ params }) => {
            try {
              const result = await app.get(
                `/posts/${params.postId}`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const commentResult = await app.get(
                `/posts/${params.postId}/comments`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const getUsername = await app.get(
                `/userlist/${params.postId}`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return [
                result.data.post,
                commentResult.data,
                result.data.likeCount,
                result.data.likePost,
                getUsername.data,
              ];
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        {/* See Unlocked Collections */}
        <Route
          path="/collections/:collectionId"
          element={<SeeUnlockedCollection />}
          loader={async ({ request, params }) => {
            try {
              const insideCollection = await app.get(
                `/collection-items/${params.collectionId}`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const collection = await app.get(
                `/collections/${params.collectionId}`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return {
                posts: insideCollection.data.posts,
                collection: collection.data,
              };
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        {/* Collections */}
        <Route
          path="/collectors/:collectorId/unlocked"
          // element={<Collection />}
          action={async ({ request, params }) => {
            const data = Object.fromEntries(await request.formData());

            try {
              const user = localStorage.getItem("collector_id");
              await app.post(`/unlocked-collections`, data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
            } catch (err) {
              console.log(err);
              throw err.response.data;
            }
            return redirect(`/collectors/${params.collectorId}`);
          }}
        ></Route>
        <Route
          path="/collectors/:collectorId/"
          element={<Collection />}
          loader={async ({ params }) => {
            try {
              const result = await app.get(
                `/collectors/${params.collectorId}/collections`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return result.data;
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        {/* Add Collection */}
        <Route
          path="/add-collection"
          element={<AddCollection />}
          action={async ({ request }) => {
            const data = Object.fromEntries(await request.formData());
            try {
              const result = await app.post("/collections", data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });

              return result.data;
            } catch (err) {
              console.log(err);
              throw err.response.data;
            }
          }}
        />

        {/*See Own Collection */}
        <Route
          path="/me/collections"
          element={<MyCollection />}
          // EDIT-----
          action={async ({ request, params }) => {
            const formData = Object.fromEntries(await request.formData());

            try {
              const deleteCollection = await app.delete(
                `/collections/${formData.collection_id}`,

                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              return redirect("/dashboard");
            } catch (error) {
              console.log(error);
              throw error;
            }
          }}
          // EDIT-----
          loader={async () => {
            try {
              const result = await app.get(
                `/me/collections`,
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return result.data;
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>

        <Route
          path="dashboard"
          element={<Dashboard />}
          loader={async () => {
            try {
              const result = await app.get(
                "/posts",
                // Pass the token and headers----------------
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              return result.data.posts; // Expects object from backend
            } catch (err) {
              console.log(err);
              throw err;
            }
          }}
        ></Route>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            const result = await app.post("/send-email", data);

            return result.data;
          } catch (err) {
            console.log(err);
            throw err.response.data;
          }
        }}
        errorElement={<ForgotPassword />}
      />

      <Route
        path="sign-up"
        element={<SignUp />}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            await app.post("/register", data);
            return redirect("/login?register=true");
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        errorElement={<SignUp hasError />}
      />

      <Route
        path="login"
        element={<Login />}
        action={async ({ request }) => {
          const data = Object.fromEntries(await request.formData());
          try {
            // needs validation need to check if login is successful
            const res = await app.post("/login", data);

            app.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token}`;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("collector_id", res.data.id);
            sessionStorage.setItem("welcome", "true");

            return redirect("/dashboard");
          } catch (err) {
            console.log(err);
            throw err;
          }
        }}
        errorElement={<Login hasError />}
      />
    </Route>,
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
