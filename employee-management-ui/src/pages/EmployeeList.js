import {
    useEffect,
    useState
}
from "react";

import {
    Link
}
from "react-router-dom";

import {
    getEmployeesByDepartment,
    getEmployees,
    deleteEmployee,
    searchEmployeesByName
}
from "../services/employeeService";

import Loader from "../components/Loader";

import {
    getRole
}
from "../utils/auth";

function EmployeeList() {

    const [employees,
        setEmployees] =
        useState([]);

    const [loading,
        setLoading] =
        useState(false);

    const [searchName,
        setSearchName] =
        useState("");

    const [department,
        setDepartment] =
        useState("");

    const role =
        getRole();

    const loadEmployees =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getEmployees();

                setEmployees(
                    response.data.data || []
                );

            } catch (error) {

                console.error(error);

                alert(
                    "Failed to load employees"
                );

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        loadEmployees();

    }, []);

    const removeEmployee =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete Employee?"
                );

            if (!confirmDelete) {
                return;
            }

            try {

                await deleteEmployee(id);

                alert(
                    "Employee deleted successfully"
                );

                loadEmployees();

            } catch (error) {

                console.error(error);

                alert(
                    "Delete failed"
                );

            }

        };

    const searchByName =
        async () => {

            if (!searchName) {

                loadEmployees();

                return;

            }

            try {

                const response =
                    await searchEmployeesByName(
                        searchName
                    );

                setEmployees(
                    response.data.data || []
                );

            } catch (error) {

                console.error(error);

            }

        };

    const searchByDept =
        async () => {

            if (!department) {

                loadEmployees();

                return;

            }

            try {

                const response =
                    await getEmployeesByDepartment(
                        department
                    );

                setEmployees(
                    response.data.data || []
                );

            } catch (error) {

                console.error(error);

            }

        };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3>
                    Employee Management
                </h3>

                {
                    ["ADMIN", "HR"].includes(role) &&
                    <Link
                        to="/employees/add"
                        className="btn btn-success"
                    >
                        Add Employee
                    </Link>
                }

            </div>

            <div className="card mb-3">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search By Name"
                                value={searchName}
                                onChange={(e) =>
                                    setSearchName(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-primary w-100"
                                onClick={searchByName}
                            >
                                Search
                            </button>

                        </div>

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                value={department}
                                onChange={(e) =>
                                    setDepartment(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-info w-100"
                                onClick={searchByDept}
                            >
                                Filter
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mb-3">

                <button
                    className="btn btn-secondary"
                    onClick={loadEmployees}
                >
                    Refresh
                </button>

            </div>

            {
                loading ?

                    <Loader />

                    :

                    <table
                        className="table table-striped table-hover table-bordered"
                    >

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Designation</th>
                                <th>Status</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                employees.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >
                                            No Employees Found
                                        </td>

                                    </tr>

                                    :

                                    employees.map(
                                        emp => (

                                            <tr
                                                key={
                                                    emp.employeeId
                                                }
                                            >

                                                <td>
                                                    {
                                                        emp.employeeId
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        emp.employeeName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        emp.email
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        emp.department
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        emp.designation
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        emp.status
                                                    }
                                                </td>

                                                <td>

                                                    <Link
                                                        className="btn btn-info btn-sm me-1"
                                                        to={`/employees/${emp.employeeId}`}
                                                    >
                                                        View
                                                    </Link>

                                                    {
                                                        ["ADMIN", "HR"].includes(role) &&
                                                        <Link
                                                            className="btn btn-primary btn-sm me-1"
                                                            to={`/employees/${emp.employeeId}/edit`}
                                                        >
                                                            Edit
                                                        </Link>
                                                    }

                                                    {
                                                        role === "ADMIN" &&

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                removeEmployee(
                                                                    emp.employeeId
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    }

                                                </td>

                                            </tr>

                                        )
                                    )
                            }

                        </tbody>

                    </table>
            }

        </div>

    );

}

export default EmployeeList;