"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";

import { useGetPationtByDepartmentIdQuery } from "@/app/redux/apis/patientApis";
import { useRouter } from "next/navigation";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { PdfDialog } from "./pdfDialog";
export default function PrintViews({ page, type, from, to }: { page: string, type: string, from: string, to: string }) {

  const [selectedPatioent, setSelectedPatient] = React.useState({})
  const [showPdf, setShowPdf] = React.useState(false)

  const router = useRouter();
  const { data, isLoading, refetch } =
    useGetPationtByDepartmentIdQuery({ page, size: 10, type ,from, to });
  function computeTestCompletionRatio(patient: any) {
    let totalTests = 0;
    let completedTests = 0;

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
            moment(params.row.createdAt).format("DD-MM-YYYY : h:mm:ss a")
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
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);  // Refresh every 3 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [refetch]);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2">
      <PdfDialog data={selectedPatioent} open={showPdf} handleOpen={setShowPdf} />

      {isLoading ? (
        <h1> Patient is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <div className=" flex gap-5 my-5">
            <Select label="Select Version" onChange={(v: any) => {
              router.replace(`print?page=${page}&type=${v}&from=${from}&to=${to}`)

            }}>
              <Option value="all">All</Option>
              <Option value="pending">Pending</Option>
              <Option value="done">Done</Option>

            </Select>
            <Input variant="outlined" label="From" type="date" crossOrigin={""} onChange={(e) => {
              router.replace(`/print?page=${page}&type=${type}&from=${e.target.value}&to=${to}`)
            }} />
            <Input variant="outlined" label="To" type="date" crossOrigin={""} onChange={(e) => {
              router.replace(`/print?page=${page}&type=${type}&from=${from}&to=${e.target.value}`)
            }} />

          </div>
          <DataGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={data.data.totalDocs}
            onPaginationModelChange={(params) => {
              const page = params.page + 1;
              router.push(`print?page=${page}&type=${type}&from=${from}&to=${to}`);
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
