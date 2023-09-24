"use client";

import useContainsId from "@/app/hooks/useContainId";
import useLogin from "@/app/hooks/useLogin";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { Card } from "@mui/material";
import moment from "moment";
import React, { use, useState } from "react";
import { AiOutlineApartment } from "react-icons/ai";

const AddResult = ({
  selectedPatient,
  setSelectedPatient,
  user,
}: {
  selectedPatient: any;
  setSelectedPatient: any;
  user: any
}) => {

  return (
    <div className="h-[calc(100vh-4rem)]  overflow-y-auto flex-1">
      <div className="m-5">
        <h2 className="text-center text-xl font-bold text-[#00666c] sm:text-2xl lg:text-left lg:text-3xl">{selectedPatient.name}</h2>
        <p className="text-center text-gray-500 lg:text-left">
          {moment(selectedPatient.createdAt).format("DD-MM-YYYY : h:mm:ss a")}
        </p>
      </div>

      {selectedPatient.pendingTest.map((department: any, departmentIndex: number) => {
        if (department._id == user.permissions[0]) {
          return (
            <div className=" flex flex-col gap-3 items-start justify-start m-5">
              <h1 className=" flex flex-row gap-3  font-bold text-2xl  items-center justify-center text-[#00666c] ">
                <AiOutlineApartment />
                {department.name}
              </h1>
              {department.tests.map((test: any, testIndex: number) => {
                return (
                  <Test
                    key={test._id}
                    departmentIndex={departmentIndex}
                    testIndex={testIndex}
                    test={test}
                    setSelectedPatient={setSelectedPatient}
                    department={department}
                    selectedPatient={selectedPatient}
                  />
                );
              })}
            </div>
          );
        }

      })}
    </div>
  );
};
export default AddResult;

function Test({
  test,
  department,
  setSelectedPatient,
  selectedPatient,
  departmentIndex,
  testIndex
}: {
  test: any;
  department: any;
  setSelectedPatient: any;
  selectedPatient: any;
  departmentIndex: number;
  testIndex: any
}) {

  const containId = useContainsId();
  const [result, setResult] = useState();
  const handleChange = (e: any) => {
    setResult(e.target.value);
  };

  const checkIfTestDone = () => {
    for (const d of selectedPatient.doneTest) {
      if (d._id == department._id && d.tests.length > 0) {
        const isExits = d.tests.some((tf: any) => tf._id == test._id);
        if (isExits) {
          return isExits

        }
      }
    }
    return false;
  }

  const isTestCompleted = checkIfTestDone();

  const doneHandle = () => {
    let pendingTest = [...selectedPatient.pendingTest];
    let doneTest = [...selectedPatient.doneTest];

    let currentTest = { ...pendingTest[departmentIndex].tests[testIndex] };
    currentTest = { ...currentTest, result: result }

    let departmentFound = containId(doneTest, currentTest.parentId);

    if (departmentFound) {

      let test = containId(departmentFound.tests, currentTest._id);

      if (test) {
        test = { ...test, result }

        departmentFound = {
          ...departmentFound, tests: departmentFound.tests.map((t: any) => {
            if (t._id === test._id) {
              return test
            }
            return t;
          })
        }

        doneTest = doneTest.map((d: any) => {
          if (d._id == departmentFound._id) {
            return departmentFound
          }
          return d
        });
      }
      ///IF DEPARTMENT NOT CONTAIN TEST
      else {
        departmentFound.tests.push(currentTest)
      }
    } else {
      doneTest.push({
        ...department, tests: [
          currentTest
        ]
      })
    }
    setSelectedPatient((prevState: any) => ({
      ...prevState,
      doneTest
    }))

  };



  const removeTest = () => {
    let doneTestsCopy = [...selectedPatient.doneTest];
    // Locate the department and test
    const departmentFound = doneTestsCopy.find(d => d._id === department._id);
    if (departmentFound) {
      departmentFound.tests = departmentFound.tests.filter((t: any) => t._id !== test._id);
    }

    // Update the patient state
    setSelectedPatient((prevState: any) => ({
      ...prevState,
      doneTest: doneTestsCopy
    }));
    console.log("REMOVING", selectedPatient);
  }

  return (
    <div className="w-full">{test.subTests.length > 0 ?
      <Card className="p-5">
        <p className="text-md text-[#00666c] font-bold">{test.name}</p>
        {test.subTests.map((subTest: any, subTestIndex: number) => {
          return <SubTest key={subTest._id} department={department} departmentIndex={departmentIndex} selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} test={test} testIndex={testIndex} subTest={subTest} subTestIndex={subTestIndex} />

        })}
      </Card>
      :
      <div className="w-full">
        <p className="text-md text-[#00666c] font-bold">{test.name}</p>
        {test.type == 'select' ?

          <div className="relative flex w-full  max-w-[24rem] ">
            <Select
              label="Select Type"
              onChange={(value) => {

                handleChange({
                  target: {
                    name: "type",
                    value,
                  },
                });
              }}
            >
              {test.data != null && test.data.length > 0 && test.data.map((e: any) => {
                return <Option value={e}>{e}</Option>

              })}

            </Select>
            {!isTestCompleted ? <Button
              onClick={doneHandle}
              size="sm"
              color={result ? "gray" : "blue-gray"}
              disabled={!result}
              className="!absolute right-1 top-1 rounded"
            >
              Done
            </Button> :
              <Button
                onClick={removeTest}
                size="sm"
                color={result ? "gray" : "blue-gray"}
                disabled={!result}
                className="!absolute right-1 top-1 rounded"
              >
                Remove
              </Button>}
          </div>


          : <div className="relative flex w-full max-w-[24rem] ">
            <Input
              disabled={isTestCompleted}
              crossOrigin={""}
              type="text"
              label={test.name}
              value={result}
              onChange={handleChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            {!isTestCompleted ? <Button
              onClick={doneHandle}
              size="sm"
              color={result ? "gray" : "blue-gray"}
              disabled={!result}
              className="!absolute right-1 top-1 rounded"
            >
              Done
            </Button> :
              <Button
                onClick={removeTest}
                size="sm"
                color={result ? "gray" : "blue-gray"}
                disabled={!result}
                className="!absolute right-1 top-1 rounded"
              >
                Remove
              </Button>}
          </div>}

      </div>}
    </div>
  );
}





function SubTest({
  test,
  department,
  setSelectedPatient,
  selectedPatient,
  departmentIndex,
  testIndex,
  subTest,
  subTestIndex
}: {
  test: any;
  department: any;
  setSelectedPatient: any;
  selectedPatient: any;
  departmentIndex: number;
  testIndex: any
  subTest: any,
  subTestIndex: any;
}) {

  const containId = useContainsId();
  const [result, setResult] = useState();
  const handleChange = (e: any) => {
    setResult(e.target.value);
  };


  const checkIfSubTestDone = () => {
    for (const d of selectedPatient.doneTest) {
      if (d._id == department._id && d.tests.length > 0) {
        for (const t of d.tests) {
          if (t._id == subTest.testId && t.subTests.length > 0) {
            const isExits = t.subTests.some((tf: any) => tf._id == subTest._id);
            if (isExits) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  const isSubTestCompleted = checkIfSubTestDone();


  const doneHandle = () => {
    let pendingTest = [...selectedPatient.pendingTest];
    let doneTest = [...selectedPatient.doneTest];

    let currentTest = { ...pendingTest[departmentIndex].tests[testIndex] };
    let currentSubTest = { ...currentTest.subTests[subTestIndex] };

    currentSubTest = { ...currentSubTest, result: result }

    let departmentFound = containId(doneTest, currentTest.parentId);

    if (departmentFound) {

      let test = containId(departmentFound.tests, currentTest._id);
      console.log(test);

      if (test) {

        let subTest = containId(test.subTests, currentSubTest._id);
        console.log('SUBTEST', subTest);
        if (subTest) {
          subTest = { ...subTest, result }
          test = {
            ...test, subTests: test.subTests.map((s: any) => {
              if (s._id == subTest._id) {
                return subTest;
              }
              return s
            })
          }

        } else {
          test.subTests.push(currentSubTest)
        }

        departmentFound = {
          ...departmentFound, tests: departmentFound.tests.map((t: any) => {
            if (t._id === test._id) {
              return test
            }
            return t;
          })
        }

        doneTest = doneTest.map((d: any) => {
          if (d._id == departmentFound._id) {
            return departmentFound
          }
          return d
        });
      }
      ///IF DEPARTMENT NOT CONTAIN TEST
      else {
        departmentFound.tests = [...departmentFound.tests, { ...currentTest, subTests: [currentSubTest] }]
      }
    } else {

      doneTest.push({
        ...department, tests: [{ ...currentTest, subTests: [currentSubTest] }]
      })
    }
    setSelectedPatient((prevState: any) => ({
      ...prevState,
      doneTest
    }))
    console.log(selectedPatient);

  };



  const removeSubTest = () => {
    let doneTestsCopy = [...selectedPatient.doneTest];
    // Locate the department and test
    const departmentFound = doneTestsCopy.find(d => d._id === department._id);
    if (departmentFound) {
      const testFound = departmentFound.tests.find((t: any) => t._id === test._id);
      if (testFound) {
        // Remove the subTest by filtering out the subTest with the specific ID
        testFound.subTests = testFound.subTests.filter((s: any) => s._id !== subTest._id);
      }
    }

    // Update the patient state
    setSelectedPatient((prevState: any) => ({
      ...prevState,
      doneTest: doneTestsCopy
    }));
    console.log("REMOVING", selectedPatient);

  };
  return (
    <div>

      <p className="text-sm text-[#00666c] font-bold mt-5">{test.name}</p>


      <div className="relative flex w-full max-w-[24rem] mb-5 ">
        <Input
          disabled={isSubTestCompleted}
          crossOrigin={""}
          type="text"
          label={subTest.name}
          value={result}
          onChange={handleChange}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />
        {!isSubTestCompleted ? <Button
          onClick={doneHandle}
          size="sm"
          color={result ? "gray" : "blue-gray"}
          disabled={!result}
          className="!absolute right-1 top-1 rounded"
        >
          Done
        </Button> :
          <Button
            onClick={removeSubTest}
            size="sm"
            color={result ? "gray" : "blue-gray"}
            disabled={!result}
            className="!absolute right-1 top-1 rounded"
          >
            Remove
          </Button>}
      </div> </div>
  );
}
