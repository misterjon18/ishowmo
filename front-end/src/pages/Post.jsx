import { useLoaderData } from "react-router-dom";

export default function Post() {
  const post = useLoaderData();
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-6 my-5 ">
            <img src={"/" + post.source} style={{ width: "100%" }} />
          </div>
          {/* EDIT */}
          <div class="col-6">
            <div
              class="container my-5 py-5 text-dark"
              style={{ backgroundColor: "#f0f2f5", marginLeft: "auto" }}
            >
              <div class="row d-flex justify-content-center">
                <div class="col-md-11 col-lg-9 col-xl-7">
                  <div class="d-flex flex-start mb-4">
                    <img
                      class="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div class="card w-100">
                      <div class="card-body p-4">
                        <div class="">
                          <h5>Johny Cash</h5>
                          <p class="small">3 hours ago</p>
                          <p>
                            Cras sit amet nibh libero, in gravida nulla. Nulla
                            vel metus scelerisque ante sollicitudin. Cras purus
                            odio, vestibulum in vulputate at, tempus viverra
                            turpis. Fusce condimentum nunc ac nisi vulputate
                            fringilla. Donec lacinia congue felis in faucibus
                            ras purus odio, vestibulum in vulputate at, tempus
                            viverra turpis.
                          </p>

                          <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                              <a href="#!" class="link-muted me-2">
                                <i class="fas fa-thumbs-up me-1"></i>1000
                              </a>
                              <a href="#!" class="link-muted">
                                <i class="fas fa-thumbs-down me-1"></i>155
                              </a>
                            </div>
                            <a href="#!" class="link-muted">
                              <i class="fas fa-reply me-1"></i>Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex flex-start">
                    <img
                      class="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div class="card w-100">
                      <div class="card-body p-4">
                        <div class="">
                          <h5>Mindy Campbell</h5>
                          <p class="small">5 hours ago</p>
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Delectus cumque doloribus dolorum dolor
                            repellat nemo animi at iure autem fuga cupiditate
                            architecto ut quam provident neque, inventore nisi
                            eos quas?
                          </p>

                          <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                              <a href="#!" class="link-muted me-2">
                                <i class="fas fa-thumbs-up me-1"></i>158
                              </a>
                              <a href="#!" class="link-muted">
                                <i class="fas fa-thumbs-down me-1"></i>13
                              </a>
                            </div>
                            <a href="#!" class="link-muted">
                              <i class="fas fa-reply me-1"></i> Edit
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
