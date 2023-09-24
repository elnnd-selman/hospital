"use client";
import { useAddPatientMutation } from "@/app/redux/apis/patientApis";
import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  Option,
  Select,
} from "@material-tailwind/react";
import { } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineFileSearch, AiOutlineSend } from "react-icons/ai";
import { FaUserPlus } from 'react-icons/fa';
import receptionImage from '../../assets/images/reception.png';
import { DepartmentTabs } from "./departmentTabs";
import { TestPreviewDialog } from "./testPreviewDialog";
import { BiTestTube } from 'react-icons/bi';
import { toast } from "react-toastify";



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

  ///RETURN
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2 ">



      <TestPreviewDialog
        children={
          <Card>
            <div className="flex justify-between items-end">
              <Button
                className="text-white h-10 w-32 rounded-lg bg-red-400  flex  justify-center items-center gap-2"
                onClick={() => {
                  setOpenPreviewDialog(false);
                  window.location.reload()

                }}
              >
                <AiOutlineCloseCircle className="text-white text-xl" />
                Close
              </Button>
              <Button
                className="text-white h-10 w-32 rounded-lg bg-purple-400    flex  justify-center items-center gap-2"
                onClick={() => {
                  addPatient(formData)
                    .unwrap()
                    .then((e) => {
                      setOpenPreviewDialog(false);
                    });
                }}
              >
                <AiOutlineSend className="text-white text-xl" />
                {addPationtIsLoading ? 'Send...' : 'Send'}
              </Button>
            </div>
            <List>
              <p className="mt-6 font-semibold text-indigo-500 md:mb-2 md:text-lg xl:text-xl flex justify-start items-center gap-2"><FaUserPlus /> Patient information</p>

              <div className="grid grid-cols-2 gap-6 rounded-lg bg-indigo-500 p-6 md:grid-cols-2 md:gap-8 md:p-8">
                {/* stat - start */}

                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-1xl md:text-1xl">NAME</div>
                  <div className="text-sm text-indigo-200 sm:text-base">{formData.name}</div>
                </div>
                {/* stat - end */}
                {/* stat - start */}
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-1xl md:text-1xl">AGE</div>
                  <div className="text-sm text-indigo-200 sm:text-base">{formData.age}</div>
                </div>
                {/* stat - start */}
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-1xl md:text-1xl">GENDER</div>
                  <div className="text-sm text-indigo-200 sm:text-base">{formData.gender}</div>
                </div>
                {/* stat - end */}
                {/* stat - start */}
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-white sm:text-1xl md:text-1xl">PHONE</div>
                  <div className="text-sm text-indigo-200 sm:text-base">{formData.phone}</div>
                </div>
                {/* stat - end */}
              </div>
              <p className="mt-6 font-semibold text-indigo-500 md:mb-2 md:text-lg xl:text-xl flex justify-start items-center gap-2"><BiTestTube /> Patient Tests</p>
              <ListItem>
                <List>
                  {formData.pendingTest.map((e: any) => {
                    return (
                      <ListItem className="flex flex-col">
                        <div className="text-lg font-bold text-indigo-500 sm:text-1xl md:text-1xl">{e.name}</div>

                        <Card className="">
                          <List>
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



      <div className=" flex justify-between items-center flex-wrap">
        <div className=" flex max-w-xl flex-col items-start text-start">
          <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Register Patient Here</p>
          <h1 className="mb-8 text-3xl font-bold text-black sm:text-4xl md:mb-12 md:text-5xl">Begin Your Care Journey</h1>
        </div>
        <Image src={receptionImage} alt="asdasd" height={250} />
      </div>

      <div className="mx-auto max-w-screen-xl py-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-5 ">
        {/* FORM */}
        <div className="  rounded-lg flex-1 ">
          <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl flex justify-start items-center gap-2"><FaUserPlus /> Patient information</p>

          <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ">
            <Input
              color="black"
              size="lg"
              value={formData.name}
              label="Name"
              crossOrigin={""}
              name="name"
              onChange={handleInputChange}
            />
            <Input
              value={formData.age}

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
              value={formData.gender}
              label="Gender"
              className="text-black"
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
              value={formData.phone}

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
        {/* TEST */}
        <div className=" flex-1 ">
          <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl flex justify-start items-center gap-2"><BiTestTube /> Patient Tests</p>

          <div className="">
            <DepartmentTabs handleSelectTest={handleSelectTest} />
          </div>
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between items-start">
            <Button
              className="text-white h-10 w-32 rounded-lg bg-[#292929]    flex  justify-center items-center gap-2"
              onClick={() => {
                if (formData.name.length < 1 || formData.age < 1 || formData.gender.length < 1) {
                  toast.error('Please fill all input')
                  return;
                }
                setOpenPreviewDialog(true);
              }}
            >
              <AiOutlineFileSearch className="text-white text-xl" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
