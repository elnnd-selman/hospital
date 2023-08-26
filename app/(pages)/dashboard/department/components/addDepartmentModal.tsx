"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { departmentActions } from "../../../../redux/slices/department_slice";
import { PostDepartmentApi } from "../../../../redux/apis/department_apis";
import { AppDispatch } from "../../../../redux/store";

export function AddDepartmentModal() {
  const {
    addDepartmentModalIsVisible,
    postDepartmentIsLoading,
  }: {
    addDepartmentModalIsVisible: boolean;
    postDepartmentIsLoading: boolean;
  } = useSelector((state: any) => state.department);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Dialog
        open={addDepartmentModalIsVisible}
        handler={() =>
          dispatch(departmentActions.addDepartmentVisibilityHandle(true))
        }
      >
        <div className="flex items-center justify-between">
          <DialogHeader>Add New department</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() =>
              dispatch(departmentActions.addDepartmentVisibilityHandle(false))
            }
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Department name"
              crossOrigin={undefined}
              onChange={(e) => {
                dispatch(departmentActions.setName(e.target.value));
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            onClick={() =>
              dispatch(departmentActions.addDepartmentVisibilityHandle(false))
            }
          >
            close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              dispatch(PostDepartmentApi()).then((response: any) => {
                console.log(response);
                
                if (response.payload.status == true) {
                  dispatch(
                    departmentActions.addDepartmentVisibilityHandle(false)
                  );
                }
              });
            }}
          >
            {postDepartmentIsLoading ? "Submiting..." : "Submit"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
