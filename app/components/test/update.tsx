import {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetOneDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/app/redux/apis/departmentApis";
import {
  useGetOneTestQuery,
  useUpdateTestMutation,
} from "@/app/redux/apis/testApis";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Update({ id }: { id: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const { data, isLoading } = useGetOneTestQuery({ id });
  const [updateDepartment, { isLoading: updateDepartmentIsLoading }] =
    useUpdateTestMutation();
  const { refetch } = useGetDepartmentsQuery({ page: 1 });
  useEffect(() => {
    if (!isLoading) {
      setName(data.data.name);
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        "Laoding..."
      ) : (
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Update Test
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                crossOrigin={""}
                value={name}
                onChange={(e) => {
                  console.log(e.target.value);
                  return setName(e.target.value);
                }}
              />
            </div>

            <Button
              disabled={isLoading}
              className="mt-6"
              fullWidth
              onClick={async () => {
                await updateDepartment({ name, id });
                refetch();
                router.back();
              }}
            >
              {updateDepartmentIsLoading ? "Updating..." : "Update"}
            </Button>
          </form>
        </Card>
      )}
    </>
  );
}