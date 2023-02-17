
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies] = useCookies([]);
  const history = useHistory();
  useEffect(() => {
    if (cookies.jwt) {
      history.push("/");
    }
  }, [cookies, history]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          history.push("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    
        <div className="login-form">
            <h3>Login </h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => 
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) =>
                        setValues({ ...values, [e.target.name]: e.target.value })
                    }
                />
                </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>
        <div>
            Don't have an account ? <a href="/signup">Sign Up</a>
        </div>
      </form>
      <ToastContainer />
    </div>
    
  );
}

export default Login;
