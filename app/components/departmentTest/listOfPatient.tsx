import useLogin from "@/app/hooks/useLogin";
import { useGetPationtByDepartmentIdQuery } from "@/app/redux/apis/patientApis";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Card, Typography, List, ListItem, IconButton } from "@material-tailwind/react";
import { FaUserCircle } from 'react-icons/fa'
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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


  const { data, isLoading } = useGetPationtByDepartmentIdQuery({
    departmentId: user.permissions[0],
    page: page,
  });

  if (!isLoading) {
    console.log(data);

  }
  const [selectedPationtId, setSelectedPatientId] = useState("");
  const handleSelect = (patient: any) => {
    setSelectedPatientId(patient._id);
    handleSelectPatient(patient);
  };


  return (
    <div className=" h-[calc(100vh-4rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-100 flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray" className="flex justify-start items-center gap-4">
            <FaUserCircle />  Patients
          </Typography>
        </div>
        <div>
          {isLoading
            ? "Loading..."
            : data.data.docs.map((patient: any) => {
              return (
                <div
                  key={patient._id}
                  className={`flex-col justify-start items-start my-5 rounded-lg p-2 ${patient._id == selectedPationtId
                    ? "bg-[#00666c] text-white"
                    : ""
                    }`}
                  color="blue"
                  onClick={() => {
                    handleSelect(patient);
                  }}
                >
                  <div>{patient.name}</div>
                  <div className="text-[14px]">
                    {moment(patient.createdAt).format("DD-MM-YYYY : h:mm:ss a")}
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
