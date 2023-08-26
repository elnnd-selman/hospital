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
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { PostDepartmentApi } from "../../../../redux/apis/department_apis";
import { AppDispatch } from "../../../../redux/store";
import { testActions } from "../../../../redux/slices/test_slice";
import { useSearchParams } from "next/navigation";
import { PostTestApi } from "@/app/redux/apis/test_apis";

export function AddTestModal() {
  const searchParams = useSearchParams();

  const departmentId = searchParams.get("departmentId");
  const departmentName: string = searchParams.get("departmentName")!;
  const {
    addTestModalIsVisible,
    postDepartmentIsLoading,
    type,
    select,
    selectInputText,
    keyAndValue,
  }: {
    addTestModalIsVisible: boolean;
    postDepartmentIsLoading: boolean;
    type: string;
    select: any[];
    selectInputText: string;
    keyAndValue: { [key: string]: string };
  } = useSelector((state: any) => state.test);

  const dispatch = useDispatch<AppDispatch>();
  dispatch(testActions.setDepartment(departmentId));

  return (
    <>
      <Dialog
        open={addTestModalIsVisible}
        handler={() => dispatch(testActions.addTestVisibilityHandle(true))}
      >
        <div className="flex items-center justify-between">
          <DialogHeader>Add New Test</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => dispatch(testActions.addTestVisibilityHandle(false))}
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
              value={departmentName}
              disabled={true}
              crossOrigin={undefined}
              onChange={(e) => {
                dispatch(testActions.setName(e.target.value));
              }}
            />
            <Input
              label="Department name"
              crossOrigin={undefined}
              onChange={(e) => {
                dispatch(testActions.setName(e.target.value));
              }}
            />

            <Select
              label="Select Type"
              onChange={(type) => {
                dispatch(testActions.setType(type));
                console.log(type);
              }}
            >
              <Option value="text">Text</Option>
              <Option value="normalRange">Normal Range</Option>
              <Option value="select">Select</Option>
              <Option value="keyAndValue">Key and Value</Option>

              <Option value="parent">Parent</Option>
            </Select>

            {/* if its normal range */}
            {type == "normalRange" && (
              <Input
                label="Normal Range And unit"
                crossOrigin={undefined}
                onChange={(e) => {
                  dispatch(testActions.setNormalRange(e.target.value));
                }}
              />
            )}
            {/* if its select */}
            {type == "select" && (
              <>
                {select.length > 0 && (
                  <div className="bg-gray-300 p-3  rounded-md">
                    <h5>Tab to remove</h5>
                    {select.map((select, index) => {
                      return (
                        <span
                          onClick={() => {
                            dispatch(testActions.removeSelect(select));
                          }}
                          className="m-2"
                        >
                          {++index}- {select}
                        </span>
                      );
                    })}
                  </div>
                )}
                <Input
                  label="Type item to select"
                  crossOrigin={undefined}
                  onChange={(e) => {
                    dispatch(testActions.setSelectInputText(e.target.value));
                  }}
                />
                <Button
                  onClick={() => {
                    dispatch(testActions.setSelect(selectInputText));
                  }}
                  color="blue"
                >
                  Add select item
                </Button>
              </>
            )}

            {/* if its Key and Value */}
            {type == "keyAndValue" && (
              <>
                {Object.keys(keyAndValue).length > 0 && (
                  <div className="bg-gray-300 p-3  rounded-md">
                    <h5>Tab to remove</h5>
                    {Object.keys(keyAndValue).map((key, index) => {
                      return (
                        <span
                          onClick={() => {
                            dispatch(testActions.removeKeyAndValue(key));
                          }}
                          className="m-2"
                        >
                          <span className="bg-blue-500 text-white rounded-xl p-2">
                            {key}: {keyAndValue[key]}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
                <Input
                  label="Key"
                  crossOrigin={undefined}
                  onChange={(e) => {
                    dispatch(
                      testActions.setKeyAndValueKeyInputText(e.target.value)
                    );
                  }}
                />
                <Input
                  label="Value"
                  crossOrigin={undefined}
                  onChange={(e) => {
                    dispatch(
                      testActions.setKeyAndValueValueInputText(e.target.value)
                    );
                  }}
                />
                <Button
                  onClick={() => {
                    dispatch(testActions.setKeyAndValue(null));
                  }}
                  color="blue"
                >
                  Add Key And Value
                </Button>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            onClick={() => dispatch(testActions.addTestVisibilityHandle(false))}
          >
            close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              dispatch(PostTestApi()).then((response: any) => {
                console.log(response);

                if (response.payload.status == true) {
                  dispatch(testActions.addTestVisibilityHandle(false));
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
