import { useState } from "react";

import {
  Navigate,
  useNavigate,
  Link
} from "react-router-dom";

import {
  login
} from "../services/authService";

import {
  getRole,
  isLoggedIn,
  saveAuthData
} from "../utils/auth";

function LoginPage() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      username: "",
      password: ""
    });

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const submit = async (e) => {

    e.preventDefault();

    setErrorText("");

    try {
      setLoading(true);

      const response =
        await login(form);

      saveAuthData(
        response.data.data
      );

      const role = getRole();

      if (role === "EMPLOYEE") {
        navigate("/profile");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      setErrorText(
        error?.response?.data?.message ||
        "Invalid credentials. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">
                Login
              </h3>

              {
                errorText &&
                <div className="alert alert-danger py-2">
                  {errorText}
                </div>
              }

              <form onSubmit={submit}>

                <div className="mb-3">

                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </button>

              </form>

              <div className="text-center mt-3">

                <small className="text-muted">
                  Admin can register users from sidebar after login.
                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;