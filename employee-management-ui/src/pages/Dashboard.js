import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div className="container mt-4">

      <h2>
        Dashboard
      </h2>

      <div className="row mt-4">

        <div className="col-md-4">

          <div className="card">

            <div className="card-body">

              <h5>
                Employees
              </h5>

              <Link
                to="/employees"
                className="btn btn-primary"
              >
                Manage
              </Link>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card">

            <div className="card-body">

              <h5>
                Add Employee
              </h5>

              <Link
                to="/add"
                className="btn btn-success"
              >
                Add
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;