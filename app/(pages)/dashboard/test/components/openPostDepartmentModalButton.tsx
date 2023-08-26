"use client";
import { testActions } from "@/app/redux/slices/test_slice";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

function OpenPostTestModalButton() {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className=" bg-blue-500 text-white hover:text-blue-500"
        onClick={() => {
          dispatch(testActions.addTestVisibilityHandle(true));
        }}
      >
        Add New Test
      </Button>
    </>
  );
}

export default OpenPostTestModalButton;
