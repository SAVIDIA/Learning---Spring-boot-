import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { register } from "../services/authService";

function RegisterPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async (e) => {

    e.preventDefault();

    setMessage("");
    setErrorText("");

    try {
      setLoading(true);

      await register(form);

      setMessage("User registered successfully.");

      setForm({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: "EMPLOYEE"
      });

    } catch (error) {

      setErrorText(
        error?.response?.data?.message ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">
                Register User
              </h3>

              {
                message &&
                <div className="alert alert-success py-2">
                  {message}
                </div>
              }

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
                    name="fullName"
                    className="form-control"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <select
                    name="role"
                    className="form-select"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>

              </form>

              <button
                className="btn btn-link w-100 mt-3"
                onClick={() => navigate("/dashboard")}
                type="button"
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RegisterPage;
