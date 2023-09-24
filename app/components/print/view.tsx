"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";

import { useGetPationtByDepartmentIdQuery } from "@/app/redux/apis/patientApis";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { PdfDialog } from "./pdfDialog";
export default function PrintViews({ page }: { page: string }) {

  const [selectedPatioent, setSelectedPatient] = React.useState({})
  const [showPdf, setShowPdf] = React.useState(false)

  const router = useRouter();
  const { data, isLoading } =
    useGetPationtByDepartmentIdQuery({ page });
  function computeTestCompletionRatio(patient: any) {
    let totalTests = 0;
    let completedTests = 0;
    console.log(patient);

    // Count total tests
    for (const dept of patient.pendingTest) {
      totalTests += dept.tests.length;
    }

    // Count completed tests
    for (const dept of patient.doneTest) {
      completedTests += dept.tests.length;
    }

    return {
      label: `${completedTests}/${totalTests}`,
      done: completedTests,
      pending: totalTests
    };
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },

    { field: "gender", headerName: "Gender", width: 130 }, 
    { field: "age", headerName: "Age", width: 130 },

    {
      field: "date", headerName: "date", width: 200, renderCell: (params: any) => (
        <>
          {
            moment(params.date).format("DD-MM-YYYY : h:mm:ss a")
          }
        </>
      )
    },
    {
      field: "status", headerName: "TEST", width: 200, renderCell: (params: any) => {
        const compute: any = computeTestCompletionRatio(params.row)
        return <>
          {
            <Button onClick={() => {
              setSelectedPatient(params.row);
              setShowPdf(true)
            }} className="text-1xl" color={compute.done == compute.pending ? 'green' : 'white'}>{compute.label}</Button>

          }</>;
      }
    },

  ];
  let rows: any;
  if (!isLoading && data) {

    rows = data.data.docs.map((patient: any) => {
      return {
        id: patient._id,
        name: patient.name,
        gender: patient.gender,
        age: patient.age,
        phone: patient.phone,
        doneTest: patient.doneTest,
        pendingTest: patient.pendingTest,
        createdAt: patient.createdAt

      };
    });
  }

  React.useEffect(() => {
    // refetch();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2">
      <PdfDialog data={selectedPatioent} open={showPdf} handleOpen={setShowPdf} />

      {isLoading ? (
        <h1> Patient is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination

            paginationMode="server"
            rowCount={data.data.totalDocs}
            onPaginationModelChange={(params) => {
              const page = params.page + 1;
              router.push("/print?page=" + page);
            }}
            // onFilterModelChange={handleFilterChange}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: data.data.limit,
                  page: data.data.page - 1,
                },
              },
            }}
            autoHeight
          />
        </div>
      )}
    </div>
  );
}
