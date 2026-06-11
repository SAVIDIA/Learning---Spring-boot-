import { Link } from "react-router-dom";

import { getRole } from "../utils/auth";

function Sidebar() {

    const role = getRole();

    const canManageEmployees =
        ["ADMIN", "HR", "MANAGER"].includes(role);

    const canCreateOrEdit =
        ["ADMIN", "HR"].includes(role);

    return (

        <div
            className="p-3 h-100"
        >

            <h4 className="fw-bold text-primary">
                EMS
            </h4>

            <hr />

            <ul className="nav flex-column">

                <li className="nav-item mb-2">

                    <Link
                        to="/dashboard"
                        className="nav-link text-dark"
                    >
                        Dashboard
                    </Link>

                </li>

                {
                    canManageEmployees &&

                    <li className="nav-item mb-2">

                        <Link
                            to="/employees"
                            className="nav-link text-dark"
                        >
                            Employees
                        </Link>

                    </li>
                }

                {
                    canCreateOrEdit &&

                    <li className="nav-item mb-2">

                        <Link
                            to="/employees/add"
                            className="nav-link text-dark"
                        >
                            Add Employee
                        </Link>

                    </li>
                }

                {
                    role === "ADMIN" &&

                    <li className="nav-item mb-2">

                        <Link
                            to="/audit"
                            className="nav-link text-dark"
                        >
                            Audit Logs
                        </Link>

                    </li>
                }

                <li className="nav-item mb-2">

                    <Link
                        to="/profile"
                        className="nav-link text-dark"
                    >
                        My Profile
                    </Link>

                </li>

                {
                    role === "ADMIN" &&

                    <li className="nav-item mb-2">

                        <Link
                            to="/register"
                            className="nav-link text-dark"
                        >
                            Register User
                        </Link>

                    </li>
                }

            </ul>

        </div>

    );

}

export default Sidebar;