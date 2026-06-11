function EmployeeForm({
  employee,
  setEmployee,
  onSubmit,
  submitLabel = "Save"
}) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value
    });

  };

  return (

    <form onSubmit={onSubmit}>

      <div className="mb-3">

        <label className="form-label">
          Employee Name
        </label>

        <input
          type="text"
          name="employeeName"
          className="form-control"
          value={employee.employeeName || ""}
          onChange={handleChange}
          required
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          name="email"
          className="form-control"
          value={employee.email || ""}
          onChange={handleChange}
          required
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Mobile Number
        </label>

        <input
          type="text"
          name="mobileNumber"
          className="form-control"
          value={employee.mobileNumber || ""}
          onChange={handleChange}
          required
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Department
        </label>

        <input
          type="text"
          name="department"
          className="form-control"
          value={employee.department || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Designation
        </label>

        <input
          type="text"
          name="designation"
          className="form-control"
          value={employee.designation || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Salary
        </label>

        <input
          type="number"
          name="salary"
          className="form-control"
          value={employee.salary || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Date Of Joining
        </label>

        <input
          type="date"
          name="dateOfJoining"
          className="form-control"
          value={employee.dateOfJoining || ""}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label className="form-label">
          Status
        </label>

        <select
          className="form-select"
          name="status"
          value={employee.status || "ACTIVE"}
          onChange={handleChange}
        >
          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>

        </select>

      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        {submitLabel}
      </button>

    </form>

  );

}

export default EmployeeForm;