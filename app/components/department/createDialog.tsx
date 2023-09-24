import { useCreateDepartmentMutation } from "@/app/redux/apis/departmentApis";
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
    Typography
} from "@material-tailwind/react";
import { useState } from "react";

export function CreateDialog({
    open,
    setShowDeleteDepartmentDialog,
    refetch,
}: {
    open: boolean;
    setShowDeleteDepartmentDialog: any;
    refetch: any
}) {

    const [name, setName] = useState("");
    const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
    return (
        <>
            <Dialog open={open} handler={() => {
                setShowDeleteDepartmentDialog(!open)
            }} >
                <DialogBody divider className="grid place-items-center gap-4  ">
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


                        </form>
                    </Card>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={() => {
                        setShowDeleteDepartmentDialog(false)
                    }}>
                        close
                    </Button>
                    <Button variant="gradient" onClick={() => {
                        const user = localStorage.getItem("user");

                        createDepartment({ name, userId: JSON.parse(user!)._id }).unwrap().then(() => {
                            refetch()
                            setShowDeleteDepartmentDialog(false)
                        });
                    }}>
                        {isLoading ? 'Creating' : 'Create'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
