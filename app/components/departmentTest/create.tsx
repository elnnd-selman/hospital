"use client";
import useLogin from "@/app/hooks/useLogin";
import { useAddResultPatientMutation } from "@/app/redux/apis/patientApis";
import { Button, Card } from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import FlwoerTestImage from './../../assets/images/sammy-line-plant-in-test-tube.png';
import AddResult from "./addResult";
import { ListOfPatients } from "./listOfPatient";
function Create({ page }: { page: any }) {
  const { user }: { user: any } = useLogin()

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
    setSelectedPatient({ ...patient, doneTest: [] });
  };

  const [addResult, { isLoading }] = useAddResultPatientMutation();

  ///RETURN
  return (
    <div className="mx-auto max-w-screen-xl py-2">
      <div className="flex justify-start items-start flex-warp">
        {/* PATIENST */}

        {user && <ListOfPatients page={page} handleSelectPatient={handleSelectPatient} user={user} />
        }

        {/* TESTS */}
        <AddResult selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} user={user} />
        <Card className="h-screen p-5 flex flex-col">

          <Button disabled={(selectedPatient.name.length < 1 || selectedPatient.doneTest.length < 1)} onClick={() => {
            addResult({
              departmentId: user.permissions[0],
              patient: selectedPatient
            })

          }}>{isLoading ? "Submiting.." : 'Submit'}</Button>
          <div className="flex-1 flex justify-center items-center">
            <Image className="" src={FlwoerTestImage} width={100} alt="" />
          </div>
        </Card>


      </div>
    </div>
  );
}

export default Create;
