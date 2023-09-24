"use client";
import { useRegisterMutation } from "@/app/redux/apis/authApis";
import { useGetDepartmentsQuery } from "@/app/redux/apis/departmentApis";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import {} from "@mui/material";
import { useState } from "react";

export function Create() {
  const { data, isLoading } = useGetDepartmentsQuery({ page: 0 });
  const [userRegister, { isLoading: userRegisterIsLoading }] =
    useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    permission: [] as string[],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8 flex justify-center items-center h-screen">
      <div>
        <Typography variant="h4" color="blue-gray">
          Create user
        </Typography>
        <Typography color="gray" className="mt-1 font-normal"></Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              crossOrigin={""}
              name="name"
              onChange={handleInputChange}
            />
            <Input
              size="lg"
              label="Email"
              crossOrigin={""}
              name="email"
              onChange={handleInputChange}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              crossOrigin={""}
              name="password"
              onChange={handleInputChange}
            />
            <Select
              label="Select Role"
              onChange={(value) => {
                handleInputChange({
                  target: {
                    name: "role",
                    value,
                  },
                });
              }}
            >
              <Option value="admin">Admin</Option>
              <Option value="department">Department</Option>
              <Option value="print">Print</Option>
              <Option value="reception">Reception</Option>
            </Select>
            {isLoading ? (
              "Department..."
            ) : (
              <Select
                label="Select department permission"
                onChange={(value: any) => {
                  if (value) {
                    setFormData({
                      ...formData,
                      permission: [value],
                    });
                  }
                }}
              >
                {data.data.docs.map((value: any) => {
                  return <Option value={value._id}>{value.name}</Option>;
                })}
              </Select>
            )}
          </div>
          <Checkbox
            crossOrigin={""}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            className="mt-6"
            fullWidth
            onClick={() => {
              userRegister(formData)
               
            }}
          >
            {userRegisterIsLoading ? "Register..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
