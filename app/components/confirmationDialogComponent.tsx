"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function ConfirmationDialog({
  text,
  title,
  submitTitle,
  onSubmit,
  open,
  handleOpen,
}: {
  text: string;
  title: string;
  submitTitle: string;
  open: boolean;
  onSubmit: Function;
  handleOpen: Function;
}) {
  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
        variant="gradient"
      >
        Open Dialog
      </Button>
      <Dialog
        open={open}
        handler={() => {
          handleOpen();
        }}
      >
        <DialogBody divider>{text}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              handleOpen();
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onSubmit();
              handleOpen();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
