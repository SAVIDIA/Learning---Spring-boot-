import { Link } from "react-router-dom";

function LandingPage() {

  return (

    <div className="container-fluid">

      <div className="row min-vh-100 align-items-center">

        <div className="col-md-6 p-5">

          <h1 className="display-4 fw-bold">
            Employee Management System
          </h1>

          <p className="lead mt-4">

            Enterprise-grade Employee
            Management Application built
            using React, Node.js,
            Express and Oracle Database.

          </p>

          <div className="mt-4">

            <Link
              to="/login"
              className="btn btn-primary btn-lg me-3"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="col-md-6">

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Employees"
            className="img-fluid rounded shadow"
          />

        </div>

      </div>

    </div>

  );

}

export default LandingPage;