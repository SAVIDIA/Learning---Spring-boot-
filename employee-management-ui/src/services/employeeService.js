import api from "./api";

const URL = "/employees";

export const getEmployees = () =>
  api.get(URL);

export const getEmployeeById = (id) =>
  api.get(`${URL}/${id}`);

export const createEmployee = (data) =>
  api.post(URL, data);

export const updateEmployee = (
  id,
  data
) =>
  api.put(
    `${URL}/${id}`,
    data
  );

export const deleteEmployee = (id) =>
  api.delete(`${URL}/${id}`);

export const searchEmployeesByName = (
  name
) =>
  api.get(
    `${URL}/search?name=${encodeURIComponent(name)}`
  );

export const getEmployeesByDepartment = (
  department
) =>
  api.get(
    `${URL}/department/${encodeURIComponent(department)}`
  );

export const getMyProfile = () => api.get(`${URL}/me`);