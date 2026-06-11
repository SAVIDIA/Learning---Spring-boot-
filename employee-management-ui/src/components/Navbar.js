import {
    Link,
    useNavigate
}
from "react-router-dom";

import {
    getUsername,
    getRole,
    logout
}
from "../utils/auth";

function Navbar() {

    const navigate =
        useNavigate();

    const doLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm"
        >

            <div className="container-fluid">

                <Link
                    className="navbar-brand"
                    to="/dashboard"
                >
                    EMS Control Center
                </Link>

                <div className="d-flex align-items-center">

                    <span
                        className="text-white me-3"
                    >

                        Welcome,

                        {" "}

                        <strong>
                            {getUsername()}
                        </strong>

                        {" | "}

                        {getRole()}

                    </span>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={doLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;