import { useCreateDepartmentMutation } from "@/app/redux/apis/departmentApis";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";

export function CreateDepartmentForm() {
  const [name, setName] = useState("");
  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Add Department
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            crossOrigin={""}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button
          disabled={isLoading}
          className="mt-6"
          fullWidth
          onClick={() => {
            createDepartment({name});
          }}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Card>
  );
}
