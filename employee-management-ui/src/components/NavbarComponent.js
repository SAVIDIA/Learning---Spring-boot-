import {
  Link
} from "react-router-dom";

function NavbarComponent() {

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Employee Management
        </Link>

        <div>

          <Link
            className="btn btn-success me-2"
            to="/add"
          >
            Add Employee
          </Link>

          <Link
            className="btn btn-warning"
            to="/search"
          >
            Search
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default NavbarComponent;