"use client";
import { useGetPationtByDepartmentIdQuery } from "@/app/redux/apis/patientApis";
import React, { useState } from "react";
import { ListOfPatients } from "./listOfPatient";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddResult({ page }: { page: any }) {
  const { data, isLoading } = useGetPationtByDepartmentIdQuery({
    departmentId: "6502058dce5d617fece78b26",
    page: page,
  });
  const router = useRouter();

  const [selectedPatient, setSelectedPatient] = useState({
    name: "",
    code: "",
    age: "",
    phone: "",
    pendingTest: [],
    doneTest: [],
    createdAt: "",
  });
  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient);
  };
  const handleTestDone = (department: any, test: any, testResult: any) => {
    let doneTests: any[] = selectedPatient.doneTest;

    const containDepartment = doneTests.findIndex(
      (dep: any) => dep._id == department._id
    );

    if (containDepartment == -1) {
      doneTests = [
        ...doneTests,
        {
          _id: department._id,
          name: department.name,
          tests: [{ ...test, result: testResult }],
        },
      ];
      setSelectedPatient((prevState: any) => ({
        ...prevState,
        doneTest: doneTests,
      }));
    } else {
      const department = doneTests[containDepartment];
      let testsOfDepartment = department.tests;
      const containTestInDepartmentTests = testsOfDepartment.findIndex(
        (t: any) => t._id == test._id
      );
      if (containTestInDepartmentTests == -1) {
        testsOfDepartment = [
          ...testsOfDepartment,
          { ...test, result: testResult },
        ];
      } else {
        testsOfDepartment[containTestInDepartmentTests] = {
          ...test,
          result: testResult,
        };
      }

      doneTests[containDepartment].tests = testsOfDepartment;

      setSelectedPatient((prevState: any) => ({
        ...prevState,
        doneTest: doneTests,
      }));
    }
  };
  return (
    <>
      <div className=" flex justify-start items-start">
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            <ListOfPatients
              patients={data.data.docs}
              handleSelectPatient={handleSelectPatient}
            />
            {data.data.totalPages < 10 ? null : (
              <div className="flex items-center gap-8">
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => {
                    router.push(`/departmentTest?page=${data.data.page - 1}`);
                  }}
                  disabled={data.data.page == 1}
                >
                  <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                  Page{" "}
                  <strong className="text-gray-900">{data.data.page}</strong> of{" "}
                  <strong className="text-gray-900">
                    {data.data.totalPages}
                  </strong>
                </Typography>
                <IconButton
                  size="sm"
                  variant="outlined"
                  onClick={() => {
                    router.push(`/departmentTest?page=${data.data.page + 1}`);
                  }}
                  disabled={data.data.page === data.data.totalPages}
                >
                  <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
              </div>
            )}
          </div>
        )}
        {selectedPatient != null && (
          <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
            <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
              {selectedPatient.code}
            </p>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-800 sm:text-left md:text-3xl">
              {selectedPatient.name}'s Tests{" "}
            </h1>

            {selectedPatient.pendingTest.map((department: any) => {
              if (department.name == "Bio") {
                return (
                  <div key={department._id}>
                    <p className="mb-4 text-sm font-semibold uppercase text-indigo-500 md:text-base">
                      {department.name} - department
                    </p>

                    {department.tests.map((test: any) => (
                      <TestItem
                        key={test._id}
                        test={test}
                        department={department}
                        onTestDoneClick={handleTestDone}
                      />
                    ))}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default AddResult;

// function SubTestItem({ subTest, parentTestName, onDoneClick }) {
//   const [result, setResult] = useState("");

//   const handleInputChange = (e) => {
//     setResult(e.target.value);
//   };

//   const handleDoneClick = () => {
//     if (result.trim() !== "") {
//       onDoneClick(subTest, result);
//       setResult("");
//     }
//   };

//   return (
//     <div>
//       <p>
//         {parentTestName} - {subTest.name}
//       </p>
//       <input
//         type="text"
//         placeholder="Enter result..."
//         value={result}
//         onChange={handleInputChange}
//       />
//       <button onClick={handleDoneClick}>Done</button>
//     </div>
//   );
// }

function TestItem({
  department,
  test,
  onTestDoneClick,
}: {
  department: any;
  test: any;
  onTestDoneClick: any;
}) {
  const [testResult, setResult] = useState("");

  const handleInputChange = (e: any) => {
    setResult(e.target.value);
  };

  const handleDoneClick = () => {
    if (testResult.trim() !== "") {
      onTestDoneClick(department, test, testResult);
      setResult("");
      return;
    }
    toast.error("Add test item failed");
  };

  return (
    <div>
      {test.subTests.length < 1 && (
        <>
          <p>{test.name}</p>
          <input
            type="text"
            placeholder="Enter result..."
            value={testResult}
            onChange={handleInputChange}
          />
          <button onClick={handleDoneClick}>Done</button>
        </>
      )}
      {/* 
      {(test.type == "parent" || test.subTests.length > 0) && (
        <>
          {test.subTests.map((subTest: any) => (
            <SubTestItem
              key={subTest._id}
              subTest={subTest}
              parentTestName={test.name}
              onDoneClick={handleSubTestDone}
            />
          ))}
        </>
      )} */}
    </div>
  );
}
