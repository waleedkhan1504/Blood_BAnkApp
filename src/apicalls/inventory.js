import { axiosInstance } from ".";

export const AddInventory = (data) => {
  return axiosInstance("post", "http://localhost:5000/api/inventory/add", data);
};
export const GetInventory = () => {
  return axiosInstance("get", "http://localhost:5000/api/inventory/get");
};
export const GetInventoryWithFilters = (filters, limit) => {
  return axiosInstance(
    "post",
    "http://localhost:5000/api/inventory/filter",
    filters,
    limit
  );
};
