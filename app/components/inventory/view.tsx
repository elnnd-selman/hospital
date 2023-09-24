"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import * as React from "react";

import { useGetPatientsQuery } from "@/app/redux/apis/inventory";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { utils, writeFile } from 'xlsx';

import ChartAge from "./chartAge";
import ChartGender from './chartGender';
export default function ViewInventory({ page }: { page: string }) {

  const [showPdf, setShowPdf] = React.useState(false)

  const router = useRouter();
  const { data, isLoading } =
    useGetPatientsQuery({ page: 0 });



  function exportToExcel(rows: any, columns: any) {
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, 'DataGridExport.xlsx');
  }




  function flattenTests(testArray: any[]) {
    return testArray.map(dept => dept.tests.join(", ")).join("; ");
  }


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
    { field: "doneTestt", headerName: "Done Test", width: 130 },
    { field: "pendingTestt", headerName: "Pending Test", width: 130 },

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
              // setSelectedPatient(params.row);
              setShowPdf(true)
            }} className="text-1xl" color={compute.done == compute.pending ? 'green' : 'white'}>{compute.label}</Button>

          }</>;
      }
    },

  ];
  let rows: any;
  if (!isLoading && data) {
    console.log(data);

    rows = data.data.patients.docs.map((patient: any) => {
      let doneTestCount = patient.doneTest.reduce((acc: number, curr: any) => acc + curr.tests.length, 0);
      let pendingTestCount = patient.pendingTest.reduce((acc: number, curr: any) => acc + curr.tests.length, 0);

      return {
        id: patient._id,
        name: patient.name,
        gender: patient.gender,
        age: patient.age,
        phone: patient.phone,
        doneTest: (patient.doneTest),
        pendingTest: patient.pendingTest,
        doneTestCount: doneTestCount,
        pendingTestCount:pendingTestCount,
        createdAt:  moment(patient.createdAt).format("DD-MM-YYYY : h:mm:ss a")

      };
    });
  }

  React.useEffect(() => {
    // refetch();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-2">
      {isLoading ? (
        <h1> Patient is Loading</h1>
      ) : <div className="flex"> <ChartGender age={data.data.genderCount} /> <ChartAge age={data.data.ageDistribution} /></div>}
      {isLoading ? (
        <h1> Patient is Loading</h1>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <Button onClick={() => exportToExcel(rows, columns)}>Export to Excel</Button>

          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="server"
            rowCount={data.data.totalDocs}
            onPaginationModelChange={(params) => {
              const page = params.page + 1;
              router.push("/dashboard/inventory?page=" + page);
            }}
            // onFilterModelChange={handleFilterChange}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: data.data.patients.limit,
                  page: data.data.patients.page - 1,
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


