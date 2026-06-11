import {
  useState
} from "react";

import EmployeeForm
from "../components/EmployeeForm";

import {
  createEmployee
} from "../services/employeeService";

import {
  useNavigate
} from "react-router-dom";

function AddEmployee() {

  const navigate =
    useNavigate();

  const [employee,
    setEmployee] =
    useState({
      employeeName: "",
      email: "",
      mobileNumber: "",
      department: "",
      designation: "",
      salary: "",
      dateOfJoining: "",
      status: "ACTIVE"
    });

  const [errorText, setErrorText] = useState("");

  const submit =
    async (e) => {

      e.preventDefault();

      setErrorText("");

      try {
        await createEmployee(
          employee
        );

        navigate("/employees");
      } catch (error) {
        setErrorText(
          error?.response?.data?.message ||
          "Failed to create employee."
        );
      }
    };

  return (
    <div className="container mt-4">
      <h3>Add Employee</h3>

      {
        errorText &&
        <div className="alert alert-danger">
          {errorText}
        </div>
      }

      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        onSubmit={submit}
        submitLabel="Create Employee"
      />

    </div>
  );
}

export default AddEmployee;