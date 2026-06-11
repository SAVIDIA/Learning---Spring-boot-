import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  getEmployeeById
} from "../services/employeeService";

import Loader from "../components/Loader";

function ViewEmployee() {

  const { id } =
    useParams();

  const [employee,
    setEmployee] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {

    const loadEmployee = async () => {
      try {
        setLoading(true);
        const res = await getEmployeeById(id);
        setEmployee(res.data.data || null);
      } catch (error) {
        setErrorText(
          error?.response?.data?.message ||
          "Failed to load employee details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();

  }, [id]);

  if (loading) return <Loader />;

  return (

    <div className="container mt-4">

      <h3>
        Employee Details
      </h3>

      {
        errorText &&
        <div className="alert alert-danger">
          {errorText}
        </div>
      }

      {
        !employee && !errorText &&
        <div className="alert alert-secondary">
          Employee not found.
        </div>
      }

      {
        employee &&
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6"><strong>ID:</strong> {employee.employeeId}</div>
              <div className="col-md-6"><strong>Name:</strong> {employee.employeeName}</div>
              <div className="col-md-6"><strong>Email:</strong> {employee.email}</div>
              <div className="col-md-6"><strong>Mobile:</strong> {employee.mobileNumber}</div>
              <div className="col-md-6"><strong>Department:</strong> {employee.department || "-"}</div>
              <div className="col-md-6"><strong>Designation:</strong> {employee.designation || "-"}</div>
              <div className="col-md-6"><strong>Salary:</strong> {employee.salary ?? "-"}</div>
              <div className="col-md-6"><strong>Date of Joining:</strong> {employee.dateOfJoining || "-"}</div>
              <div className="col-md-6"><strong>Status:</strong> {employee.status || "-"}</div>
            </div>
          </div>
        </div>
      }

    </div>
  );
}

export default ViewEmployee;