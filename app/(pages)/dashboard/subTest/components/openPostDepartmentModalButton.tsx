"use client";
import { subTestActions } from "@/app/redux/slices/sub_test_slice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

function OpenPostSubTestModalButton() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className=" bg-blue-500 text-white hover:text-blue-500"
        onClick={() => {
          dispatch(subTestActions.addTestVisibilityHandle(true));
        }}
      >
        Add New Test
      </Button>
    </>
  );
}

export default OpenPostSubTestModalButton;
