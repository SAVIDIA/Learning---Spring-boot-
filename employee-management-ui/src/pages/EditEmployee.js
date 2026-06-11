import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import EmployeeForm from "../components/EmployeeForm";

import {
  getEmployeeById,
  updateEmployee
} from "../services/employeeService";

import Loader from "../components/Loader";

function EditEmployee() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employeeName: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",
    salary: "",
    dateOfJoining: "",
    status: "ACTIVE"
  });

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {

    loadEmployee();

  }, [id]);

  const loadEmployee = async () => {

    try {
      setLoading(true);

      const response =
        await getEmployeeById(id);

      const emp =
        response.data.data;

      setEmployee({
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        email: emp.email,
        mobileNumber: emp.mobileNumber,
        department: emp.department,
        designation: emp.designation,
        salary: emp.salary,
        dateOfJoining: emp.dateOfJoining,
        status: emp.status
      });

    } catch (error) {

      setErrorText(
        error?.response?.data?.message ||
        "Failed to load employee."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setErrorText("");

      try {

        const payload = {

          employeeName:
            employee.employeeName,

          email:
            employee.email,

          mobileNumber:
            employee.mobileNumber,

          department:
            employee.department,

          designation:
            employee.designation,

          salary:
            employee.salary,

          dateOfJoining:
            employee.dateOfJoining,

          status:
            employee.status

        };

        await updateEmployee(
          id,
          payload
        );

        navigate("/employees");

      } catch (error) {

        setErrorText(
          error?.response?.data?.message ||
          "Failed to update employee."
        );

      }

    };

  return (

    <div className="container mt-4">

      <h3>Edit Employee</h3>

      {
        loading && <Loader />
      }

      {
        errorText &&
        <div className="alert alert-danger">
          {errorText}
        </div>
      }

      {
        !loading &&
        <EmployeeForm
          employee={employee}
          setEmployee={setEmployee}
          onSubmit={handleSubmit}
          submitLabel="Update Employee"
        />
      }

    </div>

  );

}

export default EditEmployee;