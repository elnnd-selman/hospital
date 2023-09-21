import {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
  useGetOneDepartmentQuery,
  useUpdateDepartmentMutation,
} from "@/app/redux/apis/departmentApis";
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
  const { data, isLoading } = useGetOneDepartmentQuery({ id });
  const [updateDepartment, { isLoading: updateDepartmentIsLoading }] =
    useUpdateDepartmentMutation();
  const { refetch } = useGetDepartmentsQuery({page:1});
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
            Update Department
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                crossOrigin={""}
                value={name}
                onChange={(e) => {

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
