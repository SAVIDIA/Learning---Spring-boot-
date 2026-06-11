const repository = require("../repositories/employeeRepository");

exports.getAllEmployees = async () =>
  (await repository.getAll()).rows;

exports.getEmployeeById = async (id) =>
  (await repository.getById(id)).rows;

exports.createEmployee = async (employee) =>
  repository.create(employee);

exports.updateEmployee = async (id, employee) =>
  repository.update(id, employee);

exports.deleteEmployee = async (id) =>
  repository.delete(id);

exports.searchByName = async (name) =>
  (await repository.searchByName(name)).rows;

exports.searchByDepartment = async (department) =>
  (await repository.searchByDepartment(department)).rows;

exports.getByUserId = async (userId) => {
  const result = await repository.getByUserId(userId);
  return result.rows[0] || null;
};