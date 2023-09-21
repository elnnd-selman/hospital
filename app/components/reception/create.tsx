"use client";
import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  Option,
  Select,
} from "@material-tailwind/react";

import { useAddPatientMutation } from "@/app/redux/apis/patientApis";
import {} from "@mui/material";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineFileSearch } from "react-icons/ai";
import { DepartmentTabs } from "./departmentTabs";
import { TestPreviewDialog } from "./testPreviewDialog";
export function Create() {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [addPatient, { isLoading: addPationtIsLoading }] =
    useAddPatientMutation();
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    code: "2222",
    phone: "",
    gender: "",
    pendingTest: [],
    doneTest: [],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectTest = (dep: any, test: any) => {
    // Check if pendingTests have any department with dep._id
    const departmentIndex = formData.pendingTest.findIndex(
      (department: any) => department._id === dep._id
    );

    setFormData((prevFormData) => {
      const updatedPendingTests: any = [...prevFormData.pendingTest];

      if (departmentIndex !== -1) {
        // If department exists, check its tests
        const department: any = updatedPendingTests[departmentIndex];
        const testIndex = department.tests.findIndex(
          (t: any) => t._id === test._id
        );

        if (testIndex !== -1) {
          // If test exists, remove it
          department.tests.splice(testIndex, 1);
        } else {
          // If test doesn't exist, add it
          department.tests.push({ ...test });
        }
      } else {
        // If department doesn't exist, create it and add the test
        updatedPendingTests.push({
          _id: dep._id,
          name: dep.name,
          tests: [{ ...test }],
        });
      }

      // Update the pendingTest array in the formData
      return {
        ...prevFormData,
        pendingTest: updatedPendingTests,
      };
    });
    removeEmptyDepartments();
    console.log(formData);
  };

  const removeEmptyDepartments = () => {
    setFormData((prevFormData) => {
      const updatedPendingTests = prevFormData.pendingTest.filter(
        (department: any) => department.tests.length > 0
      );

      // Update the pendingTest array in the formData
      return {
        ...prevFormData,
        pendingTest: updatedPendingTests,
      };
    });
  };

  const handleOpenPreviewDialog = () => {
    setOpenPreviewDialog(!open);
  };

  ///FORM
  const BuildForm = () => {
    return (
      <div className="  rounded-lg flex-1 ">
        <span className="text-black rounded-lg   inline-block mb-5 ">
          Patient information
        </span>

        <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
          <Input
            color="black"
            size="lg"
            label="Name"
            crossOrigin={""}
            name="name"
            onChange={handleInputChange}
          />
          <Input
            color="black"
            size="lg"
            label="Age"
            crossOrigin={""}
            name="age"
            type="number"
            onChange={handleInputChange}
          />

          <Select
            size="lg"
            color="gray"
            label="Gender"
            className="text-white"
            onChange={(value) => {
              handleInputChange({
                target: {
                  name: "gender",
                  value,
                },
              });
            }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">other</Option>
          </Select>

          <Input
            color="black"
            size="lg"
            label="Phone"
            crossOrigin={""}
            name="phone"
            type="number"
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  };
  ///TESTS
  const BuildTests = () => (
    <div className=" flex-1">
      <span className="text-white rounded-lg   inline-block mb-5 ">
        Patient tests
      </span>
      <div className="">
        <DepartmentTabs handleSelectTest={handleSelectTest} />
      </div>
    </div>
  );

  ///RETURN
  return (
    <>
      <TestPreviewDialog
        children={
          <Card>
            <div className="flex justify-between items-end">
              <Button
                className="text-white h-10 w-32 rounded-lg   flex  justify-center items-center gap-2"
                onClick={() => {
                  setOpenPreviewDialog(false);
                }}
              >
                <AiOutlineCloseCircle className="text-white text-xl" />
                Close
              </Button>
              <Button
                className="text-white h-10 w-32 rounded-lg bg-purple-400    flex  justify-center items-center gap-2"
                onClick={() => {
                  setOpenPreviewDialog(true);
                }}
              >
                <AiOutlineFileSearch className="text-white text-xl" />
                Send
              </Button>
            </div>
            <List>
              <ListItem> Name:{formData.name}</ListItem>
              <ListItem> Age:{formData.age}</ListItem>
              <ListItem> Gender:{formData.gender}</ListItem>
              <ListItem> Phone:{formData.phone}</ListItem>
              <ListItem>
                <List>
                  {formData.pendingTest.map((e: any) => {
                    return (
                      <ListItem className="flex justify-start items-start">
                        Department:{e.name}
                        <Card className="">
                          <List>
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}{" "}
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}{" "}
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}{" "}
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}{" "}
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}{" "}
                            {e.tests.map((t: any) => {
                              return <ListItem> {t.name}</ListItem>;
                            })}
                          </List>
                        </Card>
                      </ListItem>
                    );
                  })}
                </List>
              </ListItem>
            </List>
          </Card>
        }
        open={openPreviewDialog}
        handleOpen={handleOpenPreviewDialog}
      />
      <div className="mx-auto max-w-screen-xl py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 ">

  
        <BuildForm />
      <BuildTests />
      </div>
      <div className="flex justify-between items-start">
          {/* <Button
            className="text-white h-10 w-32 rounded-lg bg-purple-400    flex  justify-center items-center gap-2"
            onClick={() => {
              setOpenPreviewDialog(true);
            }}
          >
            <AiOutlineFileSearch className="text-white text-xl" />
            Preview
          </Button> */}
        </div>
    </>
  );
}
