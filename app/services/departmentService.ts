import axios from "axios";

export const deleteDepartmentService = async (departmentId: string) => {
  const res = await axios.delete(
    "http://localhost:3000/api/department?departmentId=" + departmentId
  );
  console.log(res.data.data);

  if (res.data.status != undefined) {
    return res.data.status;
  }
  return false;
};
