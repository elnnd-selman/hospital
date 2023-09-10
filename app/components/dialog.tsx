import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export function ConfirmDialog({
  title,
  text,
  onConfirm,
  onCancel,
  isOpen,
  openHandler,
}: {
  title: string;
  text: string;
  onConfirm: any;
  onCancel: any;
  isOpen: boolean;
  openHandler: any;
}) {
  return (
    <>
      <Dialog open={isOpen} handler={openHandler}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>{text}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={openHandler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onConfirm();
              openHandler();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
