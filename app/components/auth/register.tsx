"use client";
import { useRegisterMutation } from "@/app/redux/apis/authApis";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Register() {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        register
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            crossOrigin={""}
            name="name"
            onChange={handleChange}
          />
          <Input
            size="lg"
            label="Email"
            crossOrigin={""}
            name="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            crossOrigin={""}
            onChange={handleChange}
          />
        </div>
        {isError && <h2>Have an Error</h2>}
        <Button
          className="mt-6"
          fullWidth
          onClick={async () => {
            const res: any = await register(formData);
            localStorage.setItem("user", JSON.stringify(res.data.data));
          }}
        >
          {isLoading ? "Registering.." : "Register"}
        </Button>
      </form>
    </Card>
  );
}
