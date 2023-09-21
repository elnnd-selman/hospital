import {
  Card,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";

import moment from "moment";
export function ListOfPatients({ patients,handleSelectPatient }: { patients: any,handleSelectPatient:any }) {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Patients
        </Typography>
      </div>
      <List>
        {patients.map((patient: any) => {
          return (
            <ListItem className=" flex-col justify-start items-start" onClick={()=>{
                handleSelectPatient(patient);

            }}>
              <div>{patient.name}</div>
              <div className="text-[14px]">
                {moment(patient.createdAt).format("DD-MM-YYYY : h:mm:ss a")}
              </div>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
