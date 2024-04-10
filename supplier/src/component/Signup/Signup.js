import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Signup() {
 const history = useHistory();
 const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
      username: "",
      password: "",
    });
  
    function handleChange(evt) {
      const name = evt.target.name;
      const value = evt.target.value;
      setData({
        ...data,
        [name]: value,
      });
    }
  
    const onSubmitForm = async (e) => {
      try {
        e.preventDefault();
  
        const res = await axios({
          method: "post",
          baseURL: "http://localhost:8070",
          url: "/api/user/customer/signup",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log(res.data);
        alert("Data Saved Successfully!");
        history.push("/");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert(error)
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

                      <form noValidate onSubmit={(e) => onSubmitForm(e)}>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="username"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address"
                            title="Username should only contain lowercase letters. e.g. john"
                            value={data.username}
                            onChange={handleChange}
                          
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
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            
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
