import {
  useState
} from "react";

import {
  searchEmployee
} from "../services/employeeService";

function SearchEmployee() {

  const [name,
    setName] =
    useState("");

  const [result,
    setResult] =
    useState([]);

  const search =
    async () => {

      const res =
        await searchEmployee(
          name
        );

      setResult(
        res.data.data
      );
    };

  return (

    <div className="container mt-4">

      <h3>
        Search Employee
      </h3>

      <div className="input-group">

        <input
          className="form-control"
          value={name}
          onChange={e =>
            setName(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-primary"
          onClick={search}
        >
          Search
        </button>

      </div>

      <ul className="mt-3">

        {
          result.map(emp => (
            <li
              key={
                emp.EMPLOYEE_ID
              }
            >
              {
                emp.EMPLOYEE_NAME
              }
            </li>
          ))
        }

      </ul>

    </div>
  );
}

export default SearchEmployee;