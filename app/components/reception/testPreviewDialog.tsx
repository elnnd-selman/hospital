import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export function TestPreviewDialog({
  open,
  handleOpen,
  children,
}: {
  open: boolean;
  handleOpen: any;
  children: any;
}) {
  return (
    <>
      <Dialog open={open} handler={handleOpen} >
        <DialogBody divider className="grid place-items-center gap-4  overflow-y-scroll h-screen">
          {children}
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleOpen}>
            Send
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
