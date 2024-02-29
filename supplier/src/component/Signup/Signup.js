import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8070/newsignup", {
        username,
        password,
      });

      console.log(response.data);
      alert("Successfully signing up");
      history.push("/"); // Navigate to the login page
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(`Error signing up ${error}`, error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form onSubmit={handleSignUp}>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address"
                            title="Username should only contain lowercase letters. e.g. john"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                          </label>
                          <input
                            minlength="8"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Enter Password"
                            id="myInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            onChange={togglePasswordVisibility}
                          />
                          <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                          </label>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: "15px" }}>
                          <i className="fas fa-user-plus"></i>
                          &nbsp;Signup
                        </button>
                        <div className="text-center text-lg-start mt-4 pt-2">
                          <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                            Do you have an account? <a href="/" style={{ color: "#393f81" }}>Login here</a>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                alt="signup form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
