import { useGetPationtByDepartmentIdQuery } from "@/app/redux/apis/patientApis";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
export function ListOfPatients({
  page,
  handleSelectPatient,
  user,
}: {
  page: any;
  handleSelectPatient: any;
  user: any
}) {
  const router = useRouter()


  const { data, isLoading, refetch, isError, error } = useGetPationtByDepartmentIdQuery({
    departmentId: user.permissions[0],
    page: page,
    size: 5
  });



  const [selectedPationtId, setSelectedPatientId] = useState("");
  const handleSelect = (patient: any) => {
    setSelectedPatientId(patient._id);
    handleSelectPatient(patient);
  };

  function computeTestCompletionRatio(patient: any) {
    let totalTests = 0;
    let completedTests = 0;
    let completedDepartmentTest = 0;
    let totalDepartmentTest = 0;

    // Count total tests
    for (const dept of patient.pendingTest) {
      totalTests += dept.tests.length;
    }

    // Count completed tests
    for (const dept of patient.doneTest) {
      completedTests += dept.tests.length;
    }

    for (const dept of patient.doneTest) {
      if (dept._id == user.permissions[0]) {
        completedDepartmentTest += dept.tests.length;
      }
    }

    for (const dept of patient.pendingTest) {
      if (dept._id == user.permissions[0]) {
        totalDepartmentTest += dept.tests.length;
      }
    }
    return {
      label: `${completedTests}/${totalTests}`,
      done: completedTests,
      pending: totalTests,
      completedDepartmentTest,
      totalDepartmentTest
    };
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);  // Refresh every 3 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [refetch]);
  return (
    <div className=" h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-100 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray" className="flex justify-start items-center gap-4">
            <FaUserCircle />  Patients
          </Typography>
        </div>
        <div>
          {isLoading
            ? "Loading..."
            : isError ? <h1>{JSON.stringify(error)}</h1> : data.data.docs.map((patient: any) => {
              const computed = computeTestCompletionRatio(patient)

              return (
                <div
                  key={patient._id}
                  className={`flex-col justify-start items-start my-5 rounded-lg p-2 ${patient._id == selectedPationtId
                    ? "bg-[#00666c] text-white"
                    : "border"
                    }`}
                  color="blue"
                  onClick={() => {
                    handleSelect(patient);
                  }}
                >
                  <div>{patient.name}</div>
                  <div className="text-[14px]">
                    {moment(patient.createdAt).format("DD-MM-YYYY : h:mm:ss a")}
                    <div className="my-2 flex">

                      <div className={`rounded-lg p-2  ${computed.done == computed.pending ? 'bg-green-400 text-white ' : ""}`}>
                        All  {computed.done}/{computed.pending}
                      </div>

                      <div className={`ml-4 rounded-lg p-2  ${computed.completedDepartmentTest == computed.totalDepartmentTest ? 'bg-green-400 text-white min-[]:' : "bg-red-400 text-white"}`}>
                        Department  {computed.completedDepartmentTest}/{computed.totalDepartmentTest}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {isLoading ? "Loading..." : data.data.totalPages < 2 ? null : (
        <div className="flex items-center gap-8 bg-[#00666c] justify-between text-white p-2 rounded-xl">
          <IconButton
            size="sm"
            color="white"
            onClick={() => {
              router.push(`/departmentTest?page=${data.data.page - 1}`);
            }}
            disabled={data.data.page == 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " color="blue" />
          </IconButton>
          <Typography color="white" className="font-normal">
            Page <strong className="text-white">{data.data.page}</strong> of{" "}
            <strong className="text-white">{data.data.totalPages}</strong>
          </Typography>
          <IconButton
            size="sm"
            color="white"
            onClick={() => {
              router.push(`/departmentTest?page=${data.data.page + 1}`);
            }}
            disabled={data.data.page === data.data.totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" color="whiteblue" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
